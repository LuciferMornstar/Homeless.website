import { NextRequest, NextResponse } from 'next/server';
import { getAllMentalHealthQuestions } from '@/lib/db/mentalHealthAssessmentRepository';
import { createAssessment, generateInterpretation } from '@/lib/db/mentalHealthAssessmentRepository';
import { executeQuery } from '@/lib/db/dbUtils';

// GET endpoint to fetch mental health questions
export async function GET(request: NextRequest) {
  try {
    const questions = await getAllMentalHealthQuestions(true);
    
    return NextResponse.json({ 
      success: true, 
      data: questions 
    });
  } catch (error: any) {
    console.error('Error fetching mental health questions:', error);
    
    return NextResponse.json({ 
      success: false, 
      message: 'Failed to fetch mental health questions', 
      error: error.message 
    }, { status: 500 });
  }
}

// POST endpoint to submit mental health assessment
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, answers } = body;
    
    // Validate input
    if (!Array.isArray(answers) || answers.length === 0) {
      return NextResponse.json({ 
        success: false, 
        message: 'Invalid assessment data: answers are required' 
      }, { status: 400 });
    }
    
    // Calculate the total score
    const totalScore = answers.reduce((sum, answer) => sum + answer.answerValue, 0);
    
    // Get the maximum possible score (number of questions × highest possible answer value)
    const maxPossibleScore = answers.length * 3; // Assuming 0-3 scale per answer
    
    // Generate interpretation and recommendations
    const { interpretation, recommendations, severityLevel } = generateInterpretation(
      totalScore, 
      maxPossibleScore
    );
    
    // Save the assessment and answers to database
    const assessmentId = await createAssessment(
      userId || null, 
      answers,
      interpretation,
      recommendations
    );
    
    return NextResponse.json({ 
      success: true, 
      message: 'Mental health assessment submitted successfully', 
      data: { 
        assessmentId,
        totalScore,
        maxPossibleScore,
        interpretation,
        recommendations,
        severity: severityLevel
      } 
    });
    
  } catch (error: any) {
    console.error('Error submitting mental health assessment:', error);
    
    return NextResponse.json({ 
      success: false, 
      message: 'Failed to submit mental health assessment', 
      error: error.message 
    }, { status: 500 });
  }
}
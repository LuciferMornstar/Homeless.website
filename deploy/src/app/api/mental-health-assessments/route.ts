import { NextResponse } from 'next/server';
import { executeQuery, executeTransaction } from '@/lib/db';
import type { MentalHealthAssessment } from '@/types/models';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');
  const assessmentId = searchParams.get('assessmentId');
  
  try {
    let query = `
      SELECT a.*, 
        GROUP_CONCAT(
          JSON_OBJECT(
            'questionId', ans.QuestionID,
            'questionText', q.QuestionText,
            'answerValue', ans.AnswerValue,
            'answerText', ans.AnswerText
          )
        ) as Answers
      FROM MentalHealthAssessments a
      LEFT JOIN MentalHealthAnswers ans ON a.AssessmentID = ans.AssessmentID
      LEFT JOIN MentalHealthQuestions q ON ans.QuestionID = q.QuestionID
      WHERE 1=1
    `;
    const params: any[] = [];

    if (userId) {
      query += ' AND a.UserID = ?';
      params.push(userId);
    }

    if (assessmentId) {
      query += ' AND a.AssessmentID = ?';
      params.push(assessmentId);
    }

    query += ' GROUP BY a.AssessmentID ORDER BY a.DateTaken DESC';

    // Updated to use object parameter format
    const assessments = await executeQuery<MentalHealthAssessment[]>({
      query,
      values: params
    });
    
    return NextResponse.json(assessments);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch assessments' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      userId,
      answers,
      totalScore,
      interpretationText,
      recommendationsText
    } = body;

    // Create assessment and its answers in a transaction
    const queries = [
      {
        query: `
          INSERT INTO MentalHealthAssessments (
            UserID, TotalScore, InterpretationText,
            RecommendationsText, DateTaken
          ) VALUES (?, ?, ?, ?, NOW())
        `,
        params: [userId, totalScore, interpretationText, recommendationsText]
      }
    ];

    // Add queries for each answer
    answers.forEach((answer: any) => {
      queries.push({
        query: `
          INSERT INTO MentalHealthAnswers (
            AssessmentID, QuestionID, AnswerValue, AnswerText
          ) VALUES (LAST_INSERT_ID(), ?, ?, ?)
        `,
        params: [answer.questionId, answer.value, answer.text]
      });
    });

    // If score indicates crisis, create immediate notification
    if (totalScore >= 20) { // Assuming 20+ indicates crisis
      queries.push({
        query: `
          INSERT INTO RealTimeNotifications (
            UserID, Title, Message, NotificationType,
            Priority, DateCreated
          ) VALUES (?, 'Mental Health Crisis Alert', ?, 'Crisis',
            'Critical', NOW())
        `,
        params: [
          userId,
          'User has submitted a mental health assessment indicating immediate support may be needed.'
        ]
      });

      // Also create a crisis support entry
      queries.push({
        query: `
          INSERT INTO MentalHealthCrisisSupport (
            UserID, AssessmentID, Status, DateReported
          ) VALUES (?, LAST_INSERT_ID(), 'New', NOW())
        `,
        params: [userId]
      });
    }

    await executeTransaction(queries);
    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save assessment' }, { status: 500 });
  }
}

// Route for getting assessment questions
export async function OPTIONS(request: Request) {
  try {
    // Updated to use object parameter format
    const questions = await executeQuery({
      query: 'SELECT * FROM MentalHealthQuestions WHERE IsActive = TRUE ORDER BY QuestionOrder'
    });
    
    return NextResponse.json(questions);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch questions' }, { status: 500 });
  }
}
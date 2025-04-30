import { RowDataPacket } from 'mysql2/promise';
import { MentalHealthAssessment, MentalHealthQuestion, MentalHealthAnswer } from './models';
import { executeQuery, executeTransaction } from './dbUtils';
import { PoolConnection, ResultSetHeader } from 'mysql2/promise';

/**
 * Mental Health Assessment repository
 * Handles database operations for mental health assessments and related data
 */

// Interfaces for database rows
interface MentalHealthAssessmentRow extends MentalHealthAssessment, RowDataPacket {}
interface MentalHealthQuestionRow extends MentalHealthQuestion, RowDataPacket {}
interface MentalHealthAnswerRow extends MentalHealthAnswer, RowDataPacket {}

// Interface for assessment statistics
interface AssessmentStats {
  TotalAssessments: number;
  AverageScore: number;
  FirstAssessment: Date;
  LastAssessment: Date;
  UniqueUsers: number;
}

/**
 * Get all mental health questions
 */
export async function getAllMentalHealthQuestions(
  activeOnly: boolean = true
): Promise<MentalHealthQuestion[]> {
  let query = 'SELECT * FROM MentalHealthQuestions';
  const params: unknown[] = [];
  
  if (activeOnly) {
    query += ' WHERE IsActive = TRUE';
  }
  
  query += ' ORDER BY QuestionOrder';
  
  return await executeQuery<MentalHealthQuestionRow>(query, params);
}

/**
 * Get assessment by ID including all answers
 */
export async function getAssessmentWithAnswers(
  assessmentId: number
): Promise<{ assessment: MentalHealthAssessment, answers: Array<MentalHealthAnswer & { QuestionText?: string }> } | null> {
  // Get the assessment
  const assessmentQuery = 'SELECT * FROM MentalHealthAssessments WHERE AssessmentID = ? LIMIT 1';
  const assessments = await executeQuery<MentalHealthAssessmentRow>(assessmentQuery, [assessmentId]);
  
  if (assessments.length === 0) {
    return null;
  }
  
  // Get the answers with questions
  const answersQuery = `
    SELECT a.*, q.QuestionText 
    FROM MentalHealthAnswers a
    JOIN MentalHealthQuestions q ON a.QuestionID = q.QuestionID
    WHERE a.AssessmentID = ?
    ORDER BY q.QuestionOrder
  `;
  
  const answers = await executeQuery<MentalHealthAnswerRow & { QuestionText: string }>(answersQuery, [assessmentId]);
  
  return {
    assessment: assessments[0],
    answers: answers
  };
}

/**
 * Create a new assessment with answers
 */
export async function createAssessment(
  userId: number,
  answers: Array<{
    questionId: number;
    answerValue: number;
    answerText?: string;
  }>,
  interpretationText?: string,
  recommendationsText?: string
): Promise<number> {
  return executeTransaction(async (connection: PoolConnection) => {
    // Calculate total score
    const totalScore = answers.reduce((sum, answer) => sum + answer.answerValue, 0);
    
    // Insert assessment
    const [assessmentResult] = await connection.query(
      `INSERT INTO MentalHealthAssessments 
       (UserID, TotalScore, InterpretationText, RecommendationsText, IsCompleted) 
       VALUES (?, ?, ?, ?, TRUE)`,
      [userId, totalScore, interpretationText || '', recommendationsText || '']
    );
    
    const assessmentId = (assessmentResult as ResultSetHeader).insertId;
    
    // Insert answers
    for (const answer of answers) {
      await connection.query(
        `INSERT INTO MentalHealthAnswers 
         (AssessmentID, QuestionID, AnswerValue, AnswerText) 
         VALUES (?, ?, ?, ?)`,
        [assessmentId, answer.questionId, answer.answerValue, answer.answerText || '']
      );
    }
    
    return assessmentId;
  });
}

/**
 * Generate interpretation and recommendations based on assessment score
 */
export function generateInterpretation(totalScore: number, maxPossibleScore: number): {
  interpretation: string;
  recommendations: string;
  severityLevel: 'minimal' | 'mild' | 'moderate' | 'severe';
} {
  // Calculate score as a percentage of maximum possible
  const scorePercentage = (totalScore / maxPossibleScore) * 100;
  
  let severityLevel: 'minimal' | 'mild' | 'moderate' | 'severe';
  let interpretation: string;
  let recommendations: string;
  
  // Determine severity level and provide appropriate interpretation
  if (scorePercentage < 25) {
    severityLevel = 'minimal';
    interpretation = 'Your responses suggest minimal symptoms of mental health concerns at this time.';
    recommendations = 'Consider practicing self-care strategies like regular exercise, healthy eating, and maintaining social connections. If you notice your symptoms worsening, consider reaching out to a mental health professional.';
  } else if (scorePercentage < 50) {
    severityLevel = 'mild';
    interpretation = 'Your responses suggest mild symptoms that may benefit from additional support.';
    recommendations = 'Consider connecting with a mental health professional for an evaluation. In the meantime, self-care activities, mindfulness practices, and peer support groups may be helpful. Check our resources page for free or low-cost options near you.';
  } else if (scorePercentage < 75) {
    severityLevel = 'moderate';
    interpretation = 'Your responses indicate moderate symptoms that would likely benefit from professional support.';
    recommendations = 'We recommend consulting with a mental health professional as soon as possible. Many services offer sliding scale fees or free support based on your circumstances. See our crisis resources if you need immediate support.';
  } else {
    severityLevel = 'severe';
    interpretation = 'Your responses indicate significant symptoms that require prompt attention from a mental health professional.';
    recommendations = 'Please contact a mental health professional or crisis service as soon as possible. If you\'re experiencing thoughts of harming yourself or others, please call 999 or go to your nearest A&E department immediately. The Samaritans are also available 24/7 at 116 123.';
  }
  
  // Add a disclaimer
  const disclaimer = '\n\nPlease note: This assessment is not a diagnostic tool and does not replace professional medical advice. It\'s meant to help you understand your current mental health needs better.';
  
  return {
    interpretation: interpretation + disclaimer,
    recommendations,
    severityLevel
  };
}

/**
 * Get assessment history for a user
 */
export async function getUserAssessmentHistory(userId: number): Promise<MentalHealthAssessment[]> {
  const query = `
    SELECT * FROM MentalHealthAssessments
    WHERE UserID = ? AND IsCompleted = TRUE
    ORDER BY DateTaken DESC
  `;
  
  return await executeQuery<MentalHealthAssessmentRow>(query, [userId]);
}

/**
 * Get assessment stats for reporting
 */
export async function getAssessmentStats(): Promise<AssessmentStats> {
  const query = `
    SELECT 
      COUNT(*) as TotalAssessments,
      AVG(TotalScore) as AverageScore,
      MIN(DateTaken) as FirstAssessment,
      MAX(DateTaken) as LastAssessment,
      COUNT(DISTINCT UserID) as UniqueUsers
    FROM MentalHealthAssessments
    WHERE IsCompleted = TRUE
  `;
  
  const results = await executeQuery<AssessmentStats & RowDataPacket>(query, []);
  return results[0];
}
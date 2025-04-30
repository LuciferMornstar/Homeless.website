'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import apiService from '@/lib/apiService';
import LoadingSpinner from './LoadingSpinner';

interface Question {
  QuestionID: number;
  QuestionText: string;
  QuestionOrder: number;
}

interface AssessmentProps {
  userId?: number; // Optional: If user is logged in
}

const MentalHealthAssessment: React.FC<AssessmentProps> = ({ userId }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<{
    interpretation: string;
    recommendations: string;
    severity: string;
  } | null>(null);
  const [isSimplifiedView, setIsSimplifiedView] = useState(false);
  const router = useRouter();

  // Fetch questions from API
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setIsLoading(true);
        const response = await apiService.get<Question[]>('mental-health-questions');
        if (response.success && response.data) {
          setQuestions(response.data);
        } else {
          setError('Failed to load assessment questions. Please try again later.');
        }
      } catch (err) {
        setError('An error occurred while loading the assessment. Please try again later.');
        console.error('Error fetching mental health questions:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  // Handle answer selection
  const handleAnswerSelect = (questionId: number, value: number) => {
    setAnswers({
      ...answers,
      [questionId]: value
    });
  };

  // Move to next question
  const handleNext = () => {
    if (currentQuestion && !answers[currentQuestion.QuestionID]) {
      alert('Please select an answer before continuing.');
      return;
    }

    if (currentStep < questions.length) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0); // Scroll to top for next question
    }
  };

  // Move to previous question
  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0); // Scroll to top for previous question
    }
  };

  // Submit assessment
  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      
      // Convert answers to array format expected by API
      const answersArray = Object.entries(answers).map(([questionId, value]) => ({
        questionId: parseInt(questionId),
        answerValue: value
      }));
      
      // Submit to API
      const response = await apiService.post<{ 
        assessmentId: number;
        interpretation: string;
        recommendations: string;
        severity: string;
      }>('mental-health-assessment', {
        userId: userId || null, // Allow anonymous assessments
        answers: answersArray
      });
      
      if (response.success && response.data) {
        setResults({
          interpretation: response.data.interpretation,
          recommendations: response.data.recommendations,
          severity: response.data.severity
        });
        setCurrentStep(questions.length + 1); // Move to results step
      } else {
        setError('Failed to submit assessment. Please try again later.');
      }
    } catch (err) {
      setError('An error occurred while submitting the assessment. Please try again later.');
      console.error('Error submitting mental health assessment:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Start over
  const handleStartOver = () => {
    setAnswers({});
    setCurrentStep(0);
    setResults(null);
    setError(null);
  };

  // Get current question
  const currentQuestion = currentStep < questions.length ? questions[currentStep] : null;

  // Toggle simplified view for users with different cognitive abilities
  const toggleSimplifiedView = () => {
    setIsSimplifiedView(!isSimplifiedView);
  };

  if (isLoading && questions.length === 0) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-lg">
        <h2 className="text-xl text-red-800 mb-2">Error</h2>
        <p className="text-red-700">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  // Introduction screen
  if (currentStep === 0) {
    return (
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-end mb-4">
          <button
            onClick={toggleSimplifiedView}
            className="text-sm bg-blue-50 text-blue-700 py-1 px-3 rounded border border-blue-300"
          >
            {isSimplifiedView ? "Switch to Detailed View" : "Switch to Simple View"}
          </button>
        </div>
        
        <h1 className="text-2xl font-bold text-center mb-6">Mental Health Check-In</h1>
        
        {isSimplifiedView ? (
          <>
            <div className="text-lg mb-6">
              <p className="mb-4">This is a simple check to see how you are feeling.</p>
              <p className="mb-4">Your answers can help us find ways to support you.</p>
              <p className="mb-4">This will take about 5 minutes.</p>
              <p className="mb-4">You can stop at any time.</p>
            </div>
            <ul className="list-disc pl-6 mb-6 text-lg">
              <li>There are {questions.length} questions</li>
              <li>Pick the answer that fits best for you</li>
              <li>This is private</li>
            </ul>
          </>
        ) : (
          <>
            <div className="text-gray-700 mb-6">
              <p className="mb-4">Welcome to our mental health assessment. This confidential questionnaire is designed to help you understand your current mental wellbeing and identify potential areas where support might be beneficial.</p>
              <p className="mb-4">Your responses will help us provide tailored recommendations for resources that may be useful to you. This assessment takes approximately 5 minutes to complete and consists of {questions.length} questions about how you've been feeling recently.</p>
              <p className="mb-4">Please note that this is not a diagnostic tool, but rather a way to help guide you toward appropriate support based on your current experiences. All information provided is confidential.</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg mb-6">
              <h3 className="font-semibold text-blue-800 mb-2">Before you begin:</h3>
              <ul className="list-disc pl-6 text-blue-700">
                <li>Try to answer as honestly as possible</li>
                <li>Consider how you've been feeling over the past two weeks</li>
                <li>You can stop at any time and return later</li>
                <li>Your responses are confidential</li>
              </ul>
            </div>
          </>
        )}
        
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => setCurrentStep(1)}
            className="bg-blue-600 text-white py-3 px-8 rounded-lg text-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Start Assessment
          </button>
        </div>
        
        <div className="mt-6 text-center text-gray-500 text-sm">
          <p>If you're in crisis and need immediate help, please call 999 or the Samaritans at 116 123</p>
        </div>
      </div>
    );
  }

  // Results screen
  if (results) {
    return (
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-end mb-4">
          <button
            onClick={toggleSimplifiedView}
            className="text-sm bg-blue-50 text-blue-700 py-1 px-3 rounded border border-blue-300"
          >
            {isSimplifiedView ? "Switch to Detailed View" : "Switch to Simple View"}
          </button>
        </div>
        
        <h1 className="text-2xl font-bold text-center mb-6">Your Assessment Results</h1>
        
        {isSimplifiedView ? (
          <>
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">How You Are Feeling:</h2>
              <p className="text-lg mb-4">{results.interpretation.split('\n\n')[0]}</p>
              
              <h2 className="text-xl font-semibold mt-6 mb-4">Things That Might Help:</h2>
              <p className="text-lg mb-4">{results.recommendations}</p>
              
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 mt-6">
                <p className="text-lg">This check-in is not the same as seeing a doctor. It just gives you ideas about how you're feeling.</p>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-3">Assessment Interpretation</h2>
              <p className="text-gray-700 mb-6 leading-relaxed">{results.interpretation}</p>
              
              <h2 className="text-xl font-semibold mb-3 mt-8">Recommendations</h2>
              <p className="text-gray-700 mb-6 leading-relaxed">{results.recommendations}</p>
              
              <div className="bg-blue-50 p-5 rounded-lg mt-8">
                <h3 className="text-lg font-semibold text-blue-800 mb-2">Next Steps</h3>
                <p className="text-blue-700 mb-4">Based on your responses, we've compiled a list of resources that may be helpful to you. These include local support services, self-help strategies, and professional care options.</p>
                <button
                  onClick={() => router.push('/mental-health')}
                  className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                >
                  View Recommended Resources
                </button>
              </div>
            </div>
          </>
        )}
        
        <div className="flex flex-col md:flex-row justify-center gap-4 mt-8">
          <button
            onClick={handleStartOver}
            className="bg-gray-200 text-gray-800 py-2 px-6 rounded hover:bg-gray-300"
          >
            Take Again
          </button>
          <button
            onClick={() => router.push('/mental-health')}
            className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700"
          >
            Find Support
          </button>
          {userId && (
            <button
              onClick={() => router.push('/profile')}
              className="bg-green-600 text-white py-2 px-6 rounded hover:bg-green-700"
            >
              Save to Profile
            </button>
          )}
        </div>
        
        <div className="mt-8 text-center">
          <p className="font-semibold">Need immediate help?</p>
          <p className="text-gray-700">Call the Samaritans: 116 123 (free, 24/7)</p>
          <p className="text-gray-700">Text SHOUT to 85258 (free, 24/7)</p>
          <p className="text-gray-700">For emergencies, call 999</p>
        </div>
      </div>
    );
  }

  // Question screen
  if (currentQuestion) {
    const questionNumber = currentStep;
    const totalQuestions = questions.length;
    const progress = (questionNumber / totalQuestions) * 100;

    return (
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6">
          <span className="text-gray-600">
            Question {questionNumber} of {totalQuestions}
          </span>
          <button
            onClick={toggleSimplifiedView}
            className="text-sm bg-blue-50 text-blue-700 py-1 px-3 rounded border border-blue-300"
          >
            {isSimplifiedView ? "Switch to Detailed View" : "Switch to Simple View"}
          </button>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
          <div 
            className="bg-blue-600 h-2.5 rounded-full" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        
        <div className="mb-8">
          <h2 className={isSimplifiedView ? "text-xl font-semibold mb-4" : "text-lg font-medium mb-4"}>
            {currentQuestion.QuestionText}
          </h2>
          
          <div className="space-y-3 mt-6">
            {isSimplifiedView ? (
              // Simplified view with emojis and simpler text
              <>
                <button
                  onClick={() => handleAnswerSelect(currentQuestion.QuestionID, 0)}
                  className={`w-full text-left p-4 rounded-lg border ${
                    answers[currentQuestion.QuestionID] === 0
                      ? "bg-green-100 border-green-400"
                      : "border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  <span className="text-2xl mr-3">😊</span> Not at all
                </button>
                <button
                  onClick={() => handleAnswerSelect(currentQuestion.QuestionID, 1)}
                  className={`w-full text-left p-4 rounded-lg border ${
                    answers[currentQuestion.QuestionID] === 1
                      ? "bg-green-100 border-green-400"
                      : "border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  <span className="text-2xl mr-3">🙂</span> A little bit
                </button>
                <button
                  onClick={() => handleAnswerSelect(currentQuestion.QuestionID, 2)}
                  className={`w-full text-left p-4 rounded-lg border ${
                    answers[currentQuestion.QuestionID] === 2
                      ? "bg-yellow-100 border-yellow-400"
                      : "border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  <span className="text-2xl mr-3">😐</span> Sometimes
                </button>
                <button
                  onClick={() => handleAnswerSelect(currentQuestion.QuestionID, 3)}
                  className={`w-full text-left p-4 rounded-lg border ${
                    answers[currentQuestion.QuestionID] === 3
                      ? "bg-orange-100 border-orange-400"
                      : "border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  <span className="text-2xl mr-3">😟</span> Most of the time
                </button>
              </>
            ) : (
              // Detailed view with more nuanced options
              <>
                <button
                  onClick={() => handleAnswerSelect(currentQuestion.QuestionID, 0)}
                  className={`w-full text-left p-3 rounded-lg border ${
                    answers[currentQuestion.QuestionID] === 0
                      ? "bg-green-50 border-green-300"
                      : "border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  Not at all - I haven't experienced this
                </button>
                <button
                  onClick={() => handleAnswerSelect(currentQuestion.QuestionID, 1)}
                  className={`w-full text-left p-3 rounded-lg border ${
                    answers[currentQuestion.QuestionID] === 1
                      ? "bg-green-50 border-green-300"
                      : "border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  Several days - Occasionally but not persistently
                </button>
                <button
                  onClick={() => handleAnswerSelect(currentQuestion.QuestionID, 2)}
                  className={`w-full text-left p-3 rounded-lg border ${
                    answers[currentQuestion.QuestionID] === 2
                      ? "bg-yellow-50 border-yellow-300"
                      : "border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  More than half the days - Frequently and notably
                </button>
                <button
                  onClick={() => handleAnswerSelect(currentQuestion.QuestionID, 3)}
                  className={`w-full text-left p-3 rounded-lg border ${
                    answers[currentQuestion.QuestionID] === 3
                      ? "bg-orange-50 border-orange-300"
                      : "border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  Nearly every day - Consistently and significantly
                </button>
              </>
            )}
          </div>
        </div>
        
        <div className="flex justify-between mt-8">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className={`py-2 px-5 rounded ${
              currentStep === 1
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            Previous
          </button>
          
          {currentStep < totalQuestions ? (
            <button
              onClick={handleNext}
              disabled={answers[currentQuestion.QuestionID] === undefined}
              className={`py-2 px-5 rounded ${
                answers[currentQuestion.QuestionID] === undefined
                  ? "bg-blue-300 text-white cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={answers[currentQuestion.QuestionID] === undefined}
              className={`py-2 px-5 rounded ${
                answers[currentQuestion.QuestionID] === undefined
                  ? "bg-green-300 text-white cursor-not-allowed"
                  : "bg-green-600 text-white hover:bg-green-700"
              }`}
            >
              Submit
            </button>
          )}
        </div>
        
        <div className="mt-6 text-center">
          <button
            onClick={handleStartOver}
            className="text-blue-600 hover:underline"
          >
            Cancel and start over
          </button>
        </div>
      </div>
    );
  }

  return null;
};

export default MentalHealthAssessment;

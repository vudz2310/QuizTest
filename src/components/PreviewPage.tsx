import { useState } from 'react';
import type { Quiz } from '../types';

interface PreviewPageProps {
  quiz: Quiz;
  onBack: () => void;
}

export function PreviewPage({ quiz, onBack }: PreviewPageProps) {
  const [userAnswers, setUserAnswers] = useState<Record<string, string[]>>({});
  const [showResults, setShowResults] = useState(false);

  const toggleAnswer = (questionId: string, optionValue: string) => {
    setUserAnswers(prev => {
      const current = prev[questionId] || [];
      const isSelected = current.includes(optionValue);
      
      return {
        ...prev,
        [questionId]: isSelected
          ? current.filter(v => v !== optionValue)
          : [...current, optionValue]
      };
    });
  };

  const calculateScore = () => {
    let correct = 0;
    let total = quiz.questions.length;

    quiz.questions.forEach(question => {
      const userAnswer = userAnswers[question.id] || [];
      const correctAnswer = question.correctOptionValues;

      // Kiểm tra nếu user chọn đúng tất cả và không chọn thừa
      const isCorrect = 
        userAnswer.length === correctAnswer.length &&
        userAnswer.every(ans => correctAnswer.includes(ans));

      if (isCorrect) correct++;
    });

    return { correct, total, percentage: Math.round((correct / total) * 100) };
  };

  const handleSubmit = () => {
    setShowResults(true);
  };

  const handleReset = () => {
    setUserAnswers({});
    setShowResults(false);
  };

  const score = showResults ? calculateScore() : null;

  return (
    <div className="preview-page">
      <div className="preview-header">
        <button onClick={onBack} className="btn-back">Back to Edit</button>
        <h1>Quiz Preview</h1>
      </div>

      <div className="preview-content">
        <div className="quiz-title-card">
          <h2>{quiz.name || 'Untitled Quiz'}</h2>
          {quiz.description && <p>{quiz.description}</p>}
          <div className="quiz-meta">
            <span>{quiz.questions.length} Questions</span>
          </div>
        </div>

        {showResults && score && (
          <div className={`result-card ${score.percentage >= 70 ? 'pass' : 'fail'}`}>
            <h3>Results</h3>
            <div className="score-big">{score.correct}/{score.total}</div>
            <div className="score-percent">{score.percentage}%</div>
            <p>
              {score.percentage >= 70 
                ? 'Congratulations! You passed!'
                : 'Keep trying! You can do better.'}
            </p>
            <button onClick={handleReset} className="btn-reset">Try Again</button>
          </div>
        )}

        <div className="questions-preview">
          {quiz.questions.length === 0 ? (
            <div className="empty-state">
              No questions available. Go back to add questions.
            </div>
          ) : (
            quiz.questions.map((question, index) => {
              const userAnswer = userAnswers[question.id] || [];
              const isCorrect = showResults && 
                userAnswer.length === question.correctOptionValues.length &&
                userAnswer.every(ans => question.correctOptionValues.includes(ans));

              return (
                <div 
                  key={question.id} 
                  className={`question-preview ${showResults ? (isCorrect ? 'correct' : 'incorrect') : ''}`}
                >
                  <div className="question-number">
                    Question {index + 1}
                    {showResults && (
                      <span className={`result-badge ${isCorrect ? 'correct' : 'wrong'}`}>
                        {isCorrect ? 'Correct' : 'Incorrect'}
                      </span>
                    )}
                  </div>
                  
                  <h3>{question.name}</h3>
                  {question.description && (
                    <p className="question-desc">{question.description}</p>
                  )}

                  <div className="options-preview">
                    {question.options.length === 0 ? (
                      <p className="no-options">No options available</p>
                    ) : (
                      question.options.map(option => {
                        const isSelected = userAnswer.includes(option.value);
                        const isCorrectOption = question.correctOptionValues.includes(option.value);
                        
                        let optionClass = 'option-preview';
                        if (showResults) {
                          if (isCorrectOption) {
                            optionClass += ' correct-option';
                          }
                          if (isSelected && !isCorrectOption) {
                            optionClass += ' wrong-option';
                          }
                        } else if (isSelected) {
                          optionClass += ' selected';
                        }

                        return (
                          <label 
                            key={option.id} 
                            className={optionClass}
                          >
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => toggleAnswer(question.id, option.value)}
                              disabled={showResults}
                            />
                            <span className="option-text">{option.label || option.value}</span>
                            {showResults && isCorrectOption && (
                              <span className="correct-badge">Correct</span>
                            )}
                          </label>
                        );
                      })
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {quiz.questions.length > 0 && !showResults && (
          <div className="submit-section">
            <button onClick={handleSubmit} className="btn-submit">
              Submit Quiz
            </button>
          </div>
        )}
      </div>
    </div>
  );
}


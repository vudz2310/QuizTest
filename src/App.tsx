import { useState, useEffect } from 'react';
import './App.css';
import type { Quiz, Question } from './types';
import { QuizHeader } from './components/QuizHeader';
import { QuizInfo } from './components/QuizInfo';
import { QuestionCard } from './components/QuestionCard';
import { ActionBar } from './components/ActionBar';
import { PreviewPage } from './components/PreviewPage';
import { PopupName } from './components/PopupName';

function App() {
  const [quiz, setQuiz] = useState<Quiz>({
    name: '',
    description: '',
    questions: []
  });
  
  const [showPopup, setShowPopup] = useState(false);
  const [isPreview, setIsPreview] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("nameUser")) {
      setShowPopup(true);
    } else {
      setShowPopup(false);
    }
  }, []);

  const addQuestion = () => {
    const newQuestion: Question = {
      id: Date.now().toString(),
      name: '',
      description: '',
      sortOrder: quiz.questions.length,
      options: [],
      correctOptionValues: []
    };
    setQuiz({ ...quiz, questions: [...quiz.questions, newQuestion] });
  };

  const updateQuestion = (questionId: string, updatedQuestion: Question) => {
    setQuiz({
      ...quiz,
      questions: quiz.questions.map(q => q.id === questionId ? updatedQuestion : q)
    });
  };

  const deleteQuestion = (questionId: string) => {
    setQuiz({
      ...quiz,
      questions: quiz.questions.filter(q => q.id !== questionId)
    });
  };

  if (isPreview) {
    return <PreviewPage quiz={quiz} onBack={() => setIsPreview(false)} />;
  }

  return (
    <div className="container">
      <QuizHeader />
      
      <QuizInfo quiz={quiz} onChange={setQuiz} />

      <div className="card">
        <div className="section-header">
          <h2>Questions</h2>
          <button onClick={addQuestion} className="btn-add">Add Question</button>
        </div>

        {quiz.questions.length === 0 ? (
          <p className="empty-state">No questions yet. Click "Add Question" to start.</p>
        ) : (
          quiz.questions.map((question, index) => (
            <QuestionCard
              key={question.id}
              question={question}
              index={index}
              onUpdate={(updated) => updateQuestion(question.id, updated)}
              onDelete={() => deleteQuestion(question.id)}
            />
          ))
        )}
      </div>

      <div className="card preview-toggle">
        <button onClick={() => setIsPreview(true)} className="btn-preview">
          Preview Quiz
        </button>
      </div>

      <ActionBar quiz={quiz} onImport={setQuiz} />
    </div>
  );
}

export default App;

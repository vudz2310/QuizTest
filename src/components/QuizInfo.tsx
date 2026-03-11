import type { Quiz } from '../types';

interface QuizInfoProps {
  quiz: Quiz;
  onChange: (quiz: Quiz) => void;
}

export function QuizInfo({ quiz, onChange }: QuizInfoProps) {
  return (
    <div className="card">
      <h2>Quiz Information</h2>
      
      <div className="form-group">
        <label>Quiz Name *</label>
        <input
          type="text"
          value={quiz.name}
          onChange={(e) => onChange({ ...quiz, name: e.target.value })}
          placeholder="Enter quiz name"
        />
      </div>

      <div className="form-group">
        <label>Description</label>
        <textarea
          value={quiz.description}
          onChange={(e) => onChange({ ...quiz, description: e.target.value })}
          placeholder="Enter quiz description (optional)"
          rows={3}
        />
      </div>
    </div>
  );
}


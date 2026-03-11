import type { Question, Option } from '../types';
import { OptionRow } from './OptionRow';

interface QuestionCardProps {
  question: Question;
  index: number;
  onUpdate: (question: Question) => void;
  onDelete: () => void;
}

export function QuestionCard({ question, index, onUpdate, onDelete }: QuestionCardProps) {
  
  const addOption = () => {
    const newOption: Option = {
      id: Date.now().toString(),
      value: '',
      label: '',
      sortOrder: question.options.length
    };
    onUpdate({ ...question, options: [...question.options, newOption] });
  };

  const updateOption = (optionId: string, updatedOption: Option) => {
    onUpdate({
      ...question,
      options: question.options.map(o => o.id === optionId ? updatedOption : o)
    });
  };

  const deleteOption = (optionId: string) => {
    const option = question.options.find(o => o.id === optionId);
    onUpdate({
      ...question,
      options: question.options.filter(o => o.id !== optionId),
      correctOptionValues: option 
        ? question.correctOptionValues.filter(v => v !== option.value)
        : question.correctOptionValues
    });
  };

  const toggleCorrectOption = (optionValue: string) => {
    const isCorrect = question.correctOptionValues.includes(optionValue);
    onUpdate({
      ...question,
      correctOptionValues: isCorrect
        ? question.correctOptionValues.filter(v => v !== optionValue)
        : [...question.correctOptionValues, optionValue]
    });
  };

  return (
    <div className="question-card">
      <div className="question-header">
        <h3>Question {index + 1}</h3>
        <button onClick={onDelete} className="btn-delete">Delete</button>
      </div>

      <div className="form-group">
        <label>Question Name *</label>
        <input
          type="text"
          value={question.name}
          onChange={(e) => onUpdate({ ...question, name: e.target.value })}
          placeholder="Enter question"
        />
      </div>

      <div className="form-group">
        <label>Description</label>
        <textarea
          value={question.description}
          onChange={(e) => onUpdate({ ...question, description: e.target.value })}
          placeholder="Enter description (optional)"
          rows={2}
        />
      </div>

      <div className="form-group">
        <label>Sort Order</label>
        <input
          type="number"
          value={question.sortOrder}
          onChange={(e) => onUpdate({ ...question, sortOrder: parseInt(e.target.value) })}
          min="0"
          style={{ width: '100px' }}
        />
      </div>

      <div className="options-section">
        <div className="section-header">
          <label>Options (minimum 2 required) *</label>
          <button onClick={addOption} className="btn-add">Add Option</button>
        </div>

        {question.options.length === 0 ? (
          <p className="empty-state">No options yet. Click "Add Option" to create one.</p>
        ) : (
          <div>
            <p className="hint">Check the box for correct answer(s)</p>
            {question.options.map(option => (
              <OptionRow
                key={option.id}
                option={option}
                isCorrect={question.correctOptionValues.includes(option.value)}
                onUpdate={(updated) => updateOption(option.id, updated)}
                onToggleCorrect={() => toggleCorrectOption(option.value)}
                onDelete={() => deleteOption(option.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}


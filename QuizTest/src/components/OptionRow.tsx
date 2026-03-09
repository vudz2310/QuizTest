import type { Option } from '../types';

interface OptionRowProps {
  option: Option;
  isCorrect: boolean;
  onUpdate: (option: Option) => void;
  onToggleCorrect: () => void;
  onDelete: () => void;
}

export function OptionRow({ option, isCorrect, onUpdate, onToggleCorrect, onDelete }: OptionRowProps) {
  return (
    <div className="option-row">
      <input
        type="checkbox"
        checked={isCorrect}
        onChange={onToggleCorrect}
        title="Correct answer"
      />

      <input
        type="text"
        value={option.value}
        onChange={(e) => onUpdate({ ...option, value: e.target.value })}
        placeholder="Value (e.g., A)"
        className="option-value"
      />

      <input
        type="text"
        value={option.label}
        onChange={(e) => onUpdate({ ...option, label: e.target.value })}
        placeholder="Label (e.g., JavaScript)"
        className="option-label"
      />

      <input
        type="number"
        value={option.sortOrder}
        onChange={(e) => onUpdate({ ...option, sortOrder: parseInt(e.target.value) })}
        className="option-sort"
        min="0"
      />

      <button onClick={onDelete} className="btn-delete-small">Delete</button>
    </div>
  );
}


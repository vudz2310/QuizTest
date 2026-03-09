import { useRef } from 'react';
import type { Quiz } from '../types';

interface ActionBarProps {
  quiz: Quiz;
  onImport: (quiz: Quiz) => void;
}

export function ActionBar({ quiz, onImport }: ActionBarProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    const json = JSON.stringify(quiz, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = quiz.name ? `${quiz.name.toLowerCase().replace(/\s+/g, '-')}.json` : 'quiz.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const importedQuiz = JSON.parse(text);
      onImport(importedQuiz);
      alert('Quiz imported successfully!');
    } catch (error) {
      alert('Error: Invalid JSON file');
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="card actions">
      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        onChange={handleImport}
        style={{ display: 'none' }}
      />
      
      <button onClick={() => fileInputRef.current?.click()}>
        Import JSON
      </button>
      
      <button onClick={handleExport} className="primary">
        Export JSON
      </button>
    </div>
  );
}


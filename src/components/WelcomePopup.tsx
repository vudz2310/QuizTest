import { useState } from 'react';

interface WelcomePopupProps {
  onSubmit: (name: string) => void;
}

export function WelcomePopup({ onSubmit }: WelcomePopupProps) {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onSubmit(name.trim());
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>Welcome to Quiz Editor</h2>
        <p>Please enter your name to get started</p>
        
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            autoFocus
            required
          />
          <button type="submit" className="btn-submit">
            Start
          </button>
        </form>
      </div>
    </div>
  );
}


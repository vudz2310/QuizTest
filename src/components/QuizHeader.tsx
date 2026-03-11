interface QuizHeaderProps {
  userName?: string;
}

export function QuizHeader({ userName }: QuizHeaderProps) {
  return (
    <div className="header">
      <h1>Quiz Editor</h1>
      <p>Create and manage your quizzes</p>
      {userName && (
        <div className="user-greeting">
          Welcome, {userName}!
        </div>
      )}
    </div>
  );
}

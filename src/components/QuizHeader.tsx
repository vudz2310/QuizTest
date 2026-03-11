import React from "react";

const NameUser = localStorage.getItem("nameUser") || "User";
export function QuizHeader() {
  return (
    <div className="header">
      <h1>Quiz Editor</h1>
      <p>Create and manage your quizzes</p>
      <p>Welcome, {NameUser}!</p> 
      <h1></h1>
    </div>
  );
}


export interface Option {
  id: string;
  value: string;
  label: string;
  sortOrder: number;
}

export interface Question {
  id: string;
  name: string;
  description: string;
  sortOrder: number;
  options: Option[];
  correctOptionValues: string[];
}

export interface Quiz {
  name: string;
  description: string;
  questions: Question[];
}


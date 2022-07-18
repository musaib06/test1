export interface Answers {
  answerId: number;
  questionId: number;
  answerDescription: string;
  isCorrect: boolean;
}
export interface QuestionAnswers {
  id: number;
  question: string;
  options: Answers[];
}

export interface QuizQuestion {
  id?: number | string;
  question: string;
  answer: string;
  option2: string;
  option3: string;
  option4: string;
}

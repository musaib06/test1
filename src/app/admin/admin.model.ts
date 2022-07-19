export interface editQuestion {
  id: number;
  question: string;
options:{
  answer: string;
  option2: string;
  option3: string;
  option4: string;
}}

export interface addQuestions {
  id?: number | string;
  question: string;
  answer: string;
  option2: string;
  option3: string;
  option4: string;
}



// export interface submitQuestion{
//   question:string,
//   answer:string,
//   option2:string,
//   option3:string,
//   option4:string,
// }


// export class Question {
//   submit: submitQuestion [] = [];
// }
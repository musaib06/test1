import { Injectable } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { QuizQuestion } from '../exam-dashboard/exam.model';

@Injectable({
  providedIn: 'root',
})
export class CustomDbService {
  constructor(private dbService: NgxIndexedDBService) {}

  public question: QuizQuestion;

  getQuizQuestion(questionId: string | number): QuizQuestion {
    this.dbService.getByKey('adminTable', 1).subscribe((res) => {
       this.setQuestion(res)
      });
    return this.getQuestion();
  }
  setQuestion(result) {
    this.question = result;
  }

  getQuestion() {
    return this.question;
  }

  getAllQuizQuestions(): QuizQuestion {
    this.dbService.getAll('adminTable').subscribe((res) => {
      //   this.question = res;
      console.log(res);
    });

    return this.question;
  }

  getQuizQuestionByIndex(questionId: string | number): QuizQuestion {
    this.dbService
      .getByIndex('adminTable', 'question', 'question 4')
      .subscribe((res) => {
        this.question = res;
        console.log(res);
      });

    return this.question;
  }

  getQuizQuestionByKey(key: number): QuizQuestion {
    this.dbService.getByKey('adminTable', key).subscribe((res) => {
      this.question = res;
      console.log(res);
    });

    return this.question;
  }
}

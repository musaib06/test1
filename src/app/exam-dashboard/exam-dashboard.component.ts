import { Component, OnInit } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { element, Key } from 'protractor';
import { idText } from 'typescript';

import { QuestionAnswers } from './exam.model';

@Component({
  selector: 'app-exam-dashboard',
  templateUrl: './exam-dashboard.component.html',
  styleUrls: ['./exam-dashboard.component.css'],
})
export class ExamDashboardComponent implements OnInit {
  quiz: QuestionAnswers[] = [];
  submitted: boolean = false;
  displayStyle = 'none';
  public index: number = 0;

  public ans: string = '';
  constructor(private dbService: NgxIndexedDBService) {}
  ngOnInit(): void {
    this.getAllData();
  }
  getAllData() {
  
    this.dbService.getByID('adminTable',4).subscribe((res) => {
      // res.forEach(async (questionDB) => {
      //   // let question = await this.addQuestionToUI(questionDB);
      //   this.quiz
      // });
      this.quiz= res;
      console.log(this.quiz);
    });
  }
  // async addQuestionToUI(questionDb: any) {
  //   // let question: QuestionAnswers = {
  //   //   id: questionDb.id,
  //   //   question: questionDb.question,
  //   //   options: [],
  //   // };

  //   // let answers = await this.getAnswersByQuestionId(questionDb.id);
  //   // question.options.push(...answers);
  //   // answers.forEach((answer) => {
  //   //   question.options.push({
  //   //     answerId: answer.id,
  //   //     answerDescription: answer.answer,
  //   //     isCorrect: answer.isCorrect,
  //   //     questionId: answer.question_id,
  //   //   });
  //   // });
  //   // return question;
  // }

  // async getAnswersByQuestionId(id: number) {
  //   // await this.dbService
  //   //   .getByIndex('userResponse', 'question_Id', id)
  //   //   .subscribe(async (res) => {
  //   //     // this.quiz = res;
  //   //     return res;
  //   //     // console.log(quiz);
  //   //   });
  // }
  submitResponse(selectedItem) {
    let answer = this.ans;
    let question_id = selectedItem.id;
    this.submitted = true;
    this.dbService
      .add('userResponse', {
        question_id,
        answer,
        user_id: 5,
      })
      .subscribe((key) => {
        this.getAllData();
        this.displayStyle = 'none';
      });
  }
  changeQuestion(direction: string) {
    if (direction === 'next') {
      this.index = this.index + 1;
    } else {
      this.index = this.index - 1;
    }
    console.log('question', this.index);
  }
}

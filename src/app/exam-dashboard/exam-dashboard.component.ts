import { Component, OnInit } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { CustomDbService } from '../services/dbservice.service';
import { QuestionAnswers, QuizQuestion } from './exam.model';

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

  public question: QuizQuestion;

  public ans: string = '';
  public questionKey = 1;
  public hasData: boolean;
  constructor(
    private customDbService: CustomDbService,
    private dbService: NgxIndexedDBService
  ) {}
  ngOnInit(): void {
    this.getData();
  }

  getData() {
    // this.question=this.customDbService.getQuizQuestion(this.questionKey)
    this.dbService.getByKey('adminTable', this.questionKey).subscribe((res) => {
      this.question = res;
      this.hasData = true;
    });
  }
  fetchNextQuestion() {
    this.dbService.getByKey('adminTable', this.questionKey).subscribe((res) => {
      this.question = res;
      if (this.question) {
        this.hasData = true;
      } else {
        this.hasData = false;
      }
    });
  }

 submitResponse(question) {
    this.questionKey = this.questionKey + 1;
    console.log('submitting.', question);
    this.fetchNextQuestion();
    {
        let answer = this.ans;
        let question_id = question.id;
        this.submitted = true;
        this.dbService
          .add('userResponse', {
            question_id,
            answer,
            user_id: 5,
          })
          .subscribe((key) => {
            this.getData();
            this.displayStyle = 'none';
          });
      }
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
// submitResponse(selectedItem) {
//   let answer = this.ans;
//   let question_id = selectedItem.id;
//   this.submitted = true;
//   this.dbService
//     .add('userResponse', {
//       question_id,
//       answer,
//       user_id: 5,
//     })
//     .subscribe((key) => {
//       this.getAllData();
//       this.displayStyle = 'none';
//     });
// }
// changeQuestion(direction: string) {
//   if (direction === 'next') {
//     this.index = this.index + 1;
//   } else {
//     this.index = this.index - 1;
//   }
//   console.log('question', this.index);
  }
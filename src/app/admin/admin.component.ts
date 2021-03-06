import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { StorageService } from '../storage.service';
import { addQuestions } from './admin.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  public isUpdate: boolean = false;
  public isMenuCollapsed = true;

  submitted: boolean = false;

  returnMsg: string;
  up: boolean = false;
  showUpdate: boolean = false;
  public user: addQuestions[] = [];

  constructor(
    private dbService: NgxIndexedDBService,
    private storageService: StorageService,
    private route: ActivatedRoute
  ) {
    // this.getFromIndexDb(this.email)
    this.getAllData();
  }

  submit(form: NgForm) {
    let questions = form.value;
    this.submitted = true;
    if (
      questions.question &&
      questions.answer &&
      questions.option2 &&
      questions.option3 &&
      questions.option4
    ) {
      this.dbService
        .add('adminTable', {
          question: questions.question,
          answer: questions.answer,
          option2: questions.option2,
          option3: questions.option3,
          option4: questions.option4,
        })
        .subscribe((key) => {
          console.log('key: ', key);
          this.getAllData();

          this.displayStyle = 'none';
          this.submitted = true;
        });
    }
    form.resetForm();
  }

  fileData: any;
  fileEvent(e, form) {
    //get attached file
    this.fileData = e.target.files[0];
    let data = form.value;
    data.photo = this.fileData;
  }

  tableData: any;
  getAllData() {
    this.dbService.getAll('adminTable').subscribe((res) => {
      this.tableData = res;
    });
  }
  search: any;
  data: any;
  deleteData(id) {
    var key = id;

    this.dbService.delete('adminTable', id).subscribe((res) => {
      this.getAllData();
    });
  }
  displayStyle = 'none';

  openSubPopup() {
    console.log('working');
    this.displayStyle = 'block';
  }

  closeSubPopup() {
    this.displayStyle = 'none';
  }

  submitTable: any;
  openPopup() {
    console.log('working');
    this.displayStyle = 'block';
  }

  closeUpdate() {
    this.isUpdate = false;
  }

  // updateData(formm) {
  //   const dataa = formm.value;
  //   console.log(dataa);

  //   //add dataa to indexedDB
  //   this.dbService
  //     .update('adminTable', {
  //       id: this.updateUser.id,
  //       question: dataa.question,
  //       answer: dataa.answer,
  //       // profile_photo: '',
  //       option2: dataa.option2,
  //       option3: dataa.option3,
  //       option4: dataa.option4,
  //     })
  //     .subscribe((key) => {
  //       alert('updated successfully');
  //       // console.log('key: ', key);
  //       this.getAllData();
  //       this.isUpdate = false;
  //       this.displayStyle = 'none';
  //     });

  //   console.log('your data is invalid ');
  // }
  ngOnInit(): void {
    // this.addDummyData();
  }

  // addDummyData(){
  //   this.dbService
  //   .add('adminTable', {
  //     question: "This Is test question",
  //     answer: 'answer',
  //     option2: 'Option2',
  //     option3: 'option3',
  //     option4: 'option 4',
  //   })
  //   .subscribe((key) => {
  //     console.log('key: ', key);
  //   });
  //   this.dbService
  //   .add('newTable', {
  //     question: "This Is test question in newTable",
  //   })
  //   .subscribe((key) => {
  //     console.log('key: ', key);
  //   });
  // }
}

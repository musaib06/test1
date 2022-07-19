import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxIndexedDBService } from 'ngx-indexed-db';

@Component({
  selector: 'app-update-question',
  templateUrl: './update-question.component.html',
  styleUrls: ['./update-question.component.css']
})
export class UpdateQuestionComponent implements OnInit {
  // updateUser: editQuestion;
  updateUser:any;

  constructor(private route:ActivatedRoute,private dbService: NgxIndexedDBService ) 
  
  { 

  }

  ngOnInit(): void {
    this.get();

  }
  get(){
    const id = Number(this.route.snapshot.paramMap.get('id'));
     this.dbService.getByID('adminTable',id).subscribe((result)=>{
      console.log(result);

      this.updateUser=result;
     })
  }
  updateData(formm: any) {
    const Id = Number(this.route.snapshot.paramMap.get('id'));
    console.log("formm value",formm.value);
    // console.log(formm.value.name);
    // const Image=formm.value.image;
    this.dbService.update('adminTable',{
      id:Id,
      question:formm.value.question,
      answer:formm.value.answer,
      option2:formm.value.option2,
      option3:formm.value.option3,
      option4:formm.value.option4
    }).subscribe((result)=>{
    });
    
  }
}



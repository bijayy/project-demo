import { Component, OnInit } from '@angular/core'
import { Student } from '../models/student.model';
import { StudentService } from '../services/student.service';

@Component({
    selector: 'student-search',
    template: `

    <div [ngClass]="['box']">
    <div class="title">{{title | uppercase}}</div>
        <div>
            <label for="id">Student ID:</label>
            <em>{{message}}</em>
            <input #id type="number" id="id" name="id" placeholder="Enter Id..." />
        </div>
        <button type="button" [disabled] = "" (click)="getStudentById(id.value)">Search</button>
        <div *ngIf="student">
            <div>Student Name: {{student.Id}}</div>
            <div>Student Name: {{student.Name}}</div>
            <div>Student Email ID: {{student.Email}}</div>
        </div>
        <div *ngIf="!student">{{message}}</div>
    <div>
    `,
    styles: [`
        .box {
            background-color: lightgrey;
            border: 5px solid darkgrey;
            border-radius: 5px;
            margin: 0 0 5px 0;
            padding: 20px;
            width: 600px;
        }

        div div input, label {
            margin: 0 0 10px 0;
        }

        label {
            height: 30px;
            font-size:14pt;
        }

        button {
            height: 30px;
            font-size:14pt;
            border-radius: 5px;
            cursor: pointer;
        }

        input {
            width: 95%;
            height: 30px;
            padding-left: 10px;
            border-radius: 5px;
            font-size:14pt;
        }
    `]
})

export class StudentSearchComponent {
    title = "Student Search Section"
    student: Student
    message: string

    constructor(private studentService: StudentService) {
    
    }

    getStudentById(id: number) {
        this.student = null

        if(id > 0) {
            this.studentService.getStudentById(id).subscribe(student => {
            if(student) {
                this.student = student
                console.log(this.student)
            }
            else {
                this.message = `student with id: ${id} not found`
            }
            })
        }
        else {
            this.message = `Student Id is Required`
        }
      }
}
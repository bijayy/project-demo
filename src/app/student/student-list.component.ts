import { Component, OnInit, Input } from '@angular/core'
import { Student } from '../models/student.model';
import { StudentService } from '../services/student.service';
import { Router } from '@angular/router';

@Component({
    selector: 'student-list',
    template: `
    <div [ngClass]="['box']" *ngIf="students">
        <div class="title">{{title | uppercase }}</div>
        <div *ngFor="let student of students">
            <div [ngClass]="['design']">
                <div>Student Id: {{student.Id}}</div>
                <div>Student Name: {{student.Name}}</div>
                <div>Student Email ID: {{student.Email}}</div>
            </div>
            <button (click)="deleteStudent(student.Id)" type="button">Delete</button>
            <button [routerLink]="['/student/update', student.Id]" type="button">Edit</button>
        </div>
    </div>
    <h5 *ngIf="!students">{{message}}</h5>
    `,

    styles: [
        `
        .design {
            padding: 0 0 10px 0;
        }

        .box {
            background-color: lightgrey;
            border: 5px solid darkgrey;
            border-radius: 5px;
            margin: 0 0 5px 0;
            padding: 5px;
            width: 600px;
        }

        button {
            padding: 5px;
            margin-right: 5px;
            border-radius: 10px;
            cursor: pointer;
        }
        `
    ]
})

export class StudentListComponent implements OnInit {

    title: string = "Showing Records of all students"
    students: Student[]
    message: string = ""
    
    constructor(private route:Router, private studentService: StudentService) {
    
    }
  
    ngOnInit() {
        this.students = null
        this.studentService.getStudents().subscribe(students => {
            if(students) {
                this.students = students
                console.log(this.students)
            }
            else {
                this.message = "No record found, please try again later."
            }
        })
    }

    deleteStudent(id: number) {
        console.log(id)
        this.studentService.deleteStudent(id).subscribe((message) => {
            this.students.splice(this.students.findIndex(x => x.Id == id), 1 );
        })
    }
}
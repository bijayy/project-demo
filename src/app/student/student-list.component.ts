import { Component, OnInit, Input } from '@angular/core'
import { Student } from '../models/student.model';
import { StudentService } from '../services/student.service';
import { Router } from '@angular/router';

@Component({
    selector: 'student-list',
    template: `
    <h4>{{title | uppercase }}</h4>
    <div *ngIf="students">
        <div [ngClass]="['box']" *ngFor="let student of students">
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
            float: left;
            max-height: 400px,
            max-width: 600px;
            min-height: 400px,
            min-width: 600px;
            overflow-y: true;
            background-color: #df4;
            border: 5px solid red;
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
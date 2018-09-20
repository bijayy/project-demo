import { Component, OnInit, Input } from '@angular/core'
import { Student } from '../models/student.model';
import { StudentService } from '../services/student.service';
import { Router } from '@angular/router';

@Component({
    selector: 'student-list',
    template: `
    <h4>
    Students Records Section
    </h4>
    <div *ngIf="students">
        <div *ngFor="let student of students">
            <div [ngClass]="['link', 'design']" [routerLink]="['/student/update', student.Id]">
                <div>Student Id: {{student.Id}}</div>
                <div>Student Name: {{student.Name}}</div>
                <div>Student Email ID: {{student.Email}}</div>
            </div>
        </div>
    </div>
    <h5 *ngIf="!students">{{message}}</h5>
    `,

    styles: [
        `
        .link {
            cursor:pointer;
        }

        .design {
            padding: 10px;
        }
        `
    ]
})

export class StudentListComponent implements OnInit {

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
}
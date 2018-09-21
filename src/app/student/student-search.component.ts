import { Component, OnInit, Inject } from '@angular/core'
import { Student } from '../models/student.model';
import { StudentService } from '../services/student.service';
import { TOASTER_TOKEN, Toastr } from '../services/toastr.service';

@Component({
    selector: 'student-search',
    template: `

    <div [ngClass]="['box']">
    <div class="title">{{title | uppercase}}</div>
        <div>
            <label for="id">Student ID:</label>
            <input #id type="number" id="id" name="id" placeholder="Enter Id..." />
        </div>
        <button type="button" (click)="getStudentById(id.value)">Search</button>
        <div [ngClass]="['design']" *ngIf="student">
            <div>Student Name: {{student.Id}}</div>
            <div>Student Name: {{student.Name}}</div>
            <div>Student Email ID: {{student.Email}}</div>
        </div>
    <div>
    `,
    styles: [`
        .box {
            background-color: lightgrey;
            border: 5px solid darkgrey;
            border-radius: 5px;
            margin: 0 0 5px 0;
            padding: 20px;
            max-width: 600px;
        }

        .design {
            padding: 0 0 10px 0;
            border: 1px solid black;
            border-radius: 5px;
            margin-bottom: 5px;
            text-align: center;
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

    constructor(private studentService: StudentService, @Inject(TOASTER_TOKEN) private toastr: Toastr) {
    
    }

    getStudentById(id: number) {
        this.student = null

        console.log(id)
        if(id > 0) {
            this.studentService.getStudentById(id).subscribe(student => {
            if(student) {
                this.student = student
                console.log(this.student)
                this.toastr.success(`Student with id (${id}) found successfully`)
            }
            else {
                this.toastr.error(`Student with id: ${id} not found`)
            }
            })
        }
        else {
            this.toastr.warning(`Invalid Student Id. Please enter proper student Id`)
        }
      }
}
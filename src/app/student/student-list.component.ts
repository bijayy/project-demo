import { Component, OnInit, Input, Inject } from '@angular/core'
import { Student } from '../models/student.model';
import { StudentService } from '../services/student.service';
import { Router } from '@angular/router';
import { TOASTER_TOKEN, Toastr } from '../services/toastr.service';

@Component({
    selector: 'student-list',
    template: `
    <div class="parent-box">
        <div [ngClass]="['box']" *ngIf="students">
            <h1 class="title" *ngIf="showLoadingMessage">Loading Please Wait...</h1>
            <div class="title">{{title | uppercase }}</div>
            <div [ngClass]="['design']" *ngFor="let student of students">
                <div>
                    <div>Student Id: {{student.Id}}</div>
                    <div>Student Name: {{student.Name}}</div>
                    <div>Student Email ID: {{student.Email}}</div>
                </div>
                <div class="button">
                    <button class="btn-edit" [routerLink]="['/student/update', student.Id]" type="button">Edit</button>
                    <button class="btn-delete" (click)="deleteStudent(student.Id)" type="button">Delete</button>
                </div>
            </div>
        </div>
        <h5 *ngIf="!students">{{message}}</h5>
    </div>
    `,

    styles: [
        `
        .design {
            padding: 0 0 10px 0;
            border: 1px solid black;
            border-radius: 5px;
            margin-bottom: 5px;
            text-align: center;
        }

        .box {
            background-color: lightgrey;
            border: 5px solid darkgrey;
            border-radius: 5px;
            margin: 0 0 5px 0;
            padding: 5px;
            max-width: 600px;
            font-size:14pt;
            margin-left:auto; margin-right:auto; /*To align this in the center of page having parent 100% width*/
        }

        .btn-edit {
            height: 35px;
            width: 80px;
            background-color:azure;
        }

        .btn-delete {
            height: 35px;
            width: 80px;
            color: white;
            background-color:darkred;
        }

        button {
            padding: 5px;
            margin-right: 5px;
            border-radius: 5px;
            cursor: pointer;
            font-size:14pt;
        }

        div div input, label {
            margin: 0 0 10px 0;
        }

        label {
            height: 30px;
            font-size:14pt;
        }

        input {
            width: 95%;
            height: 30px;
            padding-left: 10px;
            border-radius: 5px;
            font-size:14pt;
        }
        `
    ]
})

export class StudentListComponent implements OnInit {

    title: string = "Showing Records of all students"
    students: Student[]
    message: string = ""
    showLoadingMessage: boolean = false
    
    constructor(private route:Router, 
        private studentService: StudentService, 
        @Inject(TOASTER_TOKEN) private toastr: Toastr) {
    
    }
  
    ngOnInit() {
        this.students = null
        this.showLoadingMessage = true
        this.studentService.getStudents().subscribe(students => {
            if(students.length>0) {
                this.students = students
                console.log(this.students)
                this.toastr.info(`All Students Records Loaded Successfully`)
            }
            else {
                this.toastr.error(`No record found, please try again later.`)
            }

            this.showLoadingMessage = false;
        })
    }

    deleteStudent(id: number) {
        console.log(id)
        this.studentService.deleteStudent(id).subscribe((fail) => {
            if(fail === null) {
                this.students.splice(this.students.findIndex(x => x.Id == id), 1);
                this.toastr.success(`Student Record with id (${id} deleted succesffully)`)
            }
            else {
                this.toastr.error("Unable To Delete Student Record. Please try again...")
            }
        })
    }
}
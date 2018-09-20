import { Component, OnInit, Input } from '@angular/core'
import { Student } from '../models/student.model';
import { StudentService } from '../services/student.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'student-update',
    template: `
    <form [ngClass]="['align']" #updateStudentForm="ngForm" (ngSubmit)="updateStudent(updateStudentForm.value)">
        
        <div [ngClass]="['box']" *ngIf="student">
            <div class="title">{{title | uppercase}}</div>
            <div>
                <span>ID: </span>
                <div>{{student.Id}}</div>
            </div>
            <div>
                <label for="Name">Name:</label>
                <input [(ngModel)]="student.Name" type="text" id="Name" name="Name" placeholder="Enter Name..." required />
            </div>
            <div>
                <label for="Email">Email:</label>
                <input [(ngModel)]="student.Email" type="text" id="Email" name="Email" placeholder="Enter Email..." required />
            </div>
            <div>
                <button type="submit">Update</button>
            </div>
        </div>
    </form>
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

        .align {
            align: center;
        }

        div div input, label, span {
            margin: 0 0 10px 0;
        }

        label, span, div div div {
            height: 30px;
            font-size:13pt;
        }

        button {
            height: 30px;
            font-size:13pt;
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

export class StudentUpdateComponent implements OnInit {
    title: string = "Update Student Section"
    student: Student = null
    message: string = ""
    
    constructor(private route: Router, private activatedRoute: ActivatedRoute, private studentService: StudentService) {
    
    }
  
    ngOnInit() {
        this.student = null
        this.studentService.getStudentById(+this.activatedRoute.snapshot.params['{id}']).subscribe(student => {
            if(student) {
                this.student = student
                console.log(this.student)
            }
            else {
                this.message = "No record found, please try again later."
            }
        })
    }

    updateStudent(formValues) {
        console.log(formValues)
        this.studentService.updateStudent(this.student.Id, formValues as Student).subscribe((fail)=> {
            if(fail === null) {
                this.message = `Student details with id(${this.student.Id}) updated Successfully`;
                this.route.navigate(['/students'])
            }
            else {
                this.message = "Update failed. Please try again..."
            }
        })
    }
}
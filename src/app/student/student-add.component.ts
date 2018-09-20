import { Component } from '@angular/core'
import { Student } from '../models/student.model';
import { StudentService } from '../services/student.service';
import { Router } from '@angular/router';

@Component({
    selector: 'student-add',
    template: `
    <form #addStudentForm="ngForm" (ngSubmit)="addStudent(addStudentForm.value)" >
        <div [ngClass]="['box']">
        <div class="title">{{title | uppercase}}</div>
            <div>
                <label for="Name">Name:</label>
                <input (ngModel)="Name" type="text" id="Name" name="Name" placeholder="Enter Name..." required />
            </div>
            <div>
                <label for="Email">Email:</label>
                <input (ngModel)="Email" type="email" id="Email" name="Email" placeholder="Enter Email..." required />
            </div>
            <div>
                <button type="submit">Save</button>
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

        div div input, label {
            margin: 0 0 10px 0;
        }

        label {
            height: 30px;
            font-size:18pt;
        }

        button {
            height: 30px;
            font-size:18pt;
            border-radius: 5px;
            cursor: pointer;
        }

        input {
            width: 95%;
            height: 30px;
            padding-left: 10px;
            border-radius: 5px;
            font-size:18pt;
        }
    `]
})

export class StudentAddComponent {
    title: string = "Add Student Section"
    message: string = ""
    
    constructor(private router: Router, private studentService: StudentService) {
    
    }

    addStudent(formValues) {
        this.studentService.addStudent(formValues as Student).subscribe(fail => {
            if(fail === null) {
                this.router.navigate(['/students'])
            }
        })
      }
}
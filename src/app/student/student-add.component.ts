import { Component, Inject } from '@angular/core'
import { Student } from '../models/student.model';
import { StudentService } from '../services/student.service';
import { Router } from '@angular/router';
import { Toastr, TOASTER_TOKEN } from '../services/toastr.service';

@Component({
    selector: 'student-add',
    template: `
    <form [ngClass]="['parent-box']" #addStudentForm="ngForm" (ngSubmit)="addStudent(addStudentForm.value)" >
        <div [ngClass]="['box']">
        <div class="title">{{title | uppercase}}</div>
            <div>
                <label for="Name">Name:</label>
                <em *ngIf="addStudentForm.controls.Name?.invalid && (addStudentForm.controls.Name?.touched || mouseoversave)">Required</em>
                <input (ngModel)="Name" type="text" id="Name" name="Name" placeholder="Enter Name..." required />
            </div>
            <div>
                <label for="Email">Email:</label>
                <em *ngIf="addStudentForm.controls.Email?.invalid && (addStudentForm.controls.Email?.touched || mouseoversave)">Required</em>
                <input (ngModel)="Email" type="email" id="Email" name="Email" placeholder="Enter Email..." required />
            </div>
            <div (mouseenter)="mouseoversave=true" (mouseleave)="mouseoversave=false" >
                <button [disabled]="addStudentForm.invalid" type="submit">Save</button>
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
            max-width: 600px;
            margin-left:auto; margin-right:auto; /*To align this in the center of page having parent 100% width*/
        }

        em {
            color: red;
            float: right;
            font-size:14pt;
            margin-right: 10px;
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
    
    constructor(private router: Router, 
        private studentService: StudentService,
        @Inject(TOASTER_TOKEN) private toastr: Toastr) {
    
    }

    addStudent(formValues) {
        this.studentService.addStudent(formValues as Student).subscribe(fail => {
            if(fail === null) {
                this.toastr.success("New Student Record Added Successfully")
                this.router.navigate(['/students'])
            }
            else {
                this.toastr.error("Unable To Add New Student Record. Please try again...")
            }
        })
      }
}
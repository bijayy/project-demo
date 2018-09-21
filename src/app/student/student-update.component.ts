import { Component, OnInit, Input, Inject } from '@angular/core'
import { Student } from '../models/student.model';
import { StudentService } from '../services/student.service';
import { TOASTER_TOKEN, Toastr } from '../services/toastr.service'
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'student-update',
    template: `
    <form [ngClass]="['parent-box']" #updateStudentForm="ngForm" (ngSubmit)="updateStudent(updateStudentForm.value)">
        
        <div [ngClass]="['box']" *ngIf="student">
            <div class="title">{{title | uppercase}}</div>
            <div>
                <span>ID: </span>
                <div>{{student.Id}}</div>
            </div>
            <div>
                <label for="Name">Name:</label>
                <em [hidden]="student.Name">Required</em>
                <input [(ngModel)]="student.Name"  type="text" id="Name" name="Name" placeholder="Enter Name..." required />
            </div>
            <div>
                <label for="Email">Email:</label>
                <em [hidden]="student.Email">Required</em>
                <input [(ngModel)]="student.Email" type="text" id="Email" name="Email" placeholder="Enter Email..." required />
            </div>
            <div>
                <button [disabled]="updateStudentForm.invalid" type="submit">Update</button>
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
    
    constructor(private route: Router, 
        private activatedRoute: ActivatedRoute, 
        private studentService: StudentService,
        @Inject(TOASTER_TOKEN) private toastr: Toastr) {
    
    }
  
    ngOnInit() {
        this.student = null
        this.studentService.getStudentById(+this.activatedRoute.snapshot.params['{id}']).subscribe(student => {
            if(student) {
                this.student = student
                this.toastr.info(`Your are going to edit student with id (${student.Id})`)
            }
            else {
                this.toastr.error("No record found, please try again later...")
            }
        })
    }

    updateStudent(formValues) {
        console.log(formValues)
        this.studentService.updateStudent(this.student.Id, formValues as Student).subscribe((fail)=> {
            if(fail === null) {
                this.toastr.success(`Student details with id(${this.student.Id}) updated Successfully`)
                this.route.navigate(['/students'])
            }
            else {
                this.toastr.error("Update failed. Please try again...")
            }
        })
    }
}
import { Component, OnInit, Input } from '@angular/core'
import { Student } from '../models/student.model';
import { StudentService } from '../services/student.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'student-update',
    template: `
    <form #updateStudentForm="ngForm" (ngSubmit)="updateStudent(updateStudentForm.value)">
    <div *ngIf="student">
        <h4>Update Student Section</h4>
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
    `
})

export class StudentUpdateComponent implements OnInit {

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
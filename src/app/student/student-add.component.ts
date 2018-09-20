import { Component } from '@angular/core'
import { Student } from '../models/student.model';
import { StudentService } from '../services/student.service';
import { Router } from '@angular/router';

@Component({
    selector: 'student-add',
    template: `
    <form #addStudentForm="ngForm" (ngSubmit)="addStudent(addStudentForm.value)" >
        <h4>Add Student Section</h4>
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
    </form>
    `
})

export class StudentAddComponent {
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
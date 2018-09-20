import { Component, OnInit, Input } from '@angular/core'
import { Student } from '../models/student.model';
import { StudentService } from '../services/student.service';

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

export class StudentAddComponent implements OnInit {

    students: Student[]
    message: string = ""
    
    constructor(private studentService: StudentService) {
    
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

    addStudent(formValues) {
        this.studentService.addStudent(formValues as Student).subscribe(student => {
            console.log(student)
        })
      }
}
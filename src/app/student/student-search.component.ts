import { Component, OnInit } from '@angular/core'
import { Student } from '../models/student.model';
import { StudentService } from '../services/student.service';

@Component({
    selector: 'student-search',
    template: `
    <h4>Student Search Section</h4>
    <div *ngIf="student">
        <div>Student Name: {{student.Id}}</div>
        <div>Student Name: {{student.Name}}</div>
        <div>Student Email ID: {{student.Email}}</div>
    </div>
    <h5 *ngIf="!student">{{message}}</h5>
    <div>
        <label for="id">Student ID:</label>
        <input #id type="number" id="id" name="id" placeholder="Enter Id..." />
    </div>
    <button type="button" [disabled] = "" (click)="getStudentById(id.value)">Search</button>
    `
})

export class StudentSearchComponent implements OnInit {
    student: Student
    message: string

    constructor(private studentService: StudentService) {
    
    }
    
    ngOnInit() {
        
    }

    getStudentById(id: number) {
        this.student = null

        if(id > 0) {
            this.studentService.getStudentById(id).subscribe(student => {
            if(student) {
                this.student = student
                console.log(this.student)
            }
            else {
                this.message = `student with id: ${id} not found`
            }
            })
        }
        else {
            this.message = `Student Id is Required`
        }
      }
}
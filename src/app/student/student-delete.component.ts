import { Component, OnInit, Input } from '@angular/core'
import { Student } from '../models/student.model';
import { StudentService } from '../services/student.service';

@Component({
    selector: 'student-delete',
    template: `
    <div>
        <label for="id">Student ID:</label>
        <input #id type="number" id="id" name="id" placeholder="Enter Id..." required />
    </div>
    <button type="button" (click)="deleteStudent(id.value)">Delete Student By ID</button>
    `
})

export class StudentDeleteComponent implements OnInit {

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

    deleteStudent(id: number) {
        console.log(id)
        this.studentService.deleteStudent(id).subscribe((message) => {
          if(message) {
          console.log(`Student with id = ${id} deleted successfully`)
          }
        })
    }
}
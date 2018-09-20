import { Component } from '@angular/core';
import { StudentService } from './services/student.service';
import { Student } from './models/student.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Welcome To Student Portal';
  students: Student[] = []
  student: Student = null
  message: string = ""

  constructor(private studentService: StudentService) {
    
  }

  getStudentById(id: number) {
    this.studentService.getStudentById(id).subscribe(student => {
      if(student) {
        this.student = student
        console.log(this.student)
      }
      else {
        this.student = null
        this.message = `student with id: ${id} not found`
      }
    })
  }

  addStudent(formValues) {
    this.studentService.addStudent(formValues as Student).subscribe(student => {
        console.log(student)
    })
  }

  updateStudent(formValues) {
    console.log(formValues)
    this.studentService.updateStudent(formValues as Student).subscribe((message)=> {
      if(message) {
        console.log(`Updated Successfully: ${message}`)
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

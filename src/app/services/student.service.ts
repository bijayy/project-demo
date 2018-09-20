import { Injectable } from '@angular/core'
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators'
import { Student } from '../models/student.model';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const studentApiUrl = "http://localhost:51354/api/"

@Injectable()
export class StudentService {
 
    constructor(private httpClient: HttpClient) {}

    getStudents():  Observable<Student[]> {
        return this.httpClient.get<Student[]>(`${studentApiUrl}students`)
            .pipe(catchError(this.handlerError<Student[]>("getStudents()", [])))
    }

    getStudentById(id: number): Observable<Student> {
        return this.httpClient.get<Student>(`${studentApiUrl}students/${id}`)
            .pipe(catchError(this.handlerError<Student>("getStudentById")))
    }

    addStudent(student): Observable<any> {
        return this.httpClient.post<any>(`${studentApiUrl}student`, student, httpOptions)
            .pipe(catchError(this.handlerError<any>("addStudent()")))
    }

    updateStudent(id: number, student): Observable<any> {
        return this.httpClient.put<any>(`${studentApiUrl}student/${id}`, student, httpOptions)
            .pipe(catchError(this.handlerError<any>("updateStudent()")))
    }

    deleteStudent(id: number): Observable<any> {
        return this.httpClient.delete(`${studentApiUrl}students/${id}`, httpOptions)
            .pipe(catchError(this.handlerError<any>("deleteStudent()")))
    }

    private handlerError<T>(operation, result?: T) {
        return (error: any): Observable<T> => {
            console.log(error)
            return of(result as T)
        }
    }
}
import { Component, OnInit, Input } from '@angular/core'
import { Student } from '../models/student.model';
import { StudentService } from '../services/student.service';

@Component({
    template: `
    <h1>Error occured try again later...</h1>
    `
})

export class Error404Component implements OnInit {
    ngOnInit() {

    }
}

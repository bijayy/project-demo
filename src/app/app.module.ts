import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms'
import { RouterModule, Routes } from '@angular/router'

import { AppComponent } from './app.component';
import { StudentService } from './services/student.service';
import { StudentListComponent } from './student/student-list.component';
import { StudentSearchComponent } from './student/student-search.component';
import { StudentAddComponent } from './student/student-add.component';
import { StudentUpdateComponent } from './student/student-update.component';
import { Error404Component } from './error/404.component';

const appRoutes: Routes = [
  { path:"student/search", component: StudentSearchComponent },
  { path:"student/add", component: StudentAddComponent },
  { path:"student/update/:{id}", component: StudentUpdateComponent },
  { path:"students", component: StudentListComponent },
  { path:'404', component:Error404Component },
  { path: '', redirectTo:'students', pathMatch:'full' },
  { path: '**', redirectTo: '404' }
]

@NgModule({
  declarations: [
    AppComponent,
    StudentListComponent,
    StudentSearchComponent,
    StudentAddComponent,
    StudentUpdateComponent,
    Error404Component
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [StudentService],
  bootstrap: [AppComponent]
})
export class AppModule { }

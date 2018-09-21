import { TestBed, async, inject } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import {  RouterTestingModule } from '@angular/router/testing'
import { StudentAddComponent } from './student/student-add.component';
import { StudentListComponent } from './student/student-list.component';
import { StudentSearchComponent } from './student/student-search.component';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms'
import {Location} from '@angular/common';
import { StudentService } from './services/student.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TOASTER_TOKEN } from './services/toastr.service';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        RouterTestingModule.withRoutes([
         { path: 'student/add', component: StudentAddComponent },
         {path:'student/search', component:StudentSearchComponent},
         {path:'students', component:StudentListComponent},
         {path:'', redirectTo: '/students', pathMatch:'full'}
        ])
      ],
      declarations: [
        AppComponent,
        StudentSearchComponent,
        StudentAddComponent,
        StudentListComponent
      ],
      providers: [StudentService, HttpClient,
        { provide: TOASTER_TOKEN}]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'Welcome To Student Portal'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Welcome To Student Portal');
  }));
  it('should render title in a div tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('div').textContent).toContain('WELCOME TO STUDENT PORTAL');
  }));

  it('should go to url /student/search',
    async(inject([Router, Location], (router: Router, location: Location) => {

    let fixture = TestBed.createComponent(StudentSearchComponent);
    fixture.detectChanges();

    fixture.debugElement.query(By.css('button')).nativeElement.click();
    fixture.whenStable().then(() => {
      expect(location.path()).toEqual(``);
      console.log('after expect');
    });
  })));
});

import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../../shared/services/shared.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent } from '../../../shared/breadcrumb/breadcrumb.component';



@Component({
  selector: 'app-student-edit',
  imports: [CommonModule, BreadcrumbComponent, ReactiveFormsModule],
  templateUrl: './student-edit.component.html',
  styleUrl: './student-edit.component.scss'
})
export class StudentEditComponent implements OnInit {
  pageTitle = 'Edit Student';
  studentForm!: FormGroup;

  breadcrumbs = [
    { label: 'Home', url: '/' },
    { label: 'All Students', url: '../all' },
    { label: 'Edit Student' }
  ];

  constructor(private sharedService: SharedService, private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.studentForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      enrollmentDate: ['', Validators.required],
      mobile: ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
      gender: ['', Validators.required],
      dob: ['', Validators.required],
      course: ['', Validators.required],
      year:[''],
      section:[''],
      education:[''],
      rollNumber: ['', Validators.required],
      profile: [null, Validators.required]
    });

    this.sharedService.currentId$.subscribe(id => {
      if (id) {
        this.loadStudentData(id);
        this.pageTitle = 'Edit Student';
      } else {
        this.pageTitle = 'Add Student';
      }
    });
  }

  loadStudentData(id: string) {
    this.studentForm.patchValue({
      firstName: 'John',
      lastName: 'Doe',
      email: 'student@example.com',
      enrollmentDate: this.formatDate('2023-08-10'),
      mobile: '9876543210',
      gender: 'Male',
      dob: this.formatDate('2000-01-15'),
      course: 'Computer Science',
      year:'1st Year',
      section:'A',
      education:'BA',
      rollNumber: 'CS101'
    });
  }

  private formatDate(date: string | Date): string {
    const d = new Date(date);
    return `${d.getFullYear()}-${('0' + (d.getMonth() + 1)).slice(-2)}-${('0' + d.getDate()).slice(-2)}`;
  }

  onSubmit() {
    if (this.studentForm.valid) {
      console.log(this.studentForm.value);
      this.router.navigate(['/students/all']);
    } else {
      this.studentForm.markAllAsTouched();
    }
  }

  onCancel() {
    this.router.navigate(['/students/all']);
  }
}
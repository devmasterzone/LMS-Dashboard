import { Component, OnInit } from '@angular/core';
import { BreadcrumbComponent } from '../../../shared/breadcrumb/breadcrumb.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-course-edit',
  imports: [CommonModule, ReactiveFormsModule,BreadcrumbComponent],
  templateUrl: './course-edit.component.html',
  styleUrl: './course-edit.component.scss'
})
export class CourseEditComponent implements OnInit {
   pageTitle = 'Edit Course';
  breadcrumbs = [
    { label: 'Home', url: '/' },
    { label: 'All Courses', url: '/courses/all' },
    { label: 'Edit Course' }
  ];
  
  courseForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.courseForm = this.fb.group({
      photo: ['', [Validators.required, Validators.pattern(/(https?:\/\/.*\.(?:png|jpg|jpeg))/i)]],
      code: ['', [Validators.required, Validators.maxLength(10)]],
      name: ['', Validators.required],
      details: [''],
      startFrom: ['', Validators.required],
      duration: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      professor: ['', Validators.required],
      maxStudents: ['', [Validators.required, Validators.min(1)]],
      contact: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]]
    });

    // Dummy data for edit mode
    this.courseForm.patchValue({
      photo: 'https://example.com/course-image.jpg',
      code: 'ANG101',
      name: 'Angular Fundamentals',
      details: 'Learn the basics of Angular framework with hands-on examples.',
      startFrom: '2025-08-20',
      duration: '6 Weeks',
      price: 4999,
      professor: 'John Doe',
      maxStudents: 50,
      contact: '9876543210'
    });
  }

  onSubmit(): void {
    if (this.courseForm.valid) {
      console.log('Form Data:', this.courseForm.value);
      // API call for update goes here
    } else {
      this.courseForm.markAllAsTouched();
    }
  }

  onReset(): void {
    this.courseForm.reset();
  }
}
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BreadcrumbComponent } from '../../../shared/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-course-add',
  imports: [CommonModule, ReactiveFormsModule,BreadcrumbComponent],
  templateUrl: './course-add.component.html',
  styleUrl: './course-add.component.scss'
})
export class CourseAddComponent implements OnInit {
  pageTitle = 'Add Course';
  breadcrumbs = [
    { label: 'Home', url: '/' },
    { label: 'All Courses', url: '/courses/all' },
    { label: 'Add Course' }
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
  }

  onSubmit(): void {
    if (this.courseForm.valid) {
      console.log('Form Data:', this.courseForm.value);
      // Call API or service here
    } else {
      this.courseForm.markAllAsTouched();
    }
  }

  onReset(): void {
    this.courseForm.reset();
  }
}
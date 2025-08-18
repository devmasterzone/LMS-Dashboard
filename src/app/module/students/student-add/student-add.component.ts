import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BreadcrumbComponent } from '../../../shared/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-student-add',
  imports: [CommonModule,ReactiveFormsModule,BreadcrumbComponent],
  templateUrl: './student-add.component.html',
  styleUrl: './student-add.component.scss'
})
export class StudentAddComponent implements OnInit {
  pageTitle = 'Add Student';
  studentForm!: FormGroup;
  showPassword = false;
  showConfirmPassword = false;

  breadcrumbs = [
    { label: 'Home', url: '/' },
    { label: 'All Students', url: '../all' },
    { label: 'Add Student' }
  ];

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.studentForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      rollNumber: ['', [Validators.required, Validators.pattern(/^[A-Z0-9-]+$/)]],
      email: ['', [Validators.required, Validators.email]],
      joiningDate: ['', Validators.required],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).+$/)
      ]],
      confirmPassword: ['', Validators.required],
      mobile: ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
      gender: ['', Validators.required],
      course: ['', Validators.required],
      year: ['', Validators.required],
      section: ['', Validators.required],
      dob: ['', Validators.required],
      education: ['', Validators.required],
      profile: [null, Validators.required]
    }, {
      validators: this.matchPassword
    });
  }

  matchPassword(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirm = group.get('confirmPassword')?.value;
    return password === confirm ? null : { mismatch: true };
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

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }
}

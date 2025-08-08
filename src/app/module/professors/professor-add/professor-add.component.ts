import { Component } from '@angular/core';
import { BreadcrumbComponent } from '../../../shared/breadcrumb/breadcrumb.component';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-professor-add',
  imports: [CommonModule,ReactiveFormsModule,BreadcrumbComponent],
  templateUrl: './professor-add.component.html',
  styleUrl: './professor-add.component.scss'
})
export class ProfessorAddComponent {
  pageTitle = 'Add Professor';
  professorForm!: FormGroup;
  showPassword = false;
  showConfirmPassword = false;

  breadcrumbs = [
    { label: 'Home', url: '/' },
    { label: 'All Professors', url: '../all' },
    { label: 'Add Professor' }
  ];

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.professorForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
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
      designation: ['', Validators.required],
      department: ['', Validators.required],
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
    if (this.professorForm.valid) {
      console.log(this.professorForm.value);
      this.router.navigate(['/professors/all']);
    } else {
      this.professorForm.markAllAsTouched();
    }
  }

  onCancel() {
    this.router.navigate(['/professors/all']);
  }

  disablePaste(event: ClipboardEvent) {
    event.preventDefault();
  }

  togglePasswordVisibility(field: 'password' | 'confirmPassword') {
    if (field === 'password') {
      this.showPassword = !this.showPassword;
    } else {
      this.showConfirmPassword = !this.showConfirmPassword;
    }
  }
  //  showPassword = false;
  // showConfirmPassword = false;

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }
}

interface ValidationErrors {
  [key: string]: any;
}

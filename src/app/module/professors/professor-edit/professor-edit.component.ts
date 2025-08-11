import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../../shared/services/shared.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent } from '../../../shared/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-professor-edit',
  standalone: true,
  imports: [CommonModule, BreadcrumbComponent, ReactiveFormsModule],
  templateUrl: './professor-edit.component.html',
  styleUrl: './professor-edit.component.scss',
})
export class ProfessorEditComponent implements OnInit {
  constructor(
    private sharedService: SharedService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  pageTitle = 'Edit Professor';
  professorForm!: FormGroup;
  showPassword = false;
  showConfirmPassword = false;

  breadcrumbs = [
    { label: 'Home', url: '/' },
    { label: 'All Professors', url: '../all' },
    { label: 'Edit Professor' },
  ];

  ngOnInit(): void {
    // 1. Create form first
    this.professorForm = this.fb.group(
      {
        firstName: ['', [Validators.required, Validators.minLength(2)]],
        lastName: ['', [Validators.required, Validators.minLength(2)]],
        email: ['', [Validators.required, Validators.email]],
        joiningDate: ['', Validators.required],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).+$/),
          ],
        ],
        confirmPassword: ['', Validators.required],
        mobile: ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
        gender: ['', Validators.required],
        designation: ['', Validators.required],
        department: ['', Validators.required],
        dob: ['', Validators.required],
        education: ['', Validators.required],
        profile: [null, Validators.required],
      },
      {
        validators: this.matchPassword,
      }
    );

    this.sharedService.currentId$.subscribe((id) => {
      if (id) {
        console.log('ID ', id);
        this.loadProfessorData(id);
        this.pageTitle = 'Edit Professor';
      } else {
        console.log('No Id');
        this.pageTitle = 'Add Professor';
      }
    });
  }

  loadProfessorData(id: string) {
    if (!this.professorForm) return; // prevents error if form not yet initialized

    this.professorForm.patchValue({
      firstName: 'Garrett',
      lastName: 'Winters',
      email: 'info@example.com',
      joiningDate: this.formatDate('2020-07-25'),
      mobile: '9876543210',
      gender: 'Female',
      designation: 'Accountant',
      department: 'HR',
      dob: this.formatDate('2018-04-25'),
      education: 'B.A, B.C.A',
    });
  }

  private formatDate(date: string | Date): string {
    const d = new Date(date);
    const month = ('0' + (d.getMonth() + 1)).slice(-2);
    const day = ('0' + d.getDate()).slice(-2);
    return `${d.getFullYear()}-${month}-${day}`;
  }

  matchPassword(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirm = group.get('confirmPassword')?.value;
    return password === confirm ? null : { mismatch: true };
  }

  onSubmit() {
    if (this.professorForm.valid) {
      const formData = this.professorForm.value;
      if (this.pageTitle === 'Edit Professor') {
        this.router.navigate(['/professors/all']);
      } else {
        this.router.navigate(['/professors/all']);
      }
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
  
  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }
}

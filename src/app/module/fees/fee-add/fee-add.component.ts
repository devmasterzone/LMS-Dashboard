import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-fee-add',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    MatSnackBarModule
  ],
  templateUrl: './fee-add.component.html',
  styleUrl: './fee-add.component.scss'
})
export class FeeAddComponent {
  feeForm: FormGroup;
  students: string[] = ['Alice Johnson', 'Bob Smith', 'Charlie Brown', 'David Lee'];
  filteredStudents: string[] = [];

  departments: string[] = ['Computer Science', 'Mechanical', 'Civil', 'Electrical', 'Electronics'];
  feeTypes: string[] = ['Tuition Fee', 'Exam Fee', 'Library Fee', 'Hostel Fee'];

  constructor(private fb: FormBuilder, private snackBar: MatSnackBar) {
    this.feeForm = this.fb.group({
      studentName: ['', Validators.required],
      department: ['', Validators.required],
      feeType: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(100)]],
      dueDate: ['', Validators.required],
      status: ['Pending', Validators.required]
    });
  }

  ngOnInit() {
    // Autocomplete filtering
    this.feeForm.get('studentName')?.valueChanges.subscribe(val => {
      this.filteredStudents = this.students.filter(s =>
        s.toLowerCase().includes(val.toLowerCase())
      );
    });
  }

  isOverdue(): boolean {
    const dueDate = this.feeForm.get('dueDate')?.value;
    return dueDate && new Date(dueDate) < new Date() && this.feeForm.get('status')?.value !== 'Paid';
  }

  onSubmit() {
    if (this.feeForm.valid) {
      console.log('New Fee Record:', this.feeForm.value);
      this.snackBar.open('✅ Fee Record Added Successfully!', 'Close', { duration: 3000 });
      this.feeForm.reset({ status: 'Pending' });
    }
  }

  onReset() {
    this.feeForm.reset({ status: 'Pending' });
  }
}

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
import { CustomSelectComponent } from '../../../shared/components/custom-select/custom-select.component';

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
    MatSnackBarModule,
    CustomSelectComponent
  ],
  templateUrl: './fee-add.component.html',
  styleUrl: './fee-add.component.scss'
})
export class FeeAddComponent {

  chosenCategory: string | null = null;

  feeForm: FormGroup;
  students: string[] = ['Alice Johnson', 'Bob Smith', 'Charlie Brown', 'David Lee'];
  filteredStudents: string[] = [];

  departments = [
  { value: 'COMPUTER_SCIENCE', label: 'Computer Science' },
  { value: 'MECHANICAL', label: 'Mechanical' },
  { value: 'CIVIL', label: 'Civil' },
  { value: 'ELECTRICAL', label: 'Electrical' },
  { value: 'ELECTRONICS', label: 'Electronics' }
];

feeTypes = [
  { value: 'TUITION_FEE', label: 'Tuition Fee' },
  { value: 'EXAM_FEE', label: 'Exam Fee' },
  { value: 'LIBRARY_FEE', label: 'Library Fee' },
  { value: 'HOSTEL_FEE', label: 'Hostel Fee' }
];


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

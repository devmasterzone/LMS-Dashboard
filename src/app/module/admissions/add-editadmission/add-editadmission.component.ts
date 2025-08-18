import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-editadmission',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './add-editadmission.component.html',
  styleUrl: './add-editadmission.component.scss'
})
export class AddEditadmissionComponent {
 admissionForm!: FormGroup;
  isEdit: boolean = false;
  admissionId!: number;
  courses = ['B.Sc IT', 'MBA', 'B.Com', 'B.Tech', 'M.Sc Physics'];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.admissionForm = this.fb.group({
      name: ['', Validators.required],
      course: ['', Validators.required],
      year: ['', Validators.required],
      status: ['Pending']
    });

    this.admissionId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.admissionId) {
      this.isEdit = true;
      // ✅ load admission by ID (dummy data here)
      const admission = { id: 2, name: 'Anita Sharma', course: 'MBA', year: 2, status: 'Approved' };
      this.admissionForm.patchValue(admission);
    }
  }

  saveAdmission() {
    if (this.admissionForm.valid) {
      console.log(this.isEdit ? 'Updated Admission:' : 'New Admission:', this.admissionForm.value);
      this.router.navigate(['/admissions']);
    }
  }
}

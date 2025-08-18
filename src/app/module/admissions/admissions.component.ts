import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BreadcrumbComponent } from '../../shared/breadcrumb/breadcrumb.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admissions',
  imports: [CommonModule, ReactiveFormsModule, FormsModule, BreadcrumbComponent],
  templateUrl: './admissions.component.html',
  styleUrl: './admissions.component.scss'
})
export class AdmissionsComponent implements OnInit{
 breadcrumbs = [
    { label: 'Home', url: '/' },
    { label: 'Admissions', url: '/admissions' }
  ];

  admissions: any[] = [];
  filteredAdmissions: any[] = [];
  courses: string[] = ['B.Sc', 'B.A', 'B.Com', 'M.Sc', 'M.A', 'MBA'];

  admissionForm!: FormGroup;
  editingAdmission: any = null;

  searchTerm = '';
  filterCourse = '';
  currentPage = 1;
  pageSize = 5;
  sortField = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  constructor(private fb: FormBuilder,private router: Router) {}

  ngOnInit(): void {
    // Sample data
    this.admissions = [
      { id: 1, name: 'Amit Sharma', course: 'B.Sc', year: 1, status: 'Pending', appliedDate: new Date('2025-05-10') },
      { id: 2, name: 'Priya Singh', course: 'MBA', year: 1, status: 'Approved', appliedDate: new Date('2025-05-05') },
      { id: 3, name: 'Ravi Kumar', course: 'M.Sc', year: 2, status: 'Rejected', appliedDate: new Date('2025-04-28') },
      { id: 4, name: 'Neha Patel', course: 'B.A', year: 3, status: 'Pending', appliedDate: new Date('2025-03-22') },
      { id: 5, name: 'Raj Mehra', course: 'M.A', year: 2, status: 'Approved', appliedDate: new Date('2025-02-15') },
      { id: 6, name: 'Simran Kaur', course: 'B.Com', year: 1, status: 'Pending', appliedDate: new Date('2025-01-18') }
    ];
    this.filterAdmissions();

    this.admissionForm = this.fb.group({
      name: ['', Validators.required],
      course: ['', Validators.required],
      year: ['', [Validators.required, Validators.min(1)]]
    });
  }

  get totalPages(): number {
    return Math.ceil(this.filteredAdmissions.length / this.pageSize);
  }

  get paginatedAdmissions(): any[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.filteredAdmissions.slice(startIndex, startIndex + this.pageSize);
  }

  filterAdmissions() {
    this.filteredAdmissions = this.admissions.filter(a =>
      (this.searchTerm ? a.name.toLowerCase().includes(this.searchTerm.toLowerCase()) : true) &&
      (this.filterCourse ? a.course === this.filterCourse : true)
    );
    this.applySorting();
  }

  sortBy(field: string) {
    if (this.sortField === field) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortDirection = 'asc';
    }
    this.applySorting();
  }

  applySorting() {
    if (!this.sortField) return;
    this.filteredAdmissions.sort((a, b) => {
      const valA = a[this.sortField];
      const valB = b[this.sortField];
      if (valA < valB) return this.sortDirection === 'asc' ? -1 : 1;
      if (valA > valB) return this.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }

  newAdmission() {
    this.router.navigate(['/admissions/add']);
  }

  editAdmission(admission: any) {
    this.router.navigate(['/admissions/edit']);
  }

  openAddAdmission() {
    this.editingAdmission = null;
    this.admissionForm.reset();
    (window as any).$('#admissionModal').modal('show');
  }

  saveAdmission() {
    if (this.admissionForm.invalid) return;
    if (this.editingAdmission) {
      Object.assign(this.editingAdmission, this.admissionForm.value);
    } else {
      const newAdmission = {
        ...this.admissionForm.value,
        id: this.admissions.length + 1,
        status: 'Pending',
        appliedDate: new Date()
      };
      this.admissions.push(newAdmission);
    }
    this.filterAdmissions();
    (window as any).$('#admissionModal').modal('hide');
  }

  updateStatus(admission: any, status: string) {
    admission.status = status;
    this.filterAdmissions();
  }

  viewAdmission(admission: any) {
    alert(`📄 Admission Details:\n\nName: ${admission.name}\nCourse: ${admission.course}\nYear: ${admission.year}\nStatus: ${admission.status}`);
  }

  deleteAdmission(id: number) {
    if (confirm('Are you sure you want to delete this admission?')) {
      this.admissions = this.admissions.filter(a => a.id !== id);
      this.filterAdmissions();
    }
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }
}
interface Admission {
  id: number;
  name: string;
  course: string;
  admissionDate: string;
  status: string;
}
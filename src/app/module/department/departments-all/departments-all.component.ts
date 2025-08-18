import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BreadcrumbComponent } from '../../../shared/breadcrumb/breadcrumb.component';
import { TableHeaderComponent } from '../../../shared/components/table-header/table-header.component';
import { TableFooterComponent } from '../../../shared/components/table-footer/table-footer.component';

@Component({
  selector: 'app-departments-all',
  imports: [CommonModule,BreadcrumbComponent,TableHeaderComponent,TableFooterComponent],
  templateUrl: './departments-all.component.html',
  styleUrl: './departments-all.component.scss'
})
export class DepartmentsAllComponent implements OnInit{
  pageTitle = 'Departments';
  addBookUrl = '/library/add';
  breadcrumbs = [
    { label: 'Home', url: '/' },
    { label: 'Departments' }
  ];
  searchTerm = '';
    filteredDepartments: any[] = [];
    paginatedDepartments: any[] = [];
  
    currentPage = 1;
    pageSize = 5;
    totalPages = 1;
    pageSizeOptions = [5, 10, 20, 50, 100];
departments = [
    {
      id: 1,
      name: 'Computer Science & Engineering',
      hod: 'Dr. A. Sharma',
      facultyCount: 25,
      studentCount: 320
    },
    {
      id: 2,
      name: 'Electronics & Communication',
      hod: 'Dr. B. Mehta',
      facultyCount: 20,
      studentCount: 280
    },
    {
      id: 3,
      name: 'Mechanical Engineering',
      hod: 'Dr. C. Reddy',
      facultyCount: 22,
      studentCount: 300
    },
    {
      id: 4,
      name: 'Civil Engineering',
      hod: 'Dr. D. Patel',
      facultyCount: 18,
      studentCount: 250
    },
    {
      id: 5,
      name: 'Electrical Engineering',
      hod: 'Dr. E. Kumar',
      facultyCount: 21,
      studentCount: 270
    },
    {
      id: 6,
      name: 'Information Technology',
      hod: 'Dr. F. Iyer',
      facultyCount: 19,
      studentCount: 260
    }
  ];
  ngOnInit() {
  this.filteredDepartments = [...this.departments];
  this.updatePagination();
}

   onPageSizeChange() {
    this.updatePagination();
  }

  onSearchChange() {
    const term = this.searchTerm.toLowerCase();
    this.filteredDepartments = this.departments.filter((book) =>
      Object.values(book).some((val) =>
        String(val).toLowerCase().includes(term)
      )
    );
    this.currentPage = 1;
    this.updatePagination();
  }
  updatePagination() {
    this.totalPages = Math.ceil(this.filteredDepartments.length / this.pageSize);
    if (this.currentPage > this.totalPages) {
      this.currentPage = this.totalPages || 1;
    }
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedDepartments = this.filteredDepartments.slice(startIndex, endIndex);
  }
  changePage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.updatePagination();
  }
}

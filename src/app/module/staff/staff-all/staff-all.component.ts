import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BreadcrumbComponent } from '../../../shared/breadcrumb/breadcrumb.component';
import { TableHeaderComponent } from '../../../shared/components/table-header/table-header.component';
import { TableFooterComponent } from '../../../shared/components/table-footer/table-footer.component';

@Component({
  selector: 'app-staff-all',
  imports: [CommonModule,BreadcrumbComponent,TableHeaderComponent,TableFooterComponent],
  templateUrl: './staff-all.component.html',
  styleUrl: './staff-all.component.scss'
})
export class StaffAllComponent implements OnInit{
  pageTitle = 'Staff';
  addBookUrl = '/library/add';
  breadcrumbs = [
    { label: 'Home', url: '/' },
    { label: 'Staff' }
  ];
  searchTerm = '';
    filteredStaff: any[] = [];
    paginatedStaff: any[] = [];
  
    currentPage = 1;
    pageSize = 5;
    totalPages = 1;
    pageSizeOptions = [5, 10, 20, 50, 100];
staffList = [
    {
      staffId: 'STF101',
      name: 'Dr. Meera Sharma',
      department: 'Computer Science',
      designation: 'Professor',
      qualification: 'Ph.D. in Computer Science',
      email: 'meera.sharma@college.edu',
      phone: '9876543210',
      joiningDate: '2012-07-15'
    },
    {
      staffId: 'STF102',
      name: 'Mr. Rajesh Kumar',
      department: 'Mechanical Engineering',
      designation: 'Associate Professor',
      qualification: 'M.Tech in Mechanical',
      email: 'rajesh.kumar@college.edu',
      phone: '9876501234',
      joiningDate: '2015-01-20'
    },
    {
      staffId: 'STF103',
      name: 'Ms. Anjali Verma',
      department: 'Mathematics',
      designation: 'Assistant Professor',
      qualification: 'M.Sc. in Mathematics',
      email: 'anjali.verma@college.edu',
      phone: '9123456780',
      joiningDate: '2018-09-01'
    },
    {
      staffId: 'STF104',
      name: 'Mr. Suresh Patil',
      department: 'Library',
      designation: 'Librarian',
      qualification: 'M.Lib',
      email: 'suresh.patil@college.edu',
      phone: '9988776655',
      joiningDate: '2010-03-10'
    }
  ];
   ngOnInit() {
  this.filteredStaff = [...this.staffList];
  this.updatePagination();
}

   onPageSizeChange() {
    this.updatePagination();
  }

  onSearchChange() {
    const term = this.searchTerm.toLowerCase();
    this.filteredStaff = this.staffList.filter((book) =>
      Object.values(book).some((val) =>
        String(val).toLowerCase().includes(term)
      )
    );
    this.currentPage = 1;
    this.updatePagination();
  }
  updatePagination() {
    this.totalPages = Math.ceil(this.filteredStaff.length / this.pageSize);
    if (this.currentPage > this.totalPages) {
      this.currentPage = this.totalPages || 1;
    }
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedStaff = this.filteredStaff.slice(startIndex, endIndex);
  }
  changePage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.updatePagination();
  }
}

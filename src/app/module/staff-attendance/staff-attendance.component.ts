import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BreadcrumbComponent } from '../../shared/breadcrumb/breadcrumb.component';
import { TableHeaderComponent } from '../../shared/components/table-header/table-header.component';
import { TableFooterComponent } from '../../shared/components/table-footer/table-footer.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-staff-attendance',
  imports: [CommonModule, BreadcrumbComponent, TableHeaderComponent, TableFooterComponent, FormsModule],
  templateUrl: './staff-attendance.component.html',
  styleUrl: './staff-attendance.component.scss'
})
export class StaffAttendanceComponent implements OnInit{
pageTitle = 'Staff Attendance';
  addStaffUrl = '/staff/add';
  breadcrumbs = [
    { label: 'Home', url: '/' },
    { label: 'Staff Attendance' }
  ];

  attendanceList: StaffAttendance[] = [];

  // Filters
  searchTerm = '';
  filteredAttendence: any[] = [];
  paginatedAttendence: any[] = [];

  currentPage = 1;
  pageSize = 5;
  totalPages = 1;
  pageSizeOptions = [5, 10, 20, 50, 100];

  filterDepartment: string = 'All';
  filterStatus: string = 'All';
  startDate: string = '';
  endDate: string = '';

  ngOnInit(): void {
    // Dummy Data
    this.attendanceList = [
      { empId: 201, name: 'Rajesh Kumar', department: 'Maths', designation: 'Teacher', date: '2025-08-01', status: 'Present' },
      { empId: 202, name: 'Sunita Devi', department: 'Science', designation: 'Teacher', date: '2025-08-01', status: 'Absent' },
      { empId: 203, name: 'Arun Singh', department: 'Admin', designation: 'Clerk', date: '2025-08-01', status: 'Late' },
      { empId: 204, name: 'Meena Sharma', department: 'English', designation: 'Teacher', date: '2025-08-01', status: 'Present' },
      { empId: 205, name: 'Vivek Gupta', department: 'Sports', designation: 'Coach', date: '2025-08-01', status: 'Present' }
    ];

    this.applyFilters();
  }

  applyFilters() {
    this.filteredAttendence = this.attendanceList.filter(item => {
      const matchesSearch =
        this.searchTerm === '' ||
        item.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        item.empId.toString().includes(this.searchTerm);

      const matchesDept = this.filterDepartment === 'All' || item.department === this.filterDepartment;
      const matchesStatus = this.filterStatus === 'All' || item.status === this.filterStatus;

      const matchesDate =
        (!this.startDate || item.date >= this.startDate) &&
        (!this.endDate || item.date <= this.endDate);

      return matchesSearch && matchesDept && matchesStatus && matchesDate;
    });

    this.currentPage = 1;
    this.updatePagination();
  }

  // Export Functions
  exportToExcel() {
    alert('Export to Excel clicked!');
  }

  exportToPDF() {
    alert('Export to PDF clicked!');
  }

  onPageSizeChange() {
    this.updatePagination();
  }

  onSearchChange() {
    const term = this.searchTerm.toLowerCase();
    this.filteredAttendence = this.attendanceList.filter((staff) =>
      Object.values(staff).some((val) =>
        String(val).toLowerCase().includes(term)
      )
    );
    this.currentPage = 1;
    this.updatePagination();
  }

  updatePagination() {
    this.totalPages = Math.ceil(this.filteredAttendence.length / this.pageSize);
    if (this.currentPage > this.totalPages) {
      this.currentPage = this.totalPages || 1;
    }
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedAttendence = this.filteredAttendence.slice(startIndex, endIndex);
  }

  changePage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.updatePagination();
  }
}

interface StaffAttendance {
  empId: number;
  name: string;
  department: string;
  designation: string;
  date: string;
  status: 'Present' | 'Absent' | 'Late';
}
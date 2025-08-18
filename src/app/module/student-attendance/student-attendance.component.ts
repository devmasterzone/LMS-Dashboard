import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BreadcrumbComponent } from '../../shared/breadcrumb/breadcrumb.component';
import { TableHeaderComponent } from '../../shared/components/table-header/table-header.component';
import { TableFooterComponent } from '../../shared/components/table-footer/table-footer.component';

@Component({
  selector: 'app-student-attendance',
  imports: [CommonModule,BreadcrumbComponent,TableHeaderComponent,TableFooterComponent, FormsModule],
  templateUrl: './student-attendance.component.html',
  styleUrl: './student-attendance.component.scss'
})
export class StudentAttendanceComponent implements OnInit{
  pageTitle = 'Student Attendance';
  addBookUrl = '/library/add';
  breadcrumbs = [
    { label: 'Home', url: '/' },
    { label: 'Student Attendance' }
  ];
attendanceList: Attendance[] = [];


  // Filters
  searchTerm = '';
    filteredAttendence: any[] = [];
    paginatedAttendence: any[] = [];
  
    currentPage = 1;
    pageSize = 5;
    totalPages = 1;
    pageSizeOptions = [5, 10, 20, 50, 100];


  filterClass: string = 'All';
  filterSection: string = 'All';
  filterStatus: string = 'All';
  startDate: string = '';
  endDate: string = '';

  // Pagination
  itemsPerPage: number = 8;

  ngOnInit(): void {
    
    // Dummy Data
    this.attendanceList = [
      { rollNo: 101, name: 'Ravi Kumar', class: '10', section: 'A', date: '2025-08-01', status: 'Present' },
      { rollNo: 102, name: 'Anita Sharma', class: '10', section: 'A', date: '2025-08-01', status: 'Absent' },
      { rollNo: 103, name: 'Mohit Singh', class: '9', section: 'B', date: '2025-08-01', status: 'Late' },
      { rollNo: 104, name: 'Priya Verma', class: '9', section: 'B', date: '2025-08-01', status: 'Present' },
      { rollNo: 105, name: 'Karan Patel', class: '11', section: 'C', date: '2025-08-01', status: 'Present' },
      { rollNo: 106, name: 'Simran Kaur', class: '11', section: 'C', date: '2025-08-01', status: 'Absent' },
      { rollNo: 107, name: 'Vikram Mehta', class: '12', section: 'A', date: '2025-08-01', status: 'Present' },
      { rollNo: 108, name: 'Neha Gupta', class: '12', section: 'A', date: '2025-08-01', status: 'Late' },
      { rollNo: 109, name: 'Arjun Reddy', class: '10', section: 'B', date: '2025-08-01', status: 'Present' }
    ];

    this.applyFilters();
    this.filteredAttendence = [...this.attendanceList];
  this.updatePagination();
  }

  applyFilters() {
  this.filteredAttendence = this.attendanceList.filter(item => {
    const matchesSearch =
      this.searchTerm === '' ||
      item.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      item.rollNo.toString().includes(this.searchTerm);

    const matchesClass = this.filterClass === 'All' || item.class === this.filterClass;
    const matchesSection = this.filterSection === 'All' || item.section === this.filterSection;
    const matchesStatus = this.filterStatus === 'All' || item.status === this.filterStatus;

    const matchesDate =
      (!this.startDate || item.date >= this.startDate) &&
      (!this.endDate || item.date <= this.endDate);

    return matchesSearch && matchesClass && matchesSection && matchesStatus && matchesDate;
  });

  this.currentPage = 1;
  this.updatePagination();   // ✅ refresh the paginated list
}


  // Pagination
  get paginatedList(): Attendance[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredAttendence.slice(start, start + this.itemsPerPage);
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
    this.filteredAttendence = this.attendanceList.filter((book) =>
      Object.values(book).some((val) =>
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
interface Attendance {
  rollNo: number;
  name: string;
  class: string;
  section: string;
  date: string;
  status: 'Present' | 'Absent' | 'Late';
}

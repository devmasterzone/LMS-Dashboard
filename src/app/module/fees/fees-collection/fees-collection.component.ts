import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BreadcrumbComponent } from '../../../shared/breadcrumb/breadcrumb.component';
import { TableHeaderComponent } from '../../../shared/components/table-header/table-header.component';
import { TableFooterComponent } from '../../../shared/components/table-footer/table-footer.component';

@Component({
  selector: 'app-fees-collection',
  imports: [CommonModule,BreadcrumbComponent,TableHeaderComponent,TableFooterComponent],
  templateUrl: './fees-collection.component.html',
  styleUrl: './fees-collection.component.scss'
})
export class FeesCollectionComponent implements OnInit{
   pageTitle = 'Fees';
  addBookUrl = '/library/add';
  breadcrumbs = [
    { label: 'Home', url: '/' },
    { label: 'Fees' }
  ];
  searchTerm = '';
    filteredFess: any[] = [];
    paginatedFess: any[] = [];
  
    currentPage = 1;
    pageSize = 5;
    totalPages = 1;
    pageSizeOptions = [5, 10, 20, 50, 100];
feesList = [
    {
      studentName: 'Rahul Sharma',
      rollNo: 'CS101',
      department: 'Computer Science',
      tuition: 25000,
      exam: 2000,
      library: 1000,
      total: 28000,
      paidAmount: 28000,
      status: 'Paid'
    },
    {
      studentName: 'Priya Verma',
      rollNo: 'EC202',
      department: 'Electronics',
      tuition: 24000,
      exam: 1800,
      library: 800,
      total: 26600,
      paidAmount: 15000,
      status: 'Partial'
    },
    {
      studentName: 'Amit Patil',
      rollNo: 'ME303',
      department: 'Mechanical',
      tuition: 26000,
      exam: 2200,
      library: 1200,
      total: 29400,
      paidAmount: 29400,
      status: 'Paid'
    },
    {
      studentName: 'Sneha Kulkarni',
      rollNo: 'CE404',
      department: 'Civil',
      tuition: 23000,
      exam: 1900,
      library: 1000,
      total: 25900,
      paidAmount: 0,
      status: 'Unpaid'
    }
  ];
  ngOnInit() {
  this.filteredFess = [...this.feesList];
  this.updatePagination();
}

   onPageSizeChange() {
    this.updatePagination();
  }

  onSearchChange() {
    const term = this.searchTerm.toLowerCase();
    this.filteredFess = this.feesList.filter((book) =>
      Object.values(book).some((val) =>
        String(val).toLowerCase().includes(term)
      )
    );
    this.currentPage = 1;
    this.updatePagination();
  }
  updatePagination() {
    this.totalPages = Math.ceil(this.filteredFess.length / this.pageSize);
    if (this.currentPage > this.totalPages) {
      this.currentPage = this.totalPages || 1;
    }
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedFess = this.filteredFess.slice(startIndex, endIndex);
  }
  changePage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.updatePagination();
  }
  
}

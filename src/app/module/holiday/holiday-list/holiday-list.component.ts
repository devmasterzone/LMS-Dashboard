import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BreadcrumbComponent } from '../../../shared/breadcrumb/breadcrumb.component';
import { TableHeaderComponent } from '../../../shared/components/table-header/table-header.component';
import { TableFooterComponent } from '../../../shared/components/table-footer/table-footer.component';

@Component({
  selector: 'app-holiday-list',
  imports: [CommonModule,BreadcrumbComponent,TableHeaderComponent,TableFooterComponent],
  templateUrl: './holiday-list.component.html',
  styleUrl: './holiday-list.component.scss'
})
export class HolidayListComponent {
  pageTitle = 'Holidays';
  addBookUrl = '/library/add';
  breadcrumbs = [
    { label: 'Home', url: '/' },
    { label: 'Holidays' }
  ];
  searchTerm = '';
    filteredHolidays: any[] = [];
    paginatedHolidays: any[] = [];
  
    currentPage = 1;
    pageSize = 5;
    totalPages = 1;
    pageSizeOptions = [5, 10, 20, 50, 100];
 holidays= [
    { name: 'Republic Day', date: '26-01-2025', day: 'Sunday', category: 'National Holiday' },
    { name: 'Holi', date: '14-03-2025', day: 'Friday', category: 'Festival' },
    { name: 'Good Friday', date: '18-04-2025', day: 'Friday', category: 'Religious' },
    { name: 'Independence Day', date: '15-08-2025', day: 'Friday', category: 'National Holiday' },
    { name: 'Ganesh Chaturthi', date: '28-08-2025', day: 'Thursday', category: 'Festival' },
    { name: 'Gandhi Jayanti', date: '02-10-2025', day: 'Thursday', category: 'National Holiday' },
    { name: 'Diwali', date: '20-10-2025', day: 'Monday', category: 'Festival' },
    { name: 'Christmas', date: '25-12-2025', day: 'Thursday', category: 'Religious' }
  ];
  ngOnInit() {
  this.filteredHolidays = [...this.holidays];
  this.updatePagination();
}

   onPageSizeChange() {
    this.updatePagination();
  }

  onSearchChange() {
    const term = this.searchTerm.toLowerCase();
    this.filteredHolidays = this.holidays.filter((book) =>
      Object.values(book).some((val) =>
        String(val).toLowerCase().includes(term)
      )
    );
    this.currentPage = 1;
    this.updatePagination();
  }
  updatePagination() {
    this.totalPages = Math.ceil(this.filteredHolidays.length / this.pageSize);
    if (this.currentPage > this.totalPages) {
      this.currentPage = this.totalPages || 1;
    }
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedHolidays = this.filteredHolidays.slice(startIndex, endIndex);
  }
  changePage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.updatePagination();
  }
}

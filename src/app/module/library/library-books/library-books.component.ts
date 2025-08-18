import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { BreadcrumbComponent } from '../../../shared/breadcrumb/breadcrumb.component';
import { TableHeaderComponent } from '../../../shared/components/table-header/table-header.component';
import { TableFooterComponent } from '../../../shared/components/table-footer/table-footer.component';
import { Router } from '@angular/router';
import { SharedService } from '../../../shared/services/shared.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmComponent } from '../../../shared/components/delete-confirm/delete-confirm.component';

@Component({
  selector: 'app-library-books',
  imports: [CommonModule,BreadcrumbComponent,TableHeaderComponent,TableFooterComponent],
  templateUrl: './library-books.component.html',
  styleUrl: './library-books.component.scss',
  encapsulation:ViewEncapsulation.None
})
export class LibraryBooksComponent {

  pageTitle = 'All Books';
  addBookUrl = '/library/add';
  breadcrumbs = [
    { label: 'Home', url: '/' },
    { label: 'Library', url: '/library' },
    { label: 'All Books' }
  ];

  searchTerm = '';
  filteredBooks: Book[] = [];
  paginatedBooks: Book[] = [];

  currentPage = 1;
  pageSize = 5;
  totalPages = 1;

  books: Book[] = [
  {
    id: 1,
    title: 'Wings of Fire',
    author: 'Dr. A.P.J. Abdul Kalam',
    isbn: '9788173711466',
    copiesAvailable: 4,
    totalCopies: 10,
    addedDate: '2024-01-10'
  },
  {
    id: 2,
    title: 'Quantitative Aptitude',
    author: 'R.S. Aggarwal',
    isbn: '9788121924986',
    copiesAvailable: 8,
    totalCopies: 12,
    addedDate: '2024-02-14'
  },
  {
    id: 3,
    title: 'Half Girlfriend',
    author: 'Chetan Bhagat',
    isbn: '9788129135728',
    copiesAvailable: 2,
    totalCopies: 5,
    addedDate: '2024-03-01'
  }
];


  pageSizeOptions = [5, 10, 20, 50, 100];

   constructor(private router: Router, private sharedService: SharedService, private dialog: MatDialog) {}

  ngOnInit() {
    this.onSearchChange();
  }

  onPageSizeChange() {
    this.updatePagination();
  }

  onSearchChange() {
    const term = this.searchTerm.toLowerCase();
    this.filteredBooks = this.books.filter((book) =>
      Object.values(book).some((val) =>
        String(val).toLowerCase().includes(term)
      )
    );
    this.currentPage = 1;
    this.updatePagination();
  }

  editBook(book: Book) {
    this.sharedService.setId(book.id);
    this.router.navigate(['/library/edit']);
  }

  confirmDelete(book: Book) {
    const dialogRef = this.dialog.open(DeleteConfirmComponent, {
      width: '400px',
      data: {
        type: 'delete',
        title: 'Delete Book',
        message: `Are you sure you want to delete ${book.title}?`,
        confirmText: 'Delete'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Deleted', book);
      }
    });
  }

  updatePagination() {
    this.totalPages = Math.ceil(this.filteredBooks.length / this.pageSize);
    if (this.currentPage > this.totalPages) {
      this.currentPage = this.totalPages || 1;
    }
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedBooks = this.filteredBooks.slice(startIndex, endIndex);
  }

  changePage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.updatePagination();
  }
}

export interface Book {
  id: any;
  title: string;
  author: string;
  isbn: string;
  copiesAvailable: number;
  totalCopies: number;
  addedDate: string;
}

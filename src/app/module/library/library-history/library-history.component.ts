import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { BreadcrumbComponent } from '../../../shared/breadcrumb/breadcrumb.component';
import { TableHeaderComponent } from '../../../shared/components/table-header/table-header.component';
import { TableFooterComponent } from '../../../shared/components/table-footer/table-footer.component';
import { DeleteConfirmComponent } from '../../../shared/components/delete-confirm/delete-confirm.component';
import { SharedService } from '../../../shared/services/shared.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-library-history',
  imports: [CommonModule,BreadcrumbComponent,TableHeaderComponent,TableFooterComponent],
  templateUrl: './library-history.component.html',
  styleUrl: './library-history.component.scss',
  encapsulation:ViewEncapsulation.None
})
export class LibraryHistoryComponent {

  pageTitle = 'Library Issue History';
  addIssueUrl = '/library/issue/add';
  breadcrumbs = [
    { label: 'Home', url: '/' },
    { label: 'Library', url: '/library' },
    { label: 'Issue History' }
  ];

  searchTerm = '';
  filteredIssues: Issue[] = [];
  paginatedIssues: Issue[] = [];

  currentPage = 1;
  pageSize = 5;
  totalPages = 1;

  pageSizeOptions = [5, 10, 20, 50, 100];

  libraryIssues: Issue[] = [
    {
      issueId: 1,
      memberName: 'Rahul Sharma',
      memberEmail: 'rahul@example.com',
      bookTitle: 'Data Structures and Algorithms',
      category: 'Computer Science',
      isbn: '978-1234567890',
      issueDate: '2025-01-10',
      dueDate: '2025-01-25',
      returnDate: '2025-01-20',
      status: 'RETURNED'
    },
    {
      issueId: 2,
      memberName: 'Priya Verma',
      memberEmail: 'priya@example.com',
      bookTitle: 'Database Management System',
      category: 'Computer Science',
      isbn: '978-9876543210',
      issueDate: '2025-01-15',
      dueDate: '2025-01-30',
      returnDate: '',
      status: 'ISSUED'
    },
    {
      issueId: 3,
      memberName: 'Amit Kumar',
      memberEmail: 'amit@example.com',
      bookTitle: 'Operating System Concepts',
      category: 'Computer Science',
      isbn: '978-1112223334',
      issueDate: '2025-01-18',
      dueDate: '2025-02-02',
      returnDate: '',
      status: 'OVERDUE'
    },
    {
      issueId: 4,
      memberName: 'Sneha Patil',
      memberEmail: 'sneha@example.com',
      bookTitle: 'Computer Networks',
      category: 'Computer Science',
      isbn: '978-4445556667',
      issueDate: '2025-01-20',
      dueDate: '2025-02-05',
      returnDate: '2025-01-28',
      status: 'RETURNED'
    }
  ];

  constructor(
    private router: Router,
    private sharedService: SharedService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.onSearchChange();
  }

  onPageSizeChange() {
    this.updatePagination();
  }

  onSearchChange() {
    const term = this.searchTerm.toLowerCase();
    this.filteredIssues = this.libraryIssues.filter((issue) =>
      Object.values(issue).some((val) =>
        String(val).toLowerCase().includes(term)
      )
    );
    this.currentPage = 1;
    this.updatePagination();
  }

  updatePagination() {
    this.totalPages = Math.ceil(this.filteredIssues.length / this.pageSize);
    if (this.currentPage > this.totalPages) {
      this.currentPage = this.totalPages || 1;
    }
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedIssues = this.filteredIssues.slice(startIndex, endIndex);
  }

  changePage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.updatePagination();
  }

  editIssue(issue: Issue) {
    this.sharedService.setId(issue.issueId);
    this.router.navigate(['/library/issue/edit']);
  }

  markReturned(issue: Issue) {
    issue.status = 'RETURNED';
    issue.returnDate = new Date().toISOString().split('T')[0];
    console.log('Marked as returned:', issue);
    this.onSearchChange();
  }

  confirmDelete(issue: Issue) {
    const dialogRef = this.dialog.open(DeleteConfirmComponent, {
      width: '400px',
      data: {
        type: 'delete',
        title: 'Delete Issue Record',
        message: `Are you sure you want to delete Issue #${issue.issueId}?`,
        confirmText: 'Delete'
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.libraryIssues = this.libraryIssues.filter(
          (i) => i.issueId !== issue.issueId
        );
        this.onSearchChange();
        console.log('Deleted Issue', issue);
      }
    });
  }
}

export interface Issue {
  issueId: any;
  memberName: string;
  memberEmail?: string;
  bookTitle: string;
  category?: string;
  isbn: string;
  issueDate: string;
  dueDate: string;
  returnDate?: string;
  status: 'ISSUED' | 'RETURNED' | 'OVERDUE';
}
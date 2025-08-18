import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SharedService } from '../../../shared/services/shared.service';
import { Router } from '@angular/router';
import { DeleteConfirmComponent } from '../../../shared/components/delete-confirm/delete-confirm.component';
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent } from '../../../shared/breadcrumb/breadcrumb.component';
import { TableHeaderComponent } from '../../../shared/components/table-header/table-header.component';
import { TableFooterComponent } from '../../../shared/components/table-footer/table-footer.component';


@Component({
  selector: 'app-courses-all',
  imports: [CommonModule,BreadcrumbComponent,TableHeaderComponent,TableFooterComponent],
  templateUrl: './courses-all.component.html',
  styleUrl: './courses-all.component.scss'
})
export class CoursesAllComponent implements OnInit{
   pageTitle = 'All Courses';
  addCourseUrl = '/courses/add';
  breadcrumbs = [
    { label: 'Home', url: '/' },
    { label: 'Courses', url: '/courses' },
    { label: 'All Courses' }
  ];

  searchTerm = '';
  filteredCourses: Course[] = [];
  paginatedCourses: Course[] = [];

  currentPage = 1;
  pageSize = 5;
  totalPages = 1;

  courses: Course[] = [
    {
      photo: 'courses/course1.jpg',
      code: 'CS101',
      name: 'Computer Science Fundamentals',
      details: 'Introduction to programming and algorithms.',
      startFrom: '2025-09-01',
      duration: '6 Months',
      price: 500,
      professor: 'Dr. John Smith',
      maxStudents: 30,
      contact: '9876543210'
    },
    {
      photo: 'courses/course2.jpg',
      code: 'ENG201',
      name: 'English Literature',
      details: 'Study of classic English literature works.',
      startFrom: '2025-10-15',
      duration: '4 Months',
      price: 350,
      professor: 'Prof. Jane Doe',
      maxStudents: 25,
      contact: '9876543211'
    },
    {
      photo: 'courses/course3.jpg',
      code: 'MTH301',
      name: 'Advanced Mathematics',
      details: 'In-depth calculus and linear algebra.',
      startFrom: '2025-09-20',
      duration: '8 Months',
      price: 600,
      professor: 'Dr. Alan Brown',
      maxStudents: 20,
      contact: '9876543212'
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
    this.filteredCourses = this.courses.filter((course) =>
      Object.values(course).some((val) =>
        String(val).toLowerCase().includes(term)
      )
    );
    this.currentPage = 1;
    this.updatePagination();
  }

  editCourse(course: Course) {
    this.sharedService.setId(course.code);
    this.router.navigate(['/courses/edit']);
  }

  confirmDelete(course: Course) {
    const dialogRef = this.dialog.open(DeleteConfirmComponent, {
      width: '400px',
      data: {
        type: 'delete',
        title: 'Delete Course',
        message: `Are you sure you want to delete ${course.name}?`,
        confirmText: 'Delete'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Deleted', course);
      }
    });
  }

  updatePagination() {
    this.totalPages = Math.ceil(this.filteredCourses.length / this.pageSize);
    if (this.currentPage > this.totalPages) {
      this.currentPage = this.totalPages || 1;
    }
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedCourses = this.filteredCourses.slice(startIndex, endIndex);
  }

  changePage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.updatePagination();
  }
}

export interface Course {
  photo: string;
  code: string;
  name: string;
  details: string;
  startFrom: string;
  duration: string;
  price: number;
  professor: string;
  maxStudents: number;
  contact: string;
}
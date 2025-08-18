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
  selector: 'app-students-all',
  imports: [CommonModule,BreadcrumbComponent,TableHeaderComponent,TableFooterComponent],
  templateUrl: './students-all.component.html',
  styleUrl: './students-all.component.scss'
})
export class StudentsAllComponent implements OnInit{
   pageTitle = 'All Students';
  addStudentUrl = '/students/add';
  breadcrumbs = [
    { label: 'Home', url: '/' },
    { label: 'Students', url: '/students' },
    { label: 'All Students' }
  ];

  searchTerm = '';
  filteredStudents: Student[] = [];
  paginatedStudents: Student[] = [];

  currentPage = 1;
  pageSize = 5;
  totalPages = 1;

  students: Student[] = [
    {
      profile: 'profile/user1.jpg',
      rollNo: 'STU1001',
      name: 'John Doe',
      gender: 'Male',
      class: '10th Grade',
      mobile: '9876543210',
      email: 'john.doe@example.com',
      admissionDate: '2020-07-25'
    },
    {
      profile: 'profile/user2.jpg',
      rollNo: 'STU1002',
      name: 'Jane Smith',
      gender: 'Female',
      class: '9th Grade',
      mobile: '9876543211',
      email: 'jane.smith@example.com',
      admissionDate: '2021-06-15'
    },
    {
      profile: 'profile/user3.jpg',
      rollNo: 'STU1003',
      name: 'Michael Brown',
      gender: 'Male',
      class: '11th Grade',
      mobile: '9876543212',
      email: 'michael.brown@example.com',
      admissionDate: '2019-04-10'
    },
    {
      profile: 'profile/user4.jpg',
      rollNo: 'STU1004',
      name: 'Emily Johnson',
      gender: 'Female',
      class: '12th Grade',
      mobile: '9876543213',
      email: 'emily.johnson@example.com',
      admissionDate: '2018-09-05'
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
    this.filteredStudents = this.students.filter((student) =>
      Object.values(student).some((val) =>
        String(val).toLowerCase().includes(term)
      )
    );
    this.currentPage = 1;
    this.updatePagination();
  }

  editStudent(student: Student) {
    this.sharedService.setId(student.rollNo);
    this.router.navigate(['/students/edit']);
  }

  confirmDelete(student: Student) {
    const dialogRef = this.dialog.open(DeleteConfirmComponent, {
      width: '400px',
      data: {
        type: 'delete',
        title: 'Delete Student',
        message: `Are you sure you want to delete ${student.name}?`,
        confirmText: 'Delete'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Deleted', student);
      }
    });
  }

  updatePagination() {
    this.totalPages = Math.ceil(this.filteredStudents.length / this.pageSize);
    if (this.currentPage > this.totalPages) {
      this.currentPage = this.totalPages || 1;
    }
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedStudents = this.filteredStudents.slice(startIndex, endIndex);
  }

  changePage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.updatePagination();
  }
}

export interface Student {
  profile: string;
  rollNo: string;
  name: string;
  gender: string;
  class: string;
  mobile: string;
  email: string;
  admissionDate: string;
}

import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BreadcrumbComponent } from '../../../shared/breadcrumb/breadcrumb.component';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { TableHeaderComponent } from '../../../shared/components/table-header/table-header.component';
import { TableFooterComponent } from '../../../shared/components/table-footer/table-footer.component';

@Component({
  selector: 'app-professors-all',
  imports: [CommonModule,BreadcrumbComponent,FormsModule,MatIconModule,TableHeaderComponent,TableFooterComponent],
  templateUrl: './professors-all.component.html',
  styleUrl: './professors-all.component.scss',
  encapsulation:ViewEncapsulation.None
})
export class ProfessorsAllComponent implements OnInit{
  pageTitle = 'All Professors';
  addprofessorulr = '/professors/add';
  breadcrumbs = [
    { label: 'Home', url: '/' },
    { label: 'Professors', url: '/professors' },
    { label: 'All Professors' }
  ];

  searchTerm: string = '';
  filteredProfessors: Professor[] = [];
paginatedProfessors:Professor[] = [];

currentPage = 1;
pageSize = 5;
totalPages = 1;

 professors = [
    {
      profile: 'profile/user1.jpg',
      name: 'Garrett Winters',
      department: 'Accountant',
      gender: 'Female',
      education: 'B.A, B.C.A',
      mobile: '987 654 3210',
      email: 'info@example.com',
      joiningDate: '2020/07/25'
    },
    {
       profile: 'profile/user2.jpg',
      name: 'Airi Satou',
      department: 'Junior Technical',
      gender: 'Female',
      education: 'B.A, B.C.A',
      mobile: '987 654 3210',
      email: 'info@example.com',
      joiningDate: '2021/11/28'
    },
    {
       profile: 'profile/user3.jpg',
      name: 'Tiger Nixon',
      department: 'Clerk',
      gender: 'Female',
      education: 'B.Sc',
      mobile: '123 456 7890',
      email: 'info@example.com',
      joiningDate: '2019/04/25'
    },
    {
       profile: 'profile/user4.jpg',
      name: 'Cedric Kelly',
      department: 'Developer',
      gender: 'Female',
      education: 'BTech',
      mobile: '123 456 7890',
      email: 'info@example.com',
      joiningDate: '2018/04/25'
    },
    {
      profile: 'profile/user1.jpg',
      name: 'Garrett Winters',
      department: 'Accountant',
      gender: 'Female',
      education: 'B.A, B.C.A',
      mobile: '987 654 3210',
      email: 'info@example.com',
      joiningDate: '2020/07/25'
    },
    {
       profile: 'profile/user2.jpg',
      name: 'Airi Satou',
      department: 'Junior Technical',
      gender: 'Female',
      education: 'B.A, B.C.A',
      mobile: '987 654 3210',
      email: 'info@example.com',
      joiningDate: '2021/11/28'
    },
    {
       profile: 'profile/user3.jpg',
      name: 'Tiger Nixon',
      department: 'Clerk',
      gender: 'Female',
      education: 'B.Sc',
      mobile: '123 456 7890',
      email: 'info@example.com',
      joiningDate: '2019/04/25'
    },
    {
       profile: 'profile/user4.jpg',
      name: 'Cedric Kelly',
      department: 'Developer',
      gender: 'Female',
      education: 'BTech',
      mobile: '123 456 7890',
      email: 'info@example.com',
      joiningDate: '2018/04/25'
    },
    {
      profile: 'profile/user1.jpg',
      name: 'Garrett Winters',
      department: 'Accountant',
      gender: 'Female',
      education: 'B.A, B.C.A',
      mobile: '987 654 3210',
      email: 'info@example.com',
      joiningDate: '2020/07/25'
    },
    {
       profile: 'profile/user2.jpg',
      name: 'Airi Satou',
      department: 'Junior Technical',
      gender: 'Female',
      education: 'B.A, B.C.A',
      mobile: '987 654 3210',
      email: 'info@example.com',
      joiningDate: '2021/11/28'
    },
    {
       profile: 'profile/user3.jpg',
      name: 'Tiger Nixon',
      department: 'Clerk',
      gender: 'Female',
      education: 'B.Sc',
      mobile: '123 456 7890',
      email: 'info@example.com',
      joiningDate: '2019/04/25'
    },
    {
       profile: 'profile/user4.jpg',
      name: 'Cedric Kelly',
      department: 'Developer',
      gender: 'Female',
      education: 'BTech',
      mobile: '123 456 7890',
      email: 'info@example.com',
      joiningDate: '2018/04/25'
    },
    {
      profile: 'profile/user1.jpg',
      name: 'Garrett Winters',
      department: 'Accountant',
      gender: 'Female',
      education: 'B.A, B.C.A',
      mobile: '987 654 3210',
      email: 'info@example.com',
      joiningDate: '2020/07/25'
    },
    {
       profile: 'profile/user2.jpg',
      name: 'Airi Satou',
      department: 'Junior Technical',
      gender: 'Female',
      education: 'B.A, B.C.A',
      mobile: '987 654 3210',
      email: 'info@example.com',
      joiningDate: '2021/11/28'
    },
    {
       profile: 'profile/user3.jpg',
      name: 'Tiger Nixon',
      department: 'Clerk',
      gender: 'Female',
      education: 'B.Sc',
      mobile: '123 456 7890',
      email: 'info@example.com',
      joiningDate: '2019/04/25'
    },
    {
       profile: 'profile/user4.jpg',
      name: 'Cedric Kelly',
      department: 'Developer',
      gender: 'Female',
      education: 'BTech',
      mobile: '123 456 7890',
      email: 'info@example.com',
      joiningDate: '2018/04/25'
    },
    {
      profile: 'profile/user1.jpg',
      name: 'Garrett Winters',
      department: 'Accountant',
      gender: 'Female',
      education: 'B.A, B.C.A',
      mobile: '987 654 3210',
      email: 'info@example.com',
      joiningDate: '2020/07/25'
    },
    {
       profile: 'profile/user2.jpg',
      name: 'Airi Satou',
      department: 'Junior Technical',
      gender: 'Female',
      education: 'B.A, B.C.A',
      mobile: '987 654 3210',
      email: 'info@example.com',
      joiningDate: '2021/11/28'
    },
    {
       profile: 'profile/user3.jpg',
      name: 'Tiger Nixon',
      department: 'Clerk',
      gender: 'Female',
      education: 'B.Sc',
      mobile: '123 456 7890',
      email: 'info@example.com',
      joiningDate: '2019/04/25'
    },
    {
       profile: 'profile/user4.jpg',
      name: 'Cedric Kelly',
      department: 'Developer',
      gender: 'Female',
      education: 'BTech',
      mobile: '123 456 7890',
      email: 'info@example.com',
      joiningDate: '2018/04/25'
    },
    {
      profile: 'profile/user1.jpg',
      name: 'Garrett Winters',
      department: 'Accountant',
      gender: 'Female',
      education: 'B.A, B.C.A',
      mobile: '987 654 3210',
      email: 'info@example.com',
      joiningDate: '2020/07/25'
    },
    {
       profile: 'profile/user2.jpg',
      name: 'Airi Satou',
      department: 'Junior Technical',
      gender: 'Female',
      education: 'B.A, B.C.A',
      mobile: '987 654 3210',
      email: 'info@example.com',
      joiningDate: '2021/11/28'
    },
    {
       profile: 'profile/user3.jpg',
      name: 'Tiger Nixon',
      department: 'Clerk',
      gender: 'Female',
      education: 'B.Sc',
      mobile: '123 456 7890',
      email: 'info@example.com',
      joiningDate: '2019/04/25'
    },
    {
       profile: 'profile/user4.jpg',
      name: 'Cedric Kelly',
      department: 'Developer',
      gender: 'Female',
      education: 'BTech',
      mobile: '123 456 7890',
      email: 'info@example.com',
      joiningDate: '2018/04/25'
    }
    // Add more mock data...
  ];

   pageSizeOptions = [5, 10, 20, 50, 100]; // dropdown options

  onPageSizeChange() {
  this.currentPage = 1; // reset to first page
  this.updatePagination();
}

  
ngOnInit() {
  // Ideally fetch from a service
  this.onSearchChange();
}

onSearchChange() {
  const term = this.searchTerm.toLowerCase();
  this.filteredProfessors = this.professors.filter((prof) =>
    Object.values(prof).some((val) =>
      String(val).toLowerCase().includes(term)
    )
  );
  this.currentPage = 1; // reset page
  this.updatePagination();
}

updatePagination() {
  this.totalPages = Math.ceil(this.filteredProfessors.length / this.pageSize);

  // Ensure currentPage does not exceed new totalPages
  if (this.currentPage > this.totalPages) {
    this.currentPage = this.totalPages;
  }

  const startIndex = (this.currentPage - 1) * this.pageSize;
  const endIndex = startIndex + this.pageSize;

  this.paginatedProfessors = this.filteredProfessors.slice(startIndex, endIndex);
}



changePage(page: number) {
  if (page < 1 || page > this.totalPages) return;
  this.currentPage = page;
  this.updatePagination();
}

get totalPagesArray(): number[] {
  return Array.from({ length: this.totalPages }, (_, i) => i + 1);
}
}
export interface Professor {
  profile: string;
  name: string;
  department: string;
  gender: string;
  education: string;
  mobile: string;
  email: string;
  joiningDate: string;
}

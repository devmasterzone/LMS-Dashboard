import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BreadcrumbComponent } from '../../../shared/breadcrumb/breadcrumb.component';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { TableHeaderComponent } from '../../../shared/components/table-header/table-header.component';
import { TableFooterComponent } from '../../../shared/components/table-footer/table-footer.component';
import { Router } from '@angular/router';
import { SharedService } from '../../../shared/services/shared.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmComponent } from '../../../shared/components/delete-confirm/delete-confirm.component';

@Component({
  selector: 'app-professors-all',
  standalone: true,
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
      }

    ];

    pageSizeOptions = [5, 10, 20, 50, 100]; // dropdown options

    constructor(private router: Router,private sharedService: SharedService,private dialog: MatDialog){
      // this.onS
      // electItem('1');
    }
    
    onPageSizeChange() {
    this.updatePagination();
  }

    onSelectItem(id: string) {
    this.sharedService.setId(id);
  }
  ngOnInit() {
    
    this.onSearchChange();
  }
  goToAddPage(): void {
    this.onSelectItem('2');
    this.router.navigate(['./professors/edit']);
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
  confirmDelete(prof: any) {
        const dialogRef = this.dialog.open(DeleteConfirmComponent, {
      width: '400px',
      data: {
        type: 'delete',
        title: 'Delete Professor',
        message: `Are you sure you want to delete ${prof.name}?`,
        confirmText: 'Delete'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Deleted', prof);
        // Call delete API here
      }
    });

    }

    deleteProfessor(prof: any) {
      // Your delete logic here (API call, etc.)
      console.log('Deleting', prof);
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

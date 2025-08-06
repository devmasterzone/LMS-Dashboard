import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BreadcrumbComponent } from '../../../shared/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-professors-all',
  imports: [CommonModule,BreadcrumbComponent],
  templateUrl: './professors-all.component.html',
  styleUrl: './professors-all.component.scss'
})
export class ProfessorsAllComponent {
 professors = [
    {
      profile: 'assets/img/professors/1.jpg',
      name: 'Garrett Winters',
      department: 'Accountant',
      gender: 'Female',
      education: 'B.A, B.C.A',
      mobile: '987 654 3210',
      email: 'info@example.com',
      joiningDate: '2020/07/25'
    },
    {
      profile: 'assets/img/professors/2.jpg',
      name: 'Airi Satou',
      department: 'Junior Technical',
      gender: 'Female',
      education: 'B.A, B.C.A',
      mobile: '987 654 3210',
      email: 'info@example.com',
      joiningDate: '2021/11/28'
    },
    {
      profile: 'assets/img/professors/3.jpg',
      name: 'Tiger Nixon',
      department: 'Clerk',
      gender: 'Female',
      education: 'B.Sc',
      mobile: '123 456 7890',
      email: 'info@example.com',
      joiningDate: '2019/04/25'
    },
    {
      profile: 'assets/img/professors/4.jpg',
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
}

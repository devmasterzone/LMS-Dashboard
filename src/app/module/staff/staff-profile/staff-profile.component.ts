import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BreadcrumbComponent } from '../../../shared/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-staff-profile',
  imports: [CommonModule, BreadcrumbComponent],
  templateUrl: './staff-profile.component.html',
  styleUrl: './staff-profile.component.scss'
})
export class StaffProfileComponent {
 pageTitle = 'Staff Profile';
  breadcrumbs = [
    { label: 'Home', url: '/' },
    { label: 'Staff', url: '/staff' },
    { label: 'Profile', url: '/staff/profile' }
  ];

  staff = {
    staffId: 'STF12345',
    name: 'Dr. Ananya Sharma',
    designation: 'Assistant Professor',
    email: 'ananya.sharma@college.edu',
    phone: '+91 9876543210',
    department: 'Computer Science',
    joiningDate: '2021-08-15',
    address: 'Flat 12B, Green Residency, Nagpur, Maharashtra, India',
    photo: 'https://randomuser.me/api/portraits/women/44.jpg'
  };

  constructor() {}
}

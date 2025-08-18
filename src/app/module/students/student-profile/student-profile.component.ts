import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-student-profile',
  imports: [CommonModule],
  templateUrl: './student-profile.component.html',
  styleUrl: './student-profile.component.scss'
})
export class StudentProfileComponent {
activeTab: string = 'overview';

  student = {
    photo: 'assets/students/student1.jpg',
    name: 'Alice Johnson',
    rollNo: 'STU12345',
    course: 'Computer Science',
    year: '3rd Year',
    email: 'alice.johnson@example.com',
    phone: '+91 9876543210',
    address: '123, MG Road, Pune, India',
    dob: '2003-05-14',
    courses: [
      { code: 'CS101', name: 'Computer Science Fundamentals', grade: 'A' },
      { code: 'CS202', name: 'Data Structures & Algorithms', grade: 'B+' },
      { code: 'CS303', name: 'Database Management', grade: 'A-' }
    ],
    attendance: [
      { subject: 'CS101', attended: 42, total: 50 },
      { subject: 'CS202', attended: 38, total: 50 },
      { subject: 'CS303', attended: 45, total: 50 }
    ]
  };

  setTab(tab: string) {
    this.activeTab = tab;
  }

  getAttendancePercent(attended: number, total: number) {
    return ((attended / total) * 100).toFixed(1);
  }
}

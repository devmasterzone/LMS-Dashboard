import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BreadcrumbComponent } from '../../shared/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-time-table',
  imports: [CommonModule,FormsModule,BreadcrumbComponent],
  templateUrl: './time-table.component.html',
  styleUrl: './time-table.component.scss'
})
export class TimeTableComponent implements OnInit{
 breadcrumbs = [
    { label: 'Home', url: '/' },
    { label: 'Time Table', url: '/time-table' }
  ];

  departments = ['Computer Science', 'Mechanical', 'Electronics', 'Civil'];
  semesters = ['Semester 1', 'Semester 2', 'Semester 3', 'Semester 4'];
  staffList = ['Prof. Sharma', 'Dr. Patel', 'Ms. Rao', 'Mr. Verma'];

  selectedDepartment = this.departments[0];
  selectedSemester = this.semesters[0];
  selectedFaculty = '';

  periods = ['9-10 AM', '10-11 AM', '11-12 PM', '12-1 PM', '2-3 PM', '3-4 PM'];
  weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  timeTable: any = {
    'Monday': [
      { subject: 'Mathematics', faculty: 'Prof. Sharma', room: 'A-101' },
      { subject: 'Physics', faculty: 'Dr. Patel', room: 'Lab-2' },
      null,
      { subject: 'Computer Networks', faculty: 'Ms. Rao', room: 'C-305' },
      { subject: 'Free', faculty: '', room: '' },
      { subject: 'DBMS', faculty: 'Mr. Verma', room: 'C-201' }
    ],
    'Tuesday': [
      { subject: 'Java Programming', faculty: 'Ms. Rao', room: 'C-301' },
      null,
      { subject: 'Mathematics', faculty: 'Prof. Sharma', room: 'A-101' },
      { subject: 'Physics Lab', faculty: 'Dr. Patel', room: 'Lab-2' },
      { subject: 'Free', faculty: '', room: '' },
      { subject: 'DBMS', faculty: 'Mr. Verma', room: 'C-201' }
    ]
    // Add more for Wed-Sat
  };

  editData: any = {};
  editDay: string = '';
  editIndex: number = -1;

  ngOnInit(): void {}

  getSlots(day: string) {
    return this.timeTable[day] || Array(this.periods.length).fill(null);
  }

  editSlot(day: string, slot: any) {
    this.editDay = day;
    this.editIndex = this.timeTable[day].indexOf(slot);
    this.editData = { ...slot };
    const modal: any = document.getElementById('editSlotModal');
    if (modal) {
      const bsModal = new (window as any).bootstrap.Modal(modal);
      bsModal.show();
    }
  }

  updateSlot() {
    if (this.editDay && this.editIndex > -1) {
      this.timeTable[this.editDay][this.editIndex] = { ...this.editData };
    }
    const modal: any = document.getElementById('editSlotModal');
    if (modal) {
      const bsModal = (window as any).bootstrap.Modal.getInstance(modal);
      bsModal.hide();
    }
  }

  filterTimeTable() {
    console.log('Filter applied:', this.selectedDepartment, this.selectedSemester, this.selectedFaculty);
    // Here you can add API call / filtering logic
  }
}

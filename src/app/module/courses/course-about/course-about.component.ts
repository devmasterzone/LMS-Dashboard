import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-course-about',
  imports: [CommonModule],
  templateUrl: './course-about.component.html',
  styleUrl: './course-about.component.scss'
})
export class CourseAboutComponent {
 @Input() course = {
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
  };
}

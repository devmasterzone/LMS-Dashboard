import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BreadcrumbComponent } from '../../shared/breadcrumb/breadcrumb.component';

interface Announcement {
  id: number;
  title: string;
  message: string;
  category: 'General' | 'Exam' | 'Event' | 'Holiday';
  date: string; // ISO date string
  postedBy: string;
}

@Component({
  selector: 'app-announcements',
  imports: [CommonModule, FormsModule,BreadcrumbComponent],
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.scss']
})
export class AnnouncementsComponent implements OnInit {
  pageTitle = 'Announcements';
  addBookUrl = '/library/add';
  breadcrumbs = [
    { label: 'Home', url: '/' },
    { label: 'Announcements' }
  ];
  announcements: Announcement[] = [];
  filteredAnnouncements: Announcement[] = [];
  searchTerm: string = '';
  filterCategory: string = 'All';

  ngOnInit(): void {
    // Dummy Data
    this.announcements = [
      {
        id: 1,
        title: 'Semester Exams Schedule',
        message: 'Final semester exams will start from 25th November 2025. Detailed timetable is uploaded.',
        category: 'Exam',
        date: '2025-11-20',
        postedBy: 'Exam Department'
      },
      {
        id: 2,
        title: 'Diwali Holidays',
        message: 'The college will remain closed from 9th to 14th November for Diwali holidays.',
        category: 'Holiday',
        date: '2025-11-05',
        postedBy: 'Administration'
      },
      {
        id: 3,
        title: 'Annual Sports Day',
        message: 'All students are invited to participate in the Annual Sports Day on 5th December 2025.',
        category: 'Event',
        date: '2025-11-10',
        postedBy: 'Sports Committee'
      },
      {
        id: 4,
        title: 'New Library Books',
        message: 'Latest editions of Engineering, Management, and Science books have been added to the library.',
        category: 'General',
        date: '2025-11-15',
        postedBy: 'Library Department'
      }
    ];

    this.filteredAnnouncements = [...this.announcements];
  }

  filterAnnouncements() {
    this.filteredAnnouncements = this.announcements.filter(a => {
      const matchesSearch = a.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                            a.message.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesCategory = this.filterCategory === 'All' || a.category === this.filterCategory;
      return matchesSearch && matchesCategory;
    });
  }

  getCategoryClass(category: string): string {
    switch (category) {
      case 'Exam': return 'badge bg-danger';
      case 'Holiday': return 'badge bg-success';
      case 'Event': return 'badge bg-primary';
      default: return 'badge bg-secondary';
    }
  }
}

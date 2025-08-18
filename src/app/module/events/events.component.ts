import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-events',
  imports: [CommonModule, FormsModule],
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss'
})
export class EventsComponent {
 searchTerm: string = '';
  selectedCategory: string = 'All';
  showModal: boolean = false;
  selectedEvent: Event | null = null;

  events: Event[] = [
    {
      id: 1,
      title: 'Tech Fest 2025',
      date: '2025-09-10',
      category: 'Technology',
      description: 'Annual technical fest with coding, robotics, and hackathons.',
      location: 'Main Auditorium',
      image: 'https://source.unsplash.com/400x200/?technology,conference'
    },
    {
      id: 2,
      title: 'Cultural Fest',
      date: '2025-10-15',
      category: 'Cultural',
      description: 'Dance, music, drama and cultural competitions.',
      location: 'Open Ground',
      image: 'https://source.unsplash.com/400x200/?festival,concert'
    },
    {
      id: 3,
      title: 'Sports Meet',
      date: '2025-11-20',
      category: 'Sports',
      description: 'Annual sports day with athletics and team games.',
      location: 'Sports Complex',
      image: 'https://source.unsplash.com/400x200/?sports,stadium'
    }
  ];

  get filteredEvents(): Event[] {
    return this.events.filter(e =>
      (this.selectedCategory === 'All' || e.category === this.selectedCategory) &&
      (e.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
       e.description.toLowerCase().includes(this.searchTerm.toLowerCase()))
    );
  }

  openModal(event: Event) {
    this.selectedEvent = event;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.selectedEvent = null;
  }
}
interface Event {
  id: number;
  title: string;
  date: string;
  category: string;
  description: string;
  location: string;
  image: string;
}

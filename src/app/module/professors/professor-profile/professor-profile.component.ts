import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBar } from '@angular/material/progress-bar';
import { BreadcrumbComponent } from '../../../shared/breadcrumb/breadcrumb.component';
import { CountUpDirective } from '../../../shared/directives/count-up.directive';

@Component({
  selector: 'app-professor-profile',
  imports: [CommonModule,MatIconModule,BreadcrumbComponent,MatProgressBar,CountUpDirective],
  templateUrl: './professor-profile.component.html',
  styleUrl: './professor-profile.component.scss'
})
export class ProfessorProfileComponent {
  pageTitle = 'Professor Profile';
   breadcrumbs = [
    { label: 'Home', url: '/' },
    { label: 'Professor', url: '/Professor' },
    { label: 'Profile', url: '/Professor/profile' }
  ];
activeTab: string = 'overview'; // default tab

  setTab(tab: string) {
    this.activeTab = tab;
  }
  professorProfile = {
  id: 1,
  name: "Dr. John Doe",
  designation: "Head of Department",
  department: "Computer Science",
  title: "Professor of AI & Data Science",
  avatar: "https://bootdey.com/img/Content/avatar/avatar7.png",
  banner: "linear-gradient(135deg, #4f46e5, #3b82f6)",
  stats: [
    { label: "Years Exp.", value: 15 },
    { label: "Courses", value: 35 },
    { label: "Students", value: 1200 }
  ],
  contact: {
    email: "johndoe@university.edu",
    phone: "(239) 816-9029",
    location: "Bay Area, San Francisco"
  },


  socials: [
    { platform: "Website", icon: "fa-solid fa-globe", url: "#" },
    { platform: "GitHub", icon: "fa-brands fa-github", url: "#" },
    { platform: "Twitter", icon: "fa-brands fa-twitter", url: "#" },
    { platform: "LinkedIn", icon: "fa-brands fa-linkedin-in", url: "#" }
  ],
  overview: {
    about: [
      "Dr. John Doe is a passionate educator with 15+ years of teaching  experience in Computer Science, AI, and Data Science. His research includes Machine Learning, Deep Learning, and Big Data.",
      "He has published 40+ research papers in top-tier conferences (NeurIPS, ICML, CVPR) and collaborated with leading tech firms on AI-driven solutions. As an academic leader, he focuses on bridging the gap between research and industry applications."
    ] 
            
            ,
    education: [
      "Ph.D. in AI - Stanford University",
      "M.Tech in Computer Science - MIT",
      "B.Tech in Information Technology - UC Berkeley",
      "Executive Program in Data Science - Harvard Business School"
    ]
  },
  courses: [
    { name: "Computer Science Fundamentals (CS101)", icon: "fa-chalkboard" },
    { name: "Data Structures & Algorithms", icon: "fa-diagram-project" },
    { name: "Database Systems", icon: "fa-database" },
    { name: "Artificial Intelligence & Expert Systems", icon: "fa-robot" },
    { name: "Machine Learning with Python", icon: "fa-brain" },
    { name: "Cloud Computing & Big Data", icon: "fa-cloud" },
    { name: "Deep Learning for Computer Vision", icon: "fa-image" }
  ],
  research: [
    { name: "Machine Learning", progress: 90 },
    { name: "Deep Learning", progress: 85 },
    { name: "Big Data Analytics", progress: 80 },
    { name: "Natural Language Processing", progress: 75 },
    { name: "Computer Vision", progress: 70 },
    { name: "AI in Healthcare", progress: 65 }
  ],
  reviews: [
    {
      student: "Sarah Lee",
      avatar: "https://bootdey.com/img/Content/avatar/avatar6.png",
      rating: 4.5,
      comment: "Great mentor and very approachable!"
    },
    {
      student: "Michael Brown",
      avatar: "https://bootdey.com/img/Content/avatar/avatar5.png",
      rating: 5,
      comment: "Explains complex topics with ease. Highly recommended!"
    },
    {
      student: "Emily Carter",
      avatar: "https://bootdey.com/img/Content/avatar/avatar4.png",
      rating: 5,
      comment: "Dr. Doe’s teaching style is interactive and engaging. His ML course changed my career path!"
    },
    {
      student: "David Kim",
      avatar: "https://bootdey.com/img/Content/avatar/avatar3.png",
      rating: 4,
      comment: "Challenging assignments but very rewarding. He always provides constructive feedback."
    },
    {
      student: "Priya Sharma",
      avatar: "https://bootdey.com/img/Content/avatar/avatar2.png",
      rating: 4.8,
      comment: "The best professor I’ve had. Very supportive, and his research sessions are eye-opening."
    }
  ]
};

getStars(rating: number): string[] {
  const stars: string[] = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  // full stars
  for (let i = 0; i < fullStars; i++) {
    stars.push('full');
  }

  // half star
  if (hasHalfStar) {
    stars.push('half');
  }

  // empty stars
  while (stars.length < 5) {
    stars.push('empty');
  }

  return stars;
}
// TS Component
getBarColor(index: number): 'primary' | 'accent' | 'warn' {
  const colors: ('primary' | 'accent' | 'warn')[] = ['primary', 'accent', 'warn'];
  return colors[index % colors.length];
}

}

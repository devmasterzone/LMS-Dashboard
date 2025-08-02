import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import { RouterLink, RouterOutlet } from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatExpansionModule } from '@angular/material/expansion';
import {MatTooltipModule} from '@angular/material/tooltip';

@Component({
  selector: 'app-layout',
  imports: [CommonModule,
    MatSidenavModule,
    MatToolbarModule,MatListModule,
    MatIconModule,RouterOutlet,MatCardModule
    ,RouterLink, MatIconModule,MatToolbarModule,MatExpansionModule, MatTooltipModule ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  encapsulation:ViewEncapsulation.None
})
export class LayoutComponent {
   isDarkTheme = false;
  isSideNavOpened = true;
  sideNavMode: 'side' | 'over' = 'side';
  openSubmenu: string | null = null; // ✅ Move this here
   menu: SidebarMenu[] = [
    {
      title: 'Dashboard Light',
      icon: 'dashboard',
      route: '/dashboard-light'
    },
    {
      title: 'Dashboard Dark',
      icon: 'dark_mode',
      route: '/dashboard-dark'
    },
    {
      title: 'Event Management',
      icon: 'event',
      route: '/events'
    },
    {
      title: 'Professors',
      icon: 'person',
      children: [
        { title: 'All Professors', route: '/professors/all' },
        { title: 'Add Professor', route: '/professors/add' },
        { title: 'Edit Professor', route: '/professors/edit/1' },
        { title: 'Professor Profile', route: '/professors/profile/1' }
      ]
    },
    {
      title: 'Students',
      icon: 'groups',
      children: [
        { title: 'All Students', route: '/students/all' },
        { title: 'Add Student', route: '/students/add' },
        { title: 'Edit Student', route: '/students/edit/1' },
        { title: 'Student Profile', route: '/students/profile/1' }
      ]
    },
    {
      title: 'Courses',
      icon: 'book',
      children: [
        { title: 'All Courses', route: '/courses/all' },
        { title: 'Add Course', route: '/courses/add' },
        { title: 'Edit Course', route: '/courses/edit/1' },
        { title: 'About Course', route: '/courses/about' }
      ]
    }
  ];

  constructor(private breakpointObserver: BreakpointObserver) {
    this.breakpointObserver.observe([Breakpoints.Handset])
      .subscribe(result => {
        this.isSideNavOpened = !result.matches;
        this.sideNavMode = result.matches ? 'over' : 'side';
      });
  }

  toggleSideNav() {
    this.isSideNavOpened = !this.isSideNavOpened;
  }

  toggleTheme() {
  this.isDarkTheme = !this.isDarkTheme;

  // Add or remove the dark theme class on <body>
  if (this.isDarkTheme) {
    document.body.classList.add('dark-theme');
  } else {
    document.body.classList.remove('dark-theme');
  }
}
  
  toggleSubmenu(title: string) {
    this.openSubmenu = this.openSubmenu === title ? null : title;
  }

}

// sidebar-menu.model.ts
export interface SidebarMenu {
  title: string;
  icon?: string;
  route?: string;
  children?: SidebarMenu[];
}

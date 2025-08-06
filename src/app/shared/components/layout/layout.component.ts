import { CommonModule } from '@angular/common';
import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import { RouterLink, RouterOutlet } from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatExpansionModule } from '@angular/material/expansion';
import {MatTooltipModule} from '@angular/material/tooltip';
import { DashboardComponent } from '../../../module/dashboard/dashboard.component';
import { BarChartComponent } from '../../../module/dashboard/charts/bar-chart/bar-chart.component';
import { PieChartComponent } from '../../../module/dashboard/charts/pie-chart/pie-chart.component';
import { LineChartComponent } from '../../../module/dashboard/charts/line-chart/line-chart.component';
import { ThemeService } from '../../services/theme.service';

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
  @ViewChild(BarChartComponent) chartComponent!: BarChartComponent;
  @ViewChild(PieChartComponent) pieComponent!: PieChartComponent;
  @ViewChild(LineChartComponent!) lineComponent!: LineChartComponent;
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
  },
  {
    title: 'Library',
    icon: 'local_library',
    children: [
      { title: 'All Books', route: '/library/books' },
      { title: 'Add Book', route: '/library/add' },
      { title: 'Issue History', route: '/library/history' }
    ]
  },
  {
    title: 'Departments',
    icon: 'apartment',
    children: [
      { title: 'All Departments', route: '/departments/all' },
      { title: 'Add Department', route: '/departments/add' }
    ]
  },
  {
    title: 'Staff',
    icon: 'badge',
    children: [
      { title: 'All Staff', route: '/staff/all' },
      { title: 'Add Staff', route: '/staff/add' },
      { title: 'Staff Profile', route: '/staff/profile/1' }
    ]
  },
  {
    title: 'Holidays',
    icon: 'calendar_month',
    children: [
      { title: 'Holiday List', route: '/holidays/list' },
      { title: 'Add Holiday', route: '/holidays/add' }
    ]
  },
  {
    title: 'Fees',
    icon: 'payments',
    children: [
      { title: 'All Fees', route: '/fees/all' },
      { title: 'Add Fee Record', route: '/fees/add' },
      { title: 'Fee Status', route: '/fees/status' }
    ]
  },

  // ✅ Suggested Additions
  {
    title: 'Timetable',
    icon: 'schedule',
    route: '/timetable'
  },
  {
    title: 'Announcements',
    icon: 'campaign',
    route: '/announcements'
  },
  {
    title: 'Reports',
    icon: 'insights',
    route: '/reports'
  },
  {
    title: 'Notifications',
    icon: 'notifications',
    route: '/notifications'
  },
  {
    title: 'Admissions',
    icon: 'how_to_reg',
    route: '/admissions'
  },
  {
    title: 'Examinations',
    icon: 'assignment',
    children: [
      { title: 'Exam Schedule', route: '/exams/schedule' },
      { title: 'Exam Results', route: '/exams/results' }
    ]
  },
  {
    title: 'Attendance',
    icon: 'fact_check',
    children: [
      { title: 'Student Attendance', route: '/attendance/students' },
      { title: 'Staff Attendance', route: '/attendance/staff' }
    ]
  }
];


  constructor(private breakpointObserver: BreakpointObserver, private themeService:ThemeService) {
    this.breakpointObserver.observe([Breakpoints.Handset])
      .subscribe(result => {
        this.isSideNavOpened = !result.matches;
        this.sideNavMode = result.matches ? 'over' : 'side';
      });
  }

  toggleSideNav() {
    this.isSideNavOpened = !this.isSideNavOpened;
     setTimeout(() => {
    this.chartComponent?.resizeChart();
    this.pieComponent?.resizeChart();
    this.lineComponent?.resizeChart();
  }, 500); // delay matches sidenav animation duration
  }

  toggleTheme() {
  this.themeService.toggleTheme();
    this.isDarkTheme = this.themeService.isDark();
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

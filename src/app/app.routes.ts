import { Routes } from '@angular/router';
import { DashboardComponent } from './module/dashboard/dashboard.component';
import { EventsComponent } from './module/events/events.component';
import { ProfessorsAllComponent } from './module/professors/professors-all/professors-all.component';
import { ProfessorAddComponent } from './module/professors/professor-add/professor-add.component';
import { ProfessorEditComponent } from './module/professors/professor-edit/professor-edit.component';
import { ProfessorProfileComponent } from './module/professors/professor-profile/professor-profile.component';
import { StudentsAllComponent } from './module/students/students-all/students-all.component';
import { StudentAddComponent } from './module/students/student-add/student-add.component';
import { StudentEditComponent } from './module/students/student-edit/student-edit.component';
import { StudentProfileComponent } from './module/students/student-profile/student-profile.component';
import { CoursesAllComponent } from './module/courses/courses-all/courses-all.component';
import { CourseAddComponent } from './module/courses/course-add/course-add.component';
import { CourseEditComponent } from './module/courses/course-edit/course-edit.component';
import { CourseAboutComponent } from './module/courses/course-about/course-about.component';
import { LibraryBooksComponent } from './module/library/library-books/library-books.component';
import { LibraryAddBookComponent } from './module/library/library-add-book/library-add-book.component';
import { LibraryHistoryComponent } from './module/library/library-history/library-history.component';
import { LibraryEditBookComponent } from './module/library/library-edit-book/library-edit-book.component';
import { DepartmentsAllComponent } from './module/department/departments-all/departments-all.component';
import { DepartmentAddComponent } from './module/department/department-add/department-add.component';
import { DepartmentEditComponent } from './module/department/department-edit/department-edit.component';
import { StaffAllComponent } from './module/staff/staff-all/staff-all.component';
import { StaffAddComponent } from './module/staff/staff-add/staff-add.component';
import { StaffProfileComponent } from './module/staff/staff-profile/staff-profile.component';
import { HolidayListComponent } from './module/holiday/holiday-list/holiday-list.component';
import { HolidayAddComponent } from './module/holiday/holiday-add/holiday-add.component';
import { FeesCollectionComponent } from './module/fees/fees-collection/fees-collection.component';
import { FeeAddComponent } from './module/fees/fee-add/fee-add.component';
import { FeeReceiptComponent } from './module/fees/fee-receipt/fee-receipt.component';

export const routes: Routes = [
     { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'events', component: EventsComponent },

  // Professors
  {
    path: 'professors',
    children: [
      { path: 'all', component: ProfessorsAllComponent },
      { path: 'add', component: ProfessorAddComponent },
      { path: 'edit', component: ProfessorEditComponent },
      { path: 'profile', component: ProfessorProfileComponent }
    ]
  },

  // Students
  {
    path: 'students',
    children: [
      { path: 'all', component: StudentsAllComponent },
      { path: 'add', component: StudentAddComponent },
      { path: 'edit', component: StudentEditComponent },
      { path: 'profile', component: StudentProfileComponent }
    ]
  },

  // Courses
  {
    path: 'courses',
    children: [
      { path: 'all', component: CoursesAllComponent },
      { path: 'add', component: CourseAddComponent },
      { path: 'edit', component: CourseEditComponent },
      { path: 'about', component: CourseAboutComponent }
    ]
  },

  // Library
  {
    path: 'library',
    children: [
      { path: 'books', component: LibraryBooksComponent },
      { path: 'add', component: LibraryAddBookComponent },
      { path: 'edit', component: LibraryEditBookComponent },
      { path: 'history', component: LibraryHistoryComponent }
    ]
  },

  // Departments
  {
    path: 'departments',
    children: [
      { path: 'all', component: DepartmentsAllComponent },
      { path: 'add', component: DepartmentAddComponent },
      { path: 'edit', component: DepartmentEditComponent }
    ]
  },

  // Staff
  {
    path: 'staff',
    children: [
      { path: 'all', component: StaffAllComponent },
      { path: 'add', component: StaffAddComponent },
      { path: 'profile', component: StaffProfileComponent }
    ]
  },

  // Holidays
  {
    path: 'holidays',
    children: [
      { path: 'list', component: HolidayListComponent },
      { path: 'add', component: HolidayAddComponent }
    ]
  },

  // Fees
  {
    path: 'fees',
    children: [
      { path: 'collection', component: FeesCollectionComponent },
      { path: 'add', component: FeeAddComponent },
      { path: 'receipt', component: FeeReceiptComponent }
    ]
  }

  // // Extras
  // { path: 'timetable', component: TimetableComponent },
  // { path: 'announcements', component: AnnouncementsComponent },
  // { path: 'reports', component: ReportsComponent },
  // { path: 'notifications', component: NotificationsComponent },
  // { path: 'admissions', component: AdmissionsComponent },

  // // Exams
  // { path: 'exams/schedule', component: ExamScheduleComponent },
  // { path: 'exams/results', component: ExamResultsComponent },

  // // Attendance
  // { path: 'attendance/students', component: StudentAttendanceComponent },
  // { path: 'attendance/staff', component: StaffAttendanceComponent },

  // // Redirect and fallback
  // { path: '', redirectTo: '/dashboard-light', pathMatch: 'full' },
  // { path: '**', component: PageNotFoundComponent },
];

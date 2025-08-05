import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {MatTabsModule} from '@angular/material/tabs';
import { BarChartComponent } from './charts/bar-chart/bar-chart.component';
import { DashboardCardComponent } from './dashboard-card/dashboard-card.component';
import { SalaryStatusComponent } from './salary-status/salary-status.component';
import { PieChartComponent } from './charts/pie-chart/pie-chart.component';
import { LineChartComponent } from './charts/line-chart/line-chart.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatCardModule,
    MatGridListModule,
    MatProgressBarModule,
    MatTabsModule,
    BarChartComponent,
    DashboardCardComponent,
    SalaryStatusComponent,
    PieChartComponent,
    LineChartComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent{


  constructor() {

  }

  dashboardCards = [
  { title: 'Total Students', value: 4000, icon: 'fa-solid fa-users', color: 'primary' },
  { title: 'New Students', value: 2150, icon: 'fa-solid fa-user-plus', color: 'success' },
  { title: 'Total Course', value: 28, icon: 'fa-solid fa-book-open', color: 'info' },
  { title: 'Fees Collection', value: '$8918', icon: 'fa-solid fa-money-check-dollar', color: 'warning' }
];

chartSections = [
  { title: 'Earnings Overview', component: BarChartComponent },
  { title: 'Fees Collection Overview', component: PieChartComponent }
];

   professors = [
    {
      name: 'Angelica Ramos',
      status: 'Paid',
      date: '12 Jan 2024',
      amount: '$100',
      transactionId: '42317',
    },
    {
      name: 'Cedric Kelly',
      status: 'Unpaid',
      date: '07 Jan 2024',
      amount: '$200',
      transactionId: '13369',
    },
    {
      name: 'Bradley Greer',
      status: 'Pending',
      date: '08 Jan 2024',
      amount: '$150',
      transactionId: '25413',
    },
    {
      name: 'Rhona Davidson',
      status: 'Unpaid',
      date: '02 Jan 2024',
      amount: '$250',
      transactionId: '74125',
    },
    {
      name: 'Caesar Vance',
      status: 'Paid',
      date: '10 Jan 2024',
      amount: '$300',
      transactionId: '23654',
    },
  ];

  librarians = [
  {
    name: 'Linda Howard',
    status: 'Paid',
    date: '11 Jan 2024',
    amount: '$120',
    transactionId: '52147',
  },
  {
    name: 'Mark Jacobs',
    status: 'Pending',
    date: '06 Jan 2024',
    amount: '$90',
    transactionId: '61432',
  },
  {
    name: 'Susan Boyle',
    status: 'Unpaid',
    date: '03 Jan 2024',
    amount: '$110',
    transactionId: '83124',
  },
  {
    name: 'Robert Langdon',
    status: 'Paid',
    date: '09 Jan 2024',
    amount: '$130',
    transactionId: '35978',
  },
  {
    name: 'Emily Carter',
    status: 'Unpaid',
    date: '04 Jan 2024',
    amount: '$95',
    transactionId: '76415',
  },
];

others = [
  {
    name: 'David Miller',
    status: 'Pending',
    date: '05 Jan 2024',
    amount: '$140',
    transactionId: '45126',
  },
  {
    name: 'Jessica Lane',
    status: 'Paid',
    date: '12 Jan 2024',
    amount: '$160',
    transactionId: '98213',
  },
  {
    name: 'George Bailey',
    status: 'Unpaid',
    date: '01 Jan 2024',
    amount: '$180',
    transactionId: '67412',
  },
  {
    name: 'Sophia Turner',
    status: 'Paid',
    date: '08 Jan 2024',
    amount: '$210',
    transactionId: '54713',
  },
  {
    name: 'Henry Ford',
    status: 'Pending',
    date: '10 Jan 2024',
    amount: '$170',
    transactionId: '23864',
  },
];


}

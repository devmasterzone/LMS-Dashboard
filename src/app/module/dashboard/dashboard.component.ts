import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID, ViewChild, ViewEncapsulation } from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list'
import {MatProgressBarModule} from '@angular/material/progress-bar';


@Component({
  selector: 'app-dashboard',
  imports: [CommonModule,MatSidenavModule,MatToolbarModule,MatListModule,MatIconModule,MatCardModule,MatGridListModule,MatProgressBarModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  encapsulation:ViewEncapsulation.None
})
export class DashboardComponent {
  // @ViewChild("chart") chart!: ChartComponent;
  //  isBrowser: boolean = false;

  // constructor(@Inject(PLATFORM_ID) private platformId: Object) {
  //   this.isBrowser = isPlatformBrowser(this.platformId);
  // }

//   public chartOptions: ChartOptions = {
//   series: [
//     {
//       name: "My-series",
//       data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
//     }
//   ],
//   chart: {
//     height: 350,
//     type: "bar"
//   },
//   title: {
//     text: "My First Angular Chart"
//   },
//   xaxis: {
//     categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"]
//   }
// };

}

// export type ChartOptions = {
//   series: ApexAxisChartSeries | ApexNonAxisChartSeries;
//   chart: ApexChart;
//   xaxis: ApexXAxis;
//   title: ApexTitleSubtitle;
// };


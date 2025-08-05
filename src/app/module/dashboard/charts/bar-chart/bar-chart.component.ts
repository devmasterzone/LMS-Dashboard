import { Component, Input, ViewChild, AfterViewInit, Inject, PLATFORM_ID, ViewEncapsulation } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexPlotOptions,
  ApexResponsive,
  ApexXAxis,
  ApexLegend,
  ApexFill,
  ChartComponent,
  NgApexchartsModule
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels?: ApexDataLabels;
  plotOptions?: ApexPlotOptions;
  responsive?: ApexResponsive[];
  xaxis: ApexXAxis;
  legend?: ApexLegend;
  fill?: ApexFill;
};

@Component({
  selector: 'app-bar-chart',
  imports: [CommonModule,NgApexchartsModule],
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.scss',
  encapsulation:ViewEncapsulation.None
})
export class BarChartComponent implements AfterViewInit {
  @ViewChild('chartRef') chartRef!: ChartComponent;

  @Input() chartOptions!: Partial<ChartOptions>;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.chartOptions = {
      series: [
        {
          name: 'Income',
          data: [44, 55, 41, 67, 22, 43]
        },
        {
          name: 'Expense',
          data: [13, 23, 20, 8, 13, 27]
        },
        {
          name: 'Pending',
          data: [11, 17, 15, 15, 21, 14]
        }
      ],
      chart: {
        type: 'bar',
        height: '500',
         width: '100%',  
        stacked: true,
        toolbar: {
          show: false
        },
        zoom: {
          enabled: true
        }
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              position: 'top',
              offsetX: -10,
              offsetY: 0
            }
          }
        }
      ],
      plotOptions: {
      bar: {
          horizontal: false,
          borderRadius: 0,
          borderRadiusApplication: 'around',
          borderRadiusWhenStacked: 'last',
          columnWidth: '40%',
          barHeight: '70%',
          distributed: false,
          rangeBarOverlap: true,
          rangeBarGroupRows: false,
          hideZeroBarsWhenGrouped: false,
          isDumbbell: false,
          dumbbellColors: undefined,
          isFunnel: false,
          isFunnel3d: true,
          colors: {
              ranges: [{
                  from: 0,
                  to: 0,
                  color: undefined
              }],
              backgroundBarColors: [],
              backgroundBarOpacity: 1,
              backgroundBarRadius: 0,
          },
          dataLabels: {
              position: 'center',
              maxItems: 100,
              hideOverflowingLabels: true,
              orientation: 'vertical',
              total: {
                enabled: false,
                formatter: undefined,
                offsetX: 0,
                offsetY: 0,
                style: {
                  color: '#373d3f',
                  fontSize: '12px',
                  fontFamily: undefined,
                  fontWeight: 600
                }
              }
          }
      }
  }
  ,
      xaxis: {
        type: 'category',
        categories: [
          '201',
          '2020',
          '2021',
          '2022',
          '2023',
          '2024'
        ],
        labels: {
    rotate: -45, // ✅ Prevent overlap
    trim: true,
    hideOverlappingLabels: true
  }
      },
      legend: {
        position: 'top',
        offsetY: 0
      },
      fill: {
        opacity: 1
      }
    };
  }

 ngAfterViewInit(): void {
  if (isPlatformBrowser(this.platformId)) {
    const isDark = document.body.classList.contains('dark-theme');

    setTimeout(() => {
      this.chartRef?.updateOptions({
        chart: {
          foreColor: isDark ? '#e0e0e0' : '#333'
        },
        legend: {
          labels: {
            colors: isDark ? '#e0e0e0' : '#333'
          }
        },
        xaxis: {
          labels: {
            style: {
              colors: Array(6).fill(isDark ? '#e0e0e0' : '#333')
            }
          }
        },
        fill: {
          colors: isDark
            ? ['#6a73fa', '#00cfe8', '#ff9f43']
            : ['#4e73df', '#1cc88a', '#f6c23e']
        },
        colors: isDark
          ? ['#6a73fa', '#00cfe8', '#ff9f43']
          : ['#4e73df', '#1cc88a', '#f6c23e']
      }, false, true, true);
    });

    const container = document.querySelector('.chart-area');
    if (container) {
      new ResizeObserver(() => {
        this.resizeChart();
      }).observe(container);
    }
  }
}



  public resizeChart(): void {
    this.chartRef?.updateOptions({}, false, true, true);
  }
}
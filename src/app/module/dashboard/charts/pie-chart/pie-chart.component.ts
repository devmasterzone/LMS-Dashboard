import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, Inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { ChartComponent, NgApexchartsModule,ApexNonAxisChartSeries,ApexResponsive,
   ApexChart, ApexFill, ApexDataLabels,ApexLegend,ApexPlotOptions } from 'ng-apexcharts';
export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  fill: ApexFill;
  legend: ApexLegend;
  dataLabels: ApexDataLabels;
   plotOptions: ApexPlotOptions;
};
@Component({
  selector: 'app-pie-chart',
  imports: [NgApexchartsModule,CommonModule],
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.scss'
})
export class PieChartComponent implements AfterViewInit{
  @ViewChild('chartRef') chartRef!: ChartComponent;
 @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
public feesCollection = [
  { name: 'Tuition Fee', value: 120000 },
  { name: 'Library Fee', value: 15000 },
  { name: 'Lab Fee', value: 10000 },
  { name: 'Sports Fee', value: 8000 },
  { name: 'Transport Fee', value: 20000 }
];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
const series = this.feesCollection.map(fee => fee.value);
const labels = this.feesCollection.map(fee => fee.name);

this.chartOptions = {
  series,
  labels,
  chart: {
    type: "donut",
    height: '500',
    width: '100%',
    toolbar: { show: false },
    zoom: { enabled: true }
  },
  dataLabels: {
    enabled: true,
    formatter: function (val: number) {
      return val.toFixed(1) + "%";
    }
  },
  fill: {
    type: "gradient"
  },
  legend: {
    show: true,
    position: "top",
    formatter: function (val, opts) {
      return val + " - ₹" + opts.w.globals.series[opts.seriesIndex];
    }
  },
  plotOptions: {
    pie: {
      donut: {
        size: '50%',
        labels: {
          show: true,
          name: {
            show: true,
            fontSize: '18px',
            fontWeight: 600
          },
          value: {
            show: true,
            fontSize: '16px',
            fontWeight: 400
          },
          total: {
            show: true,
            label: 'Total',
            formatter: function (w) {
              return "₹" + w.globals.seriesTotals.reduce((a: number, b: number) => a + b, 0);
            }
          }
        }
      }
    }
  },
  responsive: [
    {
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: "top"
        }
      }
    }
  ]
};



  }
    ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const observer = new ResizeObserver(() => {
        this.chartRef?.updateOptions({}, false, true, true);
      });

      const container = document.querySelector('.chart-area');
      if (container) {
        observer.observe(container);
      }
    }
  }

  public resizeChart(): void {
    this.chartRef?.updateOptions({}, false, true, true);
  }
}

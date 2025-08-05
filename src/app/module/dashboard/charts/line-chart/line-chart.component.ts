import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, Inject, PLATFORM_ID, ViewChild } from '@angular/core';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexStroke,
  ApexMarkers,
  ApexYAxis,
  ApexGrid,
  ApexTitleSubtitle,
  ApexLegend,
  NgApexchartsModule
} from "ng-apexcharts";
export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  markers: ApexMarkers;
  colors: string[];
  yaxis: ApexYAxis;
  grid: ApexGrid;
  legend: ApexLegend;
  title: ApexTitleSubtitle;
};
@Component({
  selector: 'app-line-chart',
  imports: [NgApexchartsModule,CommonModule],
  templateUrl: './line-chart.component.html',
  styleUrl: './line-chart.component.scss'
})
export class LineChartComponent implements AfterViewInit{
  @ViewChild('chartRef') chartRef!: ChartComponent;
@ViewChild("chart") chart!: ChartComponent;


  public chartOptions: Partial<ChartOptions>;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
this.chartOptions = {
  series: [
    {
      name: "Engineering",
      data: [30, 88, 70, 86, 90, 50, 89]
    },
    {
      name: "Arts",
      data: [78, 80, 50, 79, 81, 60, 70]
    },
    {
      name: "Science",
      data: [82, 55, 79, 45, 87, 88, 60]
    }
  ],
  chart: {
    height: 500,
    type: "line",
    dropShadow: {
      enabled: true,
      color: "#000",
      top: 10,
      left: 5,
      blur: 5,
      opacity: 0.2
    },
    toolbar: {
      show: false
    }
  },
  colors: ["#1E40AF", "#10B981", "#F59E0B"], // blue, green, amber
  dataLabels: {
    enabled: true
  },
  stroke: {
    curve: "smooth"
  },
  title: {
    text: "",
    align: "left",
    margin: 20,
    style: {
      fontSize: "16px",
      fontWeight: "bold",
      color: "#111827"
    }
  },
  grid: {
     borderColor: this.isDarkTheme ? "#ff0000" : "#e5e7eb",
    row: {
       colors: this.isDarkTheme ? ["#ff0000", "transparent"] : ["#f9fafb", "transparent"],
      opacity: 0.5
    }
  },
  markers: {
    size: 4
  },
  xaxis: {
    categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    title: {
      text: "Month",
      style: {
        color: "#374151",
        fontSize: "14px",
        fontWeight: 600
      }
    },
    labels: {
      style: {
        colors: "#6B7280"
      }
    }
  },
  yaxis: {
    title: {
      text: "% Satisfaction",
      style: {
        color: "#374151",
        fontSize: "14px",
        fontWeight: 600
      }
    },
    labels: {
      style: {
        colors: "#6B7280"
      }
    },
    min: 10,
    max: 100
  },
  legend: {
    show: true,
    position: "top",
    horizontalAlign: "center",
    floating: false,
    fontSize: "13px"
  }
};


  }
  get isDarkTheme(): boolean {
  return isPlatformBrowser(this.platformId) && document.body.classList.contains('dark-theme');
}
updateThemeBasedChart(): void {
  if (isPlatformBrowser(this.platformId)) {
    this.chartRef?.updateOptions({
      grid: {
        borderColor: this.isDarkTheme ? "#374151" : "#e5e7eb",
        row: {
          colors: this.isDarkTheme ? ["#1f2937", "transparent"] : ["#f9fafb", "transparent"],
          opacity: 0.5
        }
      }
    }, false, true);
  }
}

   ngAfterViewInit(): void {
  if (isPlatformBrowser(this.platformId)) {
    // ✅ Watch for class changes on body (e.g., dark-theme toggle)
    const mutationObserver = new MutationObserver(() => this.updateThemeBasedChart());
    mutationObserver.observe(document.body, {
      attributes: true,
      attributeFilter: ['class']
    });

    // ✅ Optional: resize observer for chart container
    const resizeObserver = new ResizeObserver(() => {
      this.chartRef?.updateOptions({}, false, true, true);
    });

    const container = document.querySelector('.chart-area');
    if (container) {
      resizeObserver.observe(container);
    }
  }
}


  public resizeChart(): void {
    this.chartRef?.updateOptions({}, false, true, true);
  }
}

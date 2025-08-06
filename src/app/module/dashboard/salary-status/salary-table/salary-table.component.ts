import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  Component,
  ElementRef,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  Renderer2,
  ViewEncapsulation
} from '@angular/core';

@Component({
  selector: 'app-salary-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './salary-table.component.html',
  styleUrl: './salary-table.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class SalaryTableComponent implements OnInit, OnDestroy {
  @Input() data: any[] = [];
  themeClass = 'table-light'; // Default
  private mutationObserver!: MutationObserver;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.updateThemeClass(); // Initial check

      // Observe body class changes
      this.mutationObserver = new MutationObserver(() => {
        this.updateThemeClass();
      });

      this.mutationObserver.observe(document.body, {
        attributes: true,
        attributeFilter: ['class']
      });
    }
  }

  updateThemeClass(): void {
    const isDark = document.body.classList.contains('dark-theme');
    this.themeClass = isDark ? 'table-dark' : 'table-light';
  }

  ngOnDestroy(): void {
    if (this.mutationObserver) {
      this.mutationObserver.disconnect();
    }
  }
}

import { Directive, ElementRef, Input, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[appCountUp]'
})
export class CountUpDirective implements OnInit {
  @Input('appCountUp') endValue!: number;
  @Input() duration: number = 2000;

  constructor(
    private el: ElementRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.animateCount();
    } else {
      // On server, just set final value
      this.el.nativeElement.textContent = `${this.endValue}+`;
    }
  }

  animateCount() {
    let start = 0;
    const startTime = performance.now();

    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      let progress = Math.min(elapsed / this.duration, 1);

      // Easing (easeOutCubic)
      progress = 1 - Math.pow(1 - progress, 3);

      const currentValue = Math.floor(progress * this.endValue);
      this.el.nativeElement.textContent = currentValue;

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        this.el.nativeElement.textContent = `${this.endValue}+`;
      }
    };

    requestAnimationFrame(step);
  }
}

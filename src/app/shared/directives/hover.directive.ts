import { Directive, HostListener, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[appHover]'
})
export class HoverDirective {
  @Output() hover = new EventEmitter<boolean>();

  @HostListener('mouseenter') onMouseEnter() {
    this.hover.emit(true);
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.hover.emit(false);
  }
}

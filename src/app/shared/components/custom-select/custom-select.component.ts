import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ClickOutsideDirective } from '../../directives/click-outside.directive';

@Component({
  selector: 'app-custom-select',
  imports: [CommonModule,ClickOutsideDirective],
  templateUrl: './custom-select.component.html',
  styleUrl: './custom-select.component.scss',
})
export class CustomSelectComponent {
  @Input() label: string = 'Select';
  @Input() options: { value: string; label: string }[] = [];
  @Input() placeholder: string = 'Choose...';
  @Input() selectedValue: string | null = null;

  @Output() valueChange = new EventEmitter<string>();
  @Output() selectedValueChange = new EventEmitter<string>();

  @ViewChild('selectButton') selectButton!: ElementRef;

  dropdownOpen = false;
  dropUp = false; // 👈 flag for drop direction

  toggleDropdown() {
    if (!this.dropdownOpen) {
      this.checkDropdownDirection();
    }
    this.dropdownOpen = !this.dropdownOpen;
  }

  selectOption(option: { value: string; label: string }) {
    this.selectedValue = option.value;
    this.valueChange.emit(option.value);
    this.dropdownOpen = false;
  }

  get selectedLabel(): string {
    if (!this.selectedValue) return this.placeholder;
    const found = this.options.find(o => o.value === this.selectedValue);
    return found ? found.label : this.placeholder;
  }

  closeDropdown() {
    this.dropdownOpen = false;
  }

  onSelect(value: string) {
    this.selectedValue = value;
    this.selectedValueChange.emit(value);
  }

  private checkDropdownDirection() {
    const buttonRect = this.selectButton.nativeElement.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    const spaceBelow = viewportHeight - buttonRect.bottom;
    const spaceAbove = buttonRect.top;

    // 👇 pick direction based on more available space
    this.dropUp = spaceBelow < 200 && spaceAbove > spaceBelow;
  }
}
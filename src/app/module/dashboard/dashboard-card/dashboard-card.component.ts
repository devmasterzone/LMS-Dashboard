import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dashboard-card',
  imports: [CommonModule],
  templateUrl: './dashboard-card.component.html',
  styleUrl: './dashboard-card.component.scss'
})
export class DashboardCardComponent {
@Input() title!: string;
  @Input() value!: string | number;
  @Input() icon!: string;
  @Input() borderColor!: string;
  @Input() textColor!: string;
}

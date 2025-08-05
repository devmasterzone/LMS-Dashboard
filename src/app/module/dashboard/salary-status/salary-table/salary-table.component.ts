import { CommonModule } from '@angular/common';
import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-salary-table',
  imports: [CommonModule],
  templateUrl: './salary-table.component.html',
  styleUrl: './salary-table.component.scss',
  encapsulation:ViewEncapsulation.None
})
export class SalaryTableComponent {
   @Input() data: any[] = [];
}

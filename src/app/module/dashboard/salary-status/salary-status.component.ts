import { CommonModule } from '@angular/common';
import { Component, Input, ViewEncapsulation } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { SalaryTableComponent } from './salary-table/salary-table.component';

@Component({
  selector: 'app-salary-status',
  imports: [CommonModule,MatTabsModule,SalaryTableComponent],
  templateUrl: './salary-status.component.html',
  styleUrl: './salary-status.component.scss',
  encapsulation:ViewEncapsulation.None
})
export class SalaryStatusComponent {
@Input() professors: any[] = [];
  @Input() librarians: any[] = [];
  @Input() others: any[] = [];
}

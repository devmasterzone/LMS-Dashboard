import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table-header',
  imports: [CommonModule,MatIconModule,FormsModule],
  templateUrl: './table-header.component.html',
  styleUrl: './table-header.component.scss',
  encapsulation:ViewEncapsulation.None
})
export class TableHeaderComponent {
  @Input() searchTerm: string = '';
  @Input() pageSize: number = 10;
  @Input() pageSizeOptions: number[] = [5, 10, 20, 50];
  @Input() routeurl: string = '';

  @Output() pageSizeChange = new EventEmitter<number>();
  @Output() searchTermChange = new EventEmitter<string>();

  constructor(private router: Router) {}
   goToAddPage(): void {
    if (this.routeurl) {
      this.router.navigate([this.routeurl]);
    }
  }

}

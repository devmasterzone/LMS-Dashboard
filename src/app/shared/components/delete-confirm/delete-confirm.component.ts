import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-delete-confirm',
  imports: [CommonModule,MatDialogModule,MatIconModule],
  templateUrl: './delete-confirm.component.html',
  styleUrl: './delete-confirm.component.scss'
})
export class DeleteConfirmComponent {
constructor(
    public dialogRef: MatDialogRef<DeleteConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  getIcon(): string {
    switch (this.data.type) {
      case 'success': return 'check_circle';
      case 'warning': return 'warning';
      case 'info': return 'info';
      case 'delete': return 'close';
      default: return 'help';
    }
  }

  getColor(): string {
    switch (this.data.type) {
      case 'success': return 'primary';
      case 'warning': return 'warn';
      case 'info': return 'primary';
      case 'delete': return 'warn';
      default: return 'primary';
    }
  }

  onConfirm() {
    this.dialogRef.close(true);
  }

  onCancel() {
    this.dialogRef.close(false);
  }
}

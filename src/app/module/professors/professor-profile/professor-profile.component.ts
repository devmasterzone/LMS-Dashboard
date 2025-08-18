import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBar } from '@angular/material/progress-bar';

@Component({
  selector: 'app-professor-profile',
  imports: [CommonModule,MatIconModule],
  templateUrl: './professor-profile.component.html',
  styleUrl: './professor-profile.component.scss'
})
export class ProfessorProfileComponent {
activeTab: string = 'overview'; // default tab

  setTab(tab: string) {
    this.activeTab = tab;
  }
}

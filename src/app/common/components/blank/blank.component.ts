import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-blank',
  standalone: true,
  imports: [CommonModule, RouterModule, SharedModule,],
  templateUrl: './blank.component.html',
  styleUrl: './blank.component.css',
})
export class BlankComponent {
  @Input() title: string = '';
  @Input() sectionTitle: string = '';
}

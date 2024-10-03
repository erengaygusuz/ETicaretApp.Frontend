import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../common/shared/shared.module';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Page } from '../../base/page';


@Component({
  selector: 'app-layouts',
  standalone: true,
  imports: [SharedModule, NavbarComponent, RouterOutlet],
  templateUrl: './layouts.component.html',
  styleUrl: './layouts.component.css',
})
export class LayoutsComponent extends Page {
  constructor(translate: TranslateService) {
    super(translate);
  }
}

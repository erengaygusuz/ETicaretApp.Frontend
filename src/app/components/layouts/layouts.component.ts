import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../common/shared/shared.module';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, '/i18n/', '.json');
}

@Component({
  selector: 'app-layouts',
  standalone: true,
  imports: [SharedModule, NavbarComponent, RouterOutlet],
  templateUrl: './layouts.component.html',
  styleUrl: './layouts.component.css',
})
export class LayoutsComponent implements OnInit {
  constructor(public translate: TranslateService) {}

  ngOnInit(): void {
    const defaultLang = localStorage.getItem('language') || 'tr-TR';
    this.translate.setDefaultLang(defaultLang);
    this.translate.use(defaultLang);
  }
  changeLanguage(lang: string) {
    this.translate.use(lang);
    localStorage.setItem('language', lang);
  }
}

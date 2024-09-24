import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../common/shared/shared.module';
import { BasketService } from '../../baskets/services/basket.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, '/i18n/', '.json');
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  constructor(
    public _basket: BasketService,
    private _router: Router,
    public translate: TranslateService
  ) {}
  languages = ['tr-TR', 'en-US'];
  defaultLang = '';
  ngOnInit(): void {
    const defaultLang = localStorage.getItem('language') || 'tr-TR';
    this.translate.setDefaultLang(defaultLang);
    this.translate.use(defaultLang);
  }
  changeLanguage(lang: string) {
    this.defaultLang = lang;
    this.translate.use(lang);
    localStorage.setItem('language', lang);
  }

  logOut() {
    this._router.navigateByUrl('/login');
  }
}

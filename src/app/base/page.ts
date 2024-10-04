import { TranslateService } from '@ngx-translate/core';
import { environment } from '../../environments/environment';

export abstract class Page {
  imgUrl: string;
  defaultLang: string;
  constructor(public translate: TranslateService) {
    this.languageConfiguration();
    this.setImageUrl();
  }

  languageConfiguration(): void {
    this.defaultLang = localStorage.getItem('language') || 'tr-TR';
    this.translate.setDefaultLang(this.defaultLang);
    this.translate.use(this.defaultLang);
  }

  setImageUrl(): void {
    this.imgUrl = environment.imgUrl;
    console.log(this.imgUrl);
  }

  changeLanguage(lang: string) {
    this.translate.use(lang);
    localStorage.setItem('language', lang);
    this.defaultLang = lang;
  }
}

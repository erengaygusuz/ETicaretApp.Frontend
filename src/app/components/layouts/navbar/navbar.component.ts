import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../common/shared/shared.module';
import { BasketService } from '../../baskets/services/basket.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Page } from '../../../base/page';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent extends Page {
  constructor(
    public _basket: BasketService,
    private _router: Router,
    translate: TranslateService
  ) {
    super(translate);
  }
  languages = ['tr-TR', 'en-US'];
  logOut() {
    this._router.navigateByUrl('/login');
  }
}

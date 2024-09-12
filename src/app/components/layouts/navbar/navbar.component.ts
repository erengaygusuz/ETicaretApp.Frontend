import { Component } from '@angular/core';
import { SharedModule } from '../../../common/shared/shared.module';
import { BasketService } from '../../baskets/services/basket.service';
import { Router, RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  constructor(public _basket: BasketService, private _router: Router) {
    this._basket.getCount();
  }

  logOut() {
    this._router.navigateByUrl('/login');
  }
}

import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { SharedModule } from '../../../../common/shared/shared.module';
import { OrderModel } from '../../models/order.model';
import { TranslateService } from '@ngx-translate/core';
import { Page } from '../../../../base/page';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css',
})
export class OrdersComponent extends Page implements OnInit {
  orders: OrderModel[] = [];

  constructor(private _order: OrderService, translate: TranslateService) {
    super(translate);
  }
  ngOnInit(): void {
    this._order.getAll((res) => (this.orders = res));
  }
}

import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { SharedModule } from '../../../../common/shared/shared.module';
import { OrderModel } from '../../models/order.model';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css',
})
export class OrdersComponent implements OnInit {
  orders: OrderModel[] = [];

  constructor(private _order: OrderService) {}
  ngOnInit(): void {
    this._order.getAll((res) => (this.orders = res));
  }
}

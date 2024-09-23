import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../../common/shared/shared.module';
import { ToastrService } from 'ngx-toastr';
import { SwalService } from '../../../../common/services/swal.service';
import { BasketService } from '../../services/basket.service';
import { BasketModel } from '../../models/basket.model';
import { OrderService } from '../../../orders/services/order.service';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateService } from '@ngx-translate/core';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, '/i18n/', '.json');
}

@Component({
  selector: 'app-basket',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.css',
})
export class BasketComponent implements OnInit {
  baskets: BasketModel[] = [];
  sum: number = 0;

  constructor(
    private _basket: BasketService,
    private _toastr: ToastrService,
    private _swal: SwalService,
    private _order: OrderService,
    public translate: TranslateService
  ) {}
  ngOnInit(): void {
    this.getAll();

    const defaultLang = localStorage.getItem('language') || 'tr';
    this.translate.setDefaultLang(defaultLang);
    this.translate.use(defaultLang);
  }

  changeLanguage(lang: string) {
    this.translate.use(lang);
    localStorage.setItem('language', lang);
  }

  getAll() {
    this._basket.getAll((res) => {
      this.baskets = res;
      this.calculate();
    });
  }

  calculate() {
    this.sum = 0;
    this.baskets.forEach((element) => {
      this.sum += element.price * element.quantity;
    });
  }

  removeById(_id: string) {
    this.translate
      .get(['basket.confirmRemove', 'basket.removeProduct', 'basket.remove'])
      .subscribe((translations) => {
        this._swal.callSwal(
          translations['basket.confirmRemove'],
          translations['basket.removeProduct'],
          translations['basket.remove'],
          () => {
            let model = { _id: _id };
            this._basket.removeById(model, (res) => {
              this._toastr.info(res.message);
              this.getAll();
            });
          }
        );
      });
  }

  createOrder() {
    this.translate
      .get([
        'basket.confirmPurchase',
        'basket.purchaseProducts',
        'basket.makePayment',
      ])
      .subscribe((translations) => {
        this._swal.callSwal(
          translations['basket.confirmPurchase'],
          translations['basket.purchaseProducts'],
          translations['basket.makePayment'],
          () => {
            this._order.create((res) => {
              this._toastr.success(res.message);
              this.getAll();
            });
          }
        );
      });
  }
}

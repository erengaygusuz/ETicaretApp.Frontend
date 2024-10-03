import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../common/shared/shared.module';
import { CategoryModel } from '../categories/models/category.model';
import { CategoryService } from '../categories/services/category.service';
import { RequestModel } from '../../common/models/request.model';
import { ProductService } from '../products/services/product.service';
import { ProductModel } from '../products/models/product.model';
import { BasketModel } from '../baskets/models/basket.model';
import { BasketService } from '../baskets/services/basket.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { Page } from '../../base/page';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent extends Page implements OnInit {
  categories: CategoryModel[] = [];
  products: ProductModel[] = [];
  request: RequestModel = new RequestModel();

  constructor(
    private _category: CategoryService,
    private _product: ProductService,
    private _basket: BasketService,
    private _toastr: ToastrService,
    translate: TranslateService
  ) {
    super(translate);
  }

  ngOnInit(): void {
    this.getCategories();
    this.getAll();
  }
  // ürün işlemleri

  getAll() {
    this._product.getAllForHomePage(
      this.request,
      (res) => (this.products = res)
    );
  }

  // kategori işlemleri

  getCategories() {
    this._category.getAll((res) => (this.categories = res));
  }

  changeCategory(categoryId: string, categoryName: string) {
    this.request.categoryName = categoryName;
    this.request.categoryId = categoryId;
    this.getAll();
  }

  // sepet işlemleri

  addBasket(productId: string, price: number) {
    let model = new BasketModel();
    model.productId = productId;
    model.price = price;
    model.quantity = 1;
    this._basket.add(model, (res) => {
      this._toastr.success(res.message);
      this.getAll();
    });
  }
}

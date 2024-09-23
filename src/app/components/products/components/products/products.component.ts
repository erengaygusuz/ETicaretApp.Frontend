import { Component, OnInit } from '@angular/core';
import { PaginationResultModel } from '../../../../common/models/pagination-result.model';
import { ProductModel } from '../../models/product.model';
import { RequestModel } from '../../../../common/models/request.model';
import { ProductService } from '../../services/product.service';
import { SwalService } from '../../../../common/services/swal.service';
import { ToastrService } from 'ngx-toastr';
import { SharedModule } from '../../../../common/shared/shared.module';
import { TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, '/i18n/', '.json');
}

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  result: PaginationResultModel<ProductModel[]> = new PaginationResultModel<
    ProductModel[]
  >();
  request: RequestModel = new RequestModel();
  pageNumbers: number[] = [];
  product: ProductModel = new ProductModel();

  constructor(
    private _product: ProductService,
    private _swal: SwalService,
    private _toastr: ToastrService,
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

  // ürünlerin sayfalanmış listesini alır
  getAll(pageNumber = 1) {
    this.request.pageNumber = pageNumber;
    this._product.getAll(this.request, (res) => {
      this.result = res;
      this.setPageNumbers();
    });
  }
  //mevcut sayfa numarasına göre gösterilecek sayfa numaralarını hesaplar ve bu sayfaları kullanıcı arayüzünde göstermek üzere pageNumbers dizisine ekler.
  setPageNumbers() {
    const startPage = Math.max(1, this.result.pageNumber - 2);
    const endPage = Math.min(
      this.result.totalPageCount,
      this.result.pageNumber + 2
    );
    this.pageNumbers = [];
    for (let i = startPage; i <= endPage; i++) {
      this.pageNumbers.push(i);
    }
  }

  search() {
    if (this.request.search.length >= 3) {
      this.getAll(1);
    }
  }

  removeById(id: string) {
    this._swal.callSwal(
      this.translate.instant('products.confirmDelete'),
      this.translate.instant('products.deleteProduct'),
      this.translate.instant('products.deleteButton'),
      () => {
        let model = { _id: id };
        this._product.removeById(model, (res) => {
          this._toastr.info(
            this.translate.instant('product.deleted', { message: res.message })
          );
          this.getAll(this.request.pageNumber);
        });
      }
    );
  }

  changeProductStatus(id: string) {
    let model = { _id: id };
    this._product.changeActiveStatus(model, (res) => {
      this._toastr.info(res.message);
      this.getAll(this.request.pageNumber);
    });
  }
}

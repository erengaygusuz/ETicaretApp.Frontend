import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../../common/shared/shared.module';
import { NgForm } from '@angular/forms';
import { CategoryService } from '../../../categories/services/category.service';
import { CategoryModel } from '../../../categories/models/category.model';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateService } from '@ngx-translate/core';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, '/i18n/', '.json');
}

@Component({
  selector: 'app-product-add',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './product-add.component.html',
  styleUrl: './product-add.component.css',
})
export class ProductAddComponent implements OnInit {
  categories: CategoryModel[] = [];
  images: File[] = [];
  imageUrls: any[] = [];

  constructor(
    private _category: CategoryService,
    private _toastr: ToastrService,
    private _product: ProductService,
    private _router: Router,
    public translate: TranslateService
  ) {}
  ngOnInit(): void {
    this.getCategories();

    const defaultLang = localStorage.getItem('language') || 'tr';
    this.translate.setDefaultLang(defaultLang);
    this.translate.use(defaultLang);
  }

  changeLanguage(lang: string) {
    this.translate.use(lang);
    localStorage.setItem('language', lang);
  }

  getCategories() {
    this._category.getAll((res) => (this.categories = res));
  }

  getImages(event: any) {
    const file: File[] = Array.from(event.target.files);
    this.images.push(...file);

    for (let i = 0; i < event.target.files.length; i++) {
      const element = event.target.files[i];

      const reader = new FileReader();
      reader.readAsDataURL(element);

      reader.onload = () => {
        const imageUrl = reader.result as string;
        this.addImage(imageUrl, file);
      };
    }
  }

  addImage(imageUrl: string, file: any) {
    this.imageUrls.push({
      imageUrl: imageUrl,
      name: file.name,
      size: file.size,
    });
  }

  add(form: NgForm) {
    if (form.value['categoriesSelect'].length == 0) {
      this._toastr.error('Kategori seçimi yapmadınız!');
      return;
    }

    if (form.valid) {
      let product = form.value; //Formdan alınan veriler product değişkenine atanır.
      let categories: string[] = product['categoriesSelect'];
      let name = product['name'];
      let price = product['price'];
      let stock = product['stock'];
      price = price.toString().replace(',', '.');

      // resim veya dosya ekleyeceksek mutlaka form datayla almamız gerekir.

      //Bir FormData nesnesi oluşturulur. Bu nesne, dosya yükleme ve form verilerini göndermek için kullanılır
      let formData = new FormData();
      formData.append('name', name);
      formData.append('stock', stock);
      formData.append('price', price);

      for (const category of categories) {
        formData.append('categories', category);
      }
      for (const image of this.images) {
        formData.append('images', image, image.name);
      }

      this._product.add(formData, (res) => {
        this._toastr.success(res.message);
        form.reset();
        this.imageUrls = [];
      });
    }
  }

  removeImage(name: string, size: number, index: number) {
    this.imageUrls.splice(index, 1);
    let i = this.images.findIndex((p) => p.name == name && p.size == size);
    this.images.splice(i, 1);
  }
}

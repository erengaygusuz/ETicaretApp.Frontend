import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../common/shared/shared.module';
import { CategoryModel } from './models/category.model';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from './services/category.service';
import { NgForm } from '@angular/forms';
import { SwalService } from '../../common/services/swal.service';
import { CategoryPipe } from './pipes/category.pipe';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Page } from '../../base/page';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [SharedModule, CategoryPipe],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent extends Page implements OnInit {
  categories: CategoryModel[] = [];
  updateCategory: CategoryModel = new CategoryModel();
  search: string = '';

  constructor(
    private _toastr: ToastrService,
    private _category: CategoryService,
    private _swal: SwalService,
    translate: TranslateService
  ) {
    super(translate);
  }

  ngOnInit(): void {
    this.getAll();
  }
  getAll() {
    this._category.getAll((res) => (this.categories = res));
  }

  add(form: NgForm) {
    if (form.valid) {
      this._category.add(form.controls['name'].value, (res) => {
        this._toastr.success(res.message);
        let element = document.getElementById('addModalCloseBtn');
        element?.click();
        form.reset();
        this.getAll();
      });
    }
  }
  //model nesnesindeki tüm özellikler yeni bir nesneye (updateCategory) kopyalanıyor.
  get(model: CategoryModel) {
    this.updateCategory = { ...model };
  }

  update(form: NgForm) {
    if (form.valid) {
      this._category.update(this.updateCategory, (res) => {
        this._toastr.warning(res.message);
        this.getAll();
        let element = document.getElementById('updateModalCloseBtn');
        element?.click();
      });
    }
  }
  removeById(model: CategoryModel) {
    this._swal.callSwal(
      this.translate.instant('categories.confirmDelete', { name: model.name }),
      '',
      this.translate.instant('categories.deleteButton'),
      () => {
        this._category.removeById(model._id, (res) => {
          this._toastr.info(
            this.translate.instant('categories.deleted', {
              message: res.message,
            })
          );
          this.getAll();
        });
      }
    );
  }
}

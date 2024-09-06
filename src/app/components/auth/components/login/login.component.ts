import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { LoginModel } from '../../models/login.model';
import { AuthService } from '../../services/auth.service';
import { SharedModule } from '../../../../common/shared/shared.module';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(
    private _auth: AuthService,
    private _toastr: ToastrService,
    private _router: Router
  ) {}

  login(form: NgForm) {
    if (form.valid) {
      let model = new LoginModel();
      model.email = form.controls['email'].value;
      model.password = form.controls['password'].value;

      this._auth.login(model, (res) => {
        this._toastr.success('Giriş Başarılı');

        // aldığımız tokenı depoluyoruz.
        localStorage.setItem('token', res.token);
        // gelen userı string formatına çevirip depoluyoruz.
        localStorage.setItem('user', JSON.stringify(res.user));
        this._router.navigateByUrl('/');
      });
    }
  }
}

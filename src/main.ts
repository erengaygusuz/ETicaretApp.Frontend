import { CommonModule } from '@angular/common';
import { importProvidersFrom } from '@angular/core';
import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';
import { provideRouter, RouterModule } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { routes } from './app/router';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    importProvidersFrom(
      BrowserModule,
      CommonModule,
      BrowserAnimationsModule,
      SweetAlert2Module,
      NgxSpinnerModule,
      ToastrModule.forRoot({
        closeButton: true,
        progressBar: true,
      }),
      RouterModule.forRoot(routes)
    ),
  ],
});

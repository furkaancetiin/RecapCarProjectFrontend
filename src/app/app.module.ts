import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import localeTr from '@angular/common/locales/Tr';
import { NgxMaskModule,IConfig } from 'ngx-mask';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarComponent } from './components/car/car.component';
import { BrandComponent } from './components/brand/brand.component';
import { ColorComponent } from './components/color/color.component';
import { CustomerComponent } from './components/customer/customer.component';
import { NaviComponent } from './components/navi/navi.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { RentalDetailComponent } from './components/rental-detail/rental-detail.component';
import { CarFilterPipe } from './pipes/car-filter.pipe';
import { BrandFilterPipe } from './pipes/brand-filter.pipe';
import { ColorFilterPipe } from './pipes/color-filter.pipe';
import { FilterBarComponent } from './components/filter-bar/filter-bar.component';
import { LoginComponent } from './components/auth/login/login.component'; 
import { RegisterComponent } from './components/auth/register/register.component';

import { ToastrModule } from 'ngx-toastr';
import { CartSummaryComponent } from './components/cart-summary/cart-summary.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { CartComponent } from './components/cart/cart.component';
import { FooterComponent } from './components/footer/footer.component';
import { PaymentComponent } from './components/payment/payment.component';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { PaymentCompletedComponent } from './components/payment-completed/payment-completed.component';
import { BrandAddComponent } from './components/management/brand-add/brand-add.component';
import { ColorAddComponent } from './components/management/color-add/color-add.component';
import { CarAddComponent } from './components/management/car-add/car-add.component';
import { CarManagementComponent } from './components/management/car-management/car-management.component';
import { BrandManagementComponent } from './components/management/brand-management/brand-management.component';
import { ColorManagementComponent } from './components/management/color-management/color-management.component';
import { BrandUpdateComponent } from './components/management/brand-update/brand-update.component';
import { CarUpdateComponent } from './components/management/car-update/car-update.component';
import { ColorUpdateComponent } from './components/management/color-update/color-update.component';
import { RentalComponent } from './components/rental/rental.component';
import { MyProfileComponent } from './components/user/my-profile/my-profile.component';


export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;
registerLocaleData(localeTr);

@NgModule({
  declarations: [
    AppComponent,
    CarComponent,
    BrandComponent,    
    ColorComponent,
    CustomerComponent,
    NaviComponent,
    CarDetailComponent,
    RentalDetailComponent,
    CarFilterPipe,
    BrandFilterPipe,
    ColorFilterPipe,
    FilterBarComponent,    
    LoginComponent,    
    CartSummaryComponent,
    CartComponent,
    FooterComponent,
    PaymentComponent,
    RegisterComponent,
    PaymentCompletedComponent,
    BrandAddComponent,
    ColorAddComponent,
    CarAddComponent,
    CarManagementComponent,
    BrandManagementComponent,
    ColorManagementComponent, 
    BrandUpdateComponent, CarUpdateComponent, ColorUpdateComponent, RentalComponent, MyProfileComponent,
  ],

  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxMaskModule.forRoot(),
    ReactiveFormsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
    }),
  ],

  providers: [
    { provide: LOCALE_ID, useValue: 'tr-TR' },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

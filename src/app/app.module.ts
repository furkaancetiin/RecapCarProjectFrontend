import { NgModule,LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import localeTr from '@angular/common/locales/Tr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarComponent } from './components/car/car.component';
import { BrandComponent } from './components/brand/brand.component';
import { RentalComponent } from './components/rental/rental.component';
import { ColorComponent } from './components/color/color.component';
import { CustomerComponent } from './components/customer/customer.component';
import { NaviComponent } from './components/navi/navi.component';
import { CarDetailComponent } from './components/cardetail/car-detail.component';
import { RentalDetailComponent } from './components/rental-detail/rental-detail.component';
import { CarFilterPipe } from './pipes/car-filter.pipe';
import { BrandFilterPipe } from './pipes/brand-filter.pipe';
import { ColorFilterPipe } from './pipes/color-filter.pipe';
import { FilterBarComponent } from './components/filter-bar/filter-bar.component';
import { AuthLayoutComponent } from './components/auth/auth-layout/auth-layout.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { LoginComponent } from './components/auth/login/login.component';

import { ToastrModule } from 'ngx-toastr';
import { CartSummaryComponent } from './components/cart-summary/cart-summary.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { CartComponent } from './components/cart/cart.component';
import { FooterComponent } from './components/footer/footer.component';

registerLocaleData(localeTr);

@NgModule({
  declarations: [
    AppComponent, 
    CarComponent,
    BrandComponent,
    RentalComponent,
    ColorComponent,
    CustomerComponent,
    NaviComponent,   
    CarDetailComponent, 
    RentalDetailComponent, 
    CarFilterPipe, 
    BrandFilterPipe, 
    ColorFilterPipe, 
    FilterBarComponent,
    AuthLayoutComponent,
    LoginComponent,
    RegisterComponent,
    CartSummaryComponent,
    CartComponent,
    FooterComponent 
        
  ],

  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,  
    HttpClientModule,   
    FormsModule,
    ReactiveFormsModule,    
    ToastrModule.forRoot({
      positionClass:"toast-bottom-right"
    }) 
  ],
  
  providers: [{ provide: LOCALE_ID, useValue: 'tr-TR'},{provide:HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }

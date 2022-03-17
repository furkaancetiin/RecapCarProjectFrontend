import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarComponent } from './components/car/car.component';
import { BrandComponent } from './components/brand/brand.component';
import { RentalComponent } from './components/rental/rental.component';
import { ColorComponent } from './components/color/color.component';
import { CustomerComponent } from './components/customer/customer.component';
import { NaviComponent } from './components/navi/navi.component';
import { CarDetailComponent } from './components/cardetail/cardetail.component';
import { RentalDetailComponent } from './components/rentaldetail/rentaldetail.component';
import { CarFilterPipe } from './pipes/car-filter.pipe';
import { BrandFilterPipe } from './pipes/brand-filter.pipe';
import { ColorFilterPipe } from './pipes/color-filter.pipe';
import { FilterBarComponent } from './components/filter-bar/filter-bar.component';


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
    FilterBarComponent    
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule    
  ],
  
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

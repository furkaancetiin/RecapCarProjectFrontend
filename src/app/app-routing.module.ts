import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarComponent } from './components/car/car.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { RentalComponent } from './components/rental/rental.component';
import { RentalDetailComponent } from './components/rental-detail/rental-detail.component';
import { CartComponent } from './components/cart/cart.component';
import { PaymentComponent } from './components/payment/payment.component';
import { LoginGuard } from './guards/login.guard';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
<<<<<<< HEAD
import { PaymentCompletedComponent } from './components/payment-completed/payment-completed.component';
=======
>>>>>>> e0ab2b157e43cf01653cb0ffbe2101cca0a2f80b

const routes: Routes = [
  {path:"",pathMatch:"full",component:CarComponent},  
  {path:"cars",component:CarComponent},
  {path:"cars/brand/:brandId",component:CarComponent},
  {path:"cars/color/:colorId",component:CarComponent},
  {path:"cars/cardetail/:carId",component:CarDetailComponent,canActivate:[LoginGuard]},
  {path:"login",component:LoginComponent},
  {path:"register",component:RegisterComponent},  
  {path:"cars/:brandId/:colorId",component:CarComponent}, 
  {path:"rental",component:RentalComponent},
  {path:"rentaldetail",component:RentalDetailComponent},
  {path:"rental",component:RentalComponent},
  {path:"myCart",component:CartComponent},
  {path:"payment",component:PaymentComponent,canActivate:[LoginGuard]},
  {path:"payment-completed",component:PaymentCompletedComponent} 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)], 
  exports: [RouterModule]
})
export class AppRoutingModule { }

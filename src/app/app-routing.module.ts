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
import { PaymentCompletedComponent } from './components/payment-completed/payment-completed.component';
import { BrandAddComponent } from './components/management/brand-add/brand-add.component';
import { ColorAddComponent } from './components/management/color-add/color-add.component';
import { CarAddComponent } from './components/management/car-add/car-add.component';
import { CarManagementComponent } from './components/management/car-management/car-management.component';
import { BrandManagementComponent } from './components/management/brand-management/brand-management.component';
import { ColorManagementComponent } from './components/management/color-management/color-management.component';
import { BrandUpdateComponent } from './components/management/brand-update/brand-update.component';
import { ColorUpdateComponent } from './components/management/color-update/color-update.component';
import { CarUpdateComponent } from './components/management/car-update/car-update.component';
import { AuthGuard } from './guards/auth.guard';
import { MyProfileComponent } from './components/user/my-profile/my-profile.component';
import { RegisterGuard } from './guards/register.guard';


const routes: Routes = [
  {path:"",pathMatch:"full",component:CarComponent},  
  {path:"cars",component:CarComponent},
  {path:"cars/brand/:brandId",component:CarComponent},
  {path:"cars/color/:colorId",component:CarComponent},
  {path:"cars/cardetail/:carId",component:CarDetailComponent,canActivate:[LoginGuard]},
  {path:"login",component:LoginComponent},
  {path:"register",component:RegisterComponent,canActivate:[RegisterGuard]},  
  {path:"cars/:brandId/:colorId",component:CarComponent}, 
  {path:"rental",component:RentalComponent},
  {path:"rentaldetail",component:RentalDetailComponent},
  {path:"rental",component:RentalComponent},
  {path:"myCart",component:CartComponent},
  {path:"payment",component:PaymentComponent,canActivate:[LoginGuard]},
  {path:"payment/completed",component:PaymentCompletedComponent,canActivate:[LoginGuard]} ,
  {path:"brand/add",component:BrandAddComponent,canActivate:[AuthGuard]},
  {path:"color/add",component:ColorAddComponent,canActivate:[AuthGuard]},
  {path:"car/add",component:CarAddComponent,canActivate:[AuthGuard]},
  {path:"car/management",component:CarManagementComponent,canActivate:[AuthGuard]},
  {path:"brand/management",component:BrandManagementComponent,canActivate:[AuthGuard]},
  {path:"color/management",component:ColorManagementComponent,canActivate:[AuthGuard]},
  {path:"brand/update/:brandId",component:BrandUpdateComponent,canActivate:[AuthGuard]},
  {path:"color/update/:colorId",component:ColorUpdateComponent,canActivate:[AuthGuard]},
  {path:"car/update/:id",component:CarUpdateComponent,canActivate:[AuthGuard]},
  {path:"myprofile",component:MyProfileComponent,canActivate:[LoginGuard]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)], 
  exports: [RouterModule]
})
export class AppRoutingModule { }

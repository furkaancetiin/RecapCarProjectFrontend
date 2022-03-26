import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLayoutComponent } from './components/auth/auth-layout/auth-layout.component';
import { CarComponent } from './components/car/car.component';
import { CarDetailComponent } from './components/cardetail/car-detail.component';
import { RentalComponent } from './components/rental/rental.component';
import { RentalDetailComponent } from './components/rental-detail/rental-detail.component';

const routes: Routes = [
  {path:"",pathMatch:"full",component:CarComponent},  
  {path:"cars",component:CarComponent},
  {path:"cars/brand/:brandId",component:CarComponent},
  {path:"cars/color/:colorId",component:CarComponent},
  {path:"cars/cardetail/:carId",component:CarDetailComponent},
  
  {path:"cars/:brandId/:colorId",component:CarComponent}, 
  {path:"rental",component:RentalComponent},
  {path:"",component:AuthLayoutComponent,children:[{path:'',redirectTo:'/login',pathMatch:'full'},{path:'login',loadChildren:()=>import('./components/auth/auth.module').then(m=>m.AuthModule)}]},
  {path:"rentaldetail",component:RentalDetailComponent},
  {path:"rental",component:RentalComponent}
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)], 
  exports: [RouterModule]
})
export class AppRoutingModule { }

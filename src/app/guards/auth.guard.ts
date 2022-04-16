import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { UserForLogin } from '../models/userForLogin';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  currentUser:UserForLogin;

  constructor(private authService:AuthService,private toastrService:ToastrService,private router:Router){
    this.currentUser = this.authService.getUser()!;
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
   
      if(this.authService.isAuthenticated()){
        if(this.authService.hasRole(this.currentUser,"admin")){
          return true;
        }else{
          this.router.navigate([""])
          this.toastrService.info("Bu sayfaya giriş yetkiniz bulunmamaktadır.")
          return false;
        }
      }else{
        this.router.navigate(["login"])
        this.toastrService.info("Sisteme giriş yapmalısınız.")
        return false;
      }  

  }
  
}

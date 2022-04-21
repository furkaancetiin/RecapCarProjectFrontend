import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterGuard implements CanActivate {

  constructor(private authService:AuthService,private router:Router,private toastrService:ToastrService){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(!this.authService.loggedIn()){        
       return true;
      }else{
        this.router.navigate([""])
        this.toastrService.info("Yeni bir üyelik almak istiyorsanız mevcut hesaptan çıkış yapmalısınız.")
        return false;
      } 
  }
  
}

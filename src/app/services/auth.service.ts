import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ListResponseModel } from '../models/listResponseModel';
import { LoginModel } from '../models/loginModel';
import { RegisterModel } from '../models/registerModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { TokenModel } from '../models/tokenModel';
import { UserForLogin } from '../models/userForLogin';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient:HttpClient,private localStorageService:LocalStorageService,private jwtHelperService:JwtHelperService) { }

  login(loginModel:LoginModel){
    return this.httpClient.post<SingleResponseModel<TokenModel>>(environment.apiUrl+"auth/login",loginModel)
  }

  register(registerModel:RegisterModel):Observable<SingleResponseModel<TokenModel>>{    
      let newPath = environment.apiUrl + 'auth/register';
      return this.httpClient.post<SingleResponseModel<TokenModel>>(newPath,registerModel);    
  }

  isAuthenticated(){
    if(localStorage.getItem("token")){
      return true;
    }else{
      return false;
    }
  }

  logOut() {
    this.localStorageService.removeItem("token");
    window.location.reload();    
  }

  private getToken(): string | null {
    return this.localStorageService.getItem("token");
  }

  getUser(): UserForLogin | undefined {
    let token = this.getToken();
    if (token != null) {
      let tokenDetails = Object.entries(this.jwtHelperService.decodeToken(token));
      let user: UserForLogin = new UserForLogin;
      tokenDetails.forEach(detail => {
        switch (detail[0]) {
          case "email": {
            user.email = String(detail[1]);
            break;
          }
          case "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name": {
            user.name = String(detail[1]);
            break;
          }
          case "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": {
            user.roles = detail[1] as Array<string>
            break;
          }
          case "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier": {
            user.id = Number(detail[1]);
          }
        }
      });
      if (!user.roles) {  //if the user does not have a role
        user.roles = [];
      }
      return user;
    }
    return undefined;
  }
}

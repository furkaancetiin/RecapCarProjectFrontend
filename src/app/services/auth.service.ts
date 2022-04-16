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
  providedIn: 'root',
})
export class AuthService {

  roleAs:string;

  constructor(
    private httpClient: HttpClient,
    private localStorageService: LocalStorageService,
    private jwtHelperService: JwtHelperService
  ) {}

  login(loginModel: LoginModel) {
    return this.httpClient.post<SingleResponseModel<TokenModel>>(
      environment.apiUrl + 'auth/login',
      loginModel
    );
  }

  register(
    registerModel: RegisterModel
  ): Observable<SingleResponseModel<TokenModel>> {
    let newPath = environment.apiUrl + 'auth/register';
    return this.httpClient.post<SingleResponseModel<TokenModel>>(
      newPath,
      registerModel
    );
  }

  isAuthenticated() {
    if (localStorage.getItem('token')) {
      return true;
    } else {
      return false;
    }
  }

  loggedIn(): boolean {
    let token = this.localStorageService.getItem('token');
    if (token) {
      return true;
    }
    return false;
  }

  logOut() {
    this.localStorageService.removeItem('token');
    window.location.reload();
  }

  private getToken(): string | null {
    return this.localStorageService.getItem('token');
  }

  getUser(): UserForLogin | undefined {
    let token = this.getToken();
    if (token != null) {
      let tokenDetails = Object.entries(
        this.jwtHelperService.decodeToken(token)
      );
      let user: UserForLogin = new UserForLogin();
      for (let i = 0; i < tokenDetails[0].length; i++) {
        if (
          tokenDetails[0][0] ===
          'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'
        ) {
          user.id = tokenDetails[0][1] as number;
        }
        if (tokenDetails[1][0] === 'email') {
          user.email = tokenDetails[1][1] as string;
        }
        if (
          tokenDetails[2][0] ===
          'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'
        ) {
          user.name = tokenDetails[2][1] as string;
        }
        if (
          tokenDetails[3][0] ===
          'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
        ) {
          tokenDetails[3][1];
          user.roles = tokenDetails[3][1] as Array<string>;
        }
      }

      if (!user.roles) {
        user.roles = [];
      }
      return user;
    }
    return undefined;
  }

  hasRole(user: UserForLogin, role: string): boolean {
    if (user.roles.indexOf(role) !== -1) {
      return true;
    }
    return false;
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserForLogin } from 'src/app/models/userForLogin';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css'],
})
export class NaviComponent implements OnInit {
  dataLoading = false;
  isLoggedIn: boolean;
  currentUser: UserForLogin;
  isAdmin = false;

  constructor(
    private authService: AuthService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isAuthenticated();
    this.currentUser = this.authService.getUser()!;
    this.isUserAdmin();
  }

  delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  logOut() {
    (async () => {
      this.dataLoading = true;
      await this.delay(1000);
      this.authService.logOut();
    })();
  }

  isUserAdmin()  {
    if(this.authService.loggedIn()){
      this.isAdmin = this.authService.hasRole(this.currentUser, "admin"); 
    }     
  }
}

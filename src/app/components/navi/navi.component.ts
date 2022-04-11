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

  constructor(
    private authService: AuthService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isAuthenticated();
  }

  delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  logOut() {
    (async () => {
      this.dataLoading=true;
      await this.delay(1000);      
      this.authService.logOut();
    })();

  }

  getCurrentUser() {
    this.currentUser = this.authService.getUser()!;
  }
}

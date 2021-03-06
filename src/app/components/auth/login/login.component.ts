import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormGroup,
  FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  dataLoading = false;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    if (this.loginForm.valid) {
      let loginModel = Object.assign({}, this.loginForm.value);
      
      (async () => {    
        this.dataLoading = true;   
        await this.delay(1000);
        this.authService.login(loginModel).subscribe(          
          (response) => {
            this.toastrService.success('Giriş işlemi başarılı')
            localStorage.setItem('token', response.data.token);
            window.location.replace('');
          },
          (responseError) => {
            this.toastrService.error(responseError.error);
          }          
        );
        
        this.dataLoading = false;
      })();      
    }else{
      this.toastrService.error('Email ve şifrenizi giriniz.')
    }   
  }

  delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

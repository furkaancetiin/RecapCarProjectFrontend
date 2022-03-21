import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators,FormGroup,FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;
  constructor(private formBuilder:FormBuilder) { }

  ngOnInit(): void {
  }

  createLoginForm(){
    this.loginForm = this.formBuilder.group({

    })
  }

}
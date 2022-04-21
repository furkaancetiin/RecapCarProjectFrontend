import { Component, OnInit } from '@angular/core';
import { UserForLogin } from 'src/app/models/userForLogin';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

  currentUser:UserForLogin;

  constructor(private authService:AuthService) { }

  ngOnInit(): void {
    this.currentUser = this.authService.getUser()!;
  }

}

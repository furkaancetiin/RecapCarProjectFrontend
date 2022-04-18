import { Component, OnInit } from '@angular/core';
import { UserForLogin } from 'src/app/models/userForLogin';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  currentUser:UserForLogin
  constructor(private authService:AuthService) { }

  ngOnInit(): void {
    this.currentUser = this.authService.getUser()!;
  }

}

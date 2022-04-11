import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FindexPoint } from './models/findexPoint';
import { CustomerService } from './services/customer.service';
import { FindexPointService } from './services/findex-point.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'rentacar';
  myRouter:string;
  

  constructor(private router: Router,private customerService:CustomerService,private findexPointService:FindexPointService) {
    this.myRouter = router.url;     
   
  }  
}

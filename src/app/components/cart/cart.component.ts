import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CarDetail } from 'src/app/models/carDetail';
import { CartItem } from 'src/app/models/cartItem';
import { CartSummaryService } from 'src/app/services/cart-summary.service';
import { DateTimeService } from 'src/app/services/date-time.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  baseUrl = environment.imageBase;
  defaultImage = environment.defaultImage;
  cartItems:CartItem[];
  constructor(private cartSummaryService:CartSummaryService,private dateTimeService:DateTimeService,private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.listCart()
  }

  listCart() {    
    this.cartItems = this.cartSummaryService.listCart();
  }

  removeCart(carDetail:CarDetail){    
    this.cartSummaryService.removeFromCart(carDetail);
    this.cartSummaryService.listCart();  
    window.location.reload();
  }  

  calculateTotalRentalPeriod(){ 
    return this.cartSummaryService.calculateTotalRentalPeriod();           
  }

  calculateTotalAmount(){
    return this.cartSummaryService.calculateTotalAmount();
  }

  showDate(date:Date){
    return this.dateTimeService.showDate(date); 
  }  

  getRentalPeriod(rentDate: Date, returnDate: Date): number {
    return this.dateTimeService.getRentalPeriod(rentDate, returnDate);
  }

}

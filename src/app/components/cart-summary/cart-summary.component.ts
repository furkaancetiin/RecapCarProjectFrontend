import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CarDetail } from 'src/app/models/carDetail';
import { CartItem } from 'src/app/models/cartItem';
import { CartItems } from 'src/app/models/cartItems';
import { CartService } from 'src/app/services/cart.service';
import { DateTimeService } from 'src/app/services/date-time.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cart-summary',
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.css']
})
export class CartSummaryComponent implements OnInit {

  cartItems:CartItem[]=[];
  carDetail:CarDetail;
  baseUrl = environment.imageBase;
  defaultImage = environment.defaultImage;

  constructor(private cartService:CartService,private toastrService:ToastrService,private dateTimeService:DateTimeService) { }

  ngOnInit(): void {
    this.getCart();
  }  

  getCart(){
    this.cartItems=this.cartService.list();
  }

  removeCart(carDetail:CarDetail){
    this.toastrService.error('Araç silindi', carDetail.carName);
    this.cartService.removeFromCart(carDetail)
  }

  clearCart() {
    CartItems.length = 0;
    if (CartItems.length === 0) {
      this.toastrService.error('Sepet temizlendi');
    } 
  }

  showDate(date:Date){
    return this.dateTimeService.showDate(date)   
  }  

  getRentalPeriod(rentDate: Date, returnDate: Date): number {
    return this.dateTimeService.getRentalPeriod(rentDate, returnDate);
  }
}

import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CarDetail } from '../models/carDetail';
import { CartItem } from '../models/cartItem';
import { CartItems } from '../models/cartItems';
import { DateTimeService } from './date-time.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private dateTimeService: DateTimeService,private toastrService:ToastrService) {}

  addToCart(carDetail: CarDetail, rentDate: Date, returnDate: Date) {
    let item = CartItems.find((c) => c.carDetail.carId === carDetail.carId);
    if(item){
     this.toastrService.error("Araç zaten sepetinizde mevcut",carDetail.carName)
    }else{
      let cartItem = new CartItem();
      cartItem.carDetail = carDetail;
      cartItem.rentDate = rentDate;
      cartItem.returnDate = returnDate;
      CartItems.push(cartItem);
      this.toastrService.success('Sepete eklendi', carDetail.carName);
    }    
  }

  removeFromCart(carDetail: CarDetail) {
    let item = CartItems.find((c) => c.carDetail.carId === carDetail.carId);
    CartItems.splice(CartItems.indexOf(item),1);
  }

  calculateTotalAmount(): number {
    let totalAmount: number = 0;
    CartItems.forEach((cartItem) => {
      let rentalPeriod = this.dateTimeService.getRentalPeriod(
        cartItem.rentDate,
        cartItem.returnDate
      );
      let amount = cartItem.carDetail.dailyPrice * rentalPeriod;
      totalAmount += amount;
    });
    return totalAmount;
  }

  calculateTotalRentalPeriod(cartItems: CartItem[]): number {
    let totalRentalPeriod: number = 0;
    cartItems.forEach((cartItem) => {
      let rentalPeriod: number = this.dateTimeService.getRentalPeriod(
        cartItem.rentDate,
        cartItem.returnDate
      );
      totalRentalPeriod += rentalPeriod;
    });
    return totalRentalPeriod;
  }

  list(): CartItem[] {
    return CartItems;
  }
}

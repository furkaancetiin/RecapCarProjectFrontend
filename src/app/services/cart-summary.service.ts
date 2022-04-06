import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CarDetail } from '../models/carDetail';
import { CartItem } from '../models/cartItem';
import { DateTimeService } from './date-time.service';

@Injectable({
  providedIn: 'root',
})
export class CartSummaryService {
  cartItems: CartItem[] = [];

  constructor(
    private dateTimeService: DateTimeService,
    private toastrService: ToastrService
  ) {}

  delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  addToCart(carDetail: CarDetail, rentDate: Date, returnDate: Date) {
    var currentDate = new Date();
    rentDate = new Date(rentDate);

    this.cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    for (let i = 0; i < this.cartItems.length; i++) {
      if (this.cartItems[i].carDetail.carId === carDetail.carId) {
        this.toastrService.error(
          'Araç zaten sepetinizde mevcut',
          carDetail.carName
        );
        return;
      }
    }
    if (!rentDate.getTime() || !returnDate.getTime()) {
      this.toastrService.error('Lütfen kiralama ve dönüş tarihi giriniz.');
    } else if (rentDate < currentDate || returnDate < rentDate) {
      this.toastrService.error('Lütfen girilen tarihleri kontrol ediniz.');
    } else {
      let cartItem = new CartItem();
      cartItem.carDetail = carDetail;
      cartItem.rentDate = rentDate;
      cartItem.returnDate = returnDate;
      this.cartItems.push(cartItem);  
      this.toastrService.success('Sepete eklendi', carDetail.carName);
      localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
      (async () => {
        await this.delay(1000);   
        window.location.reload();      
      })();
      
    }
  }

  removeFromCart(carDetail: CarDetail) {
    this.cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    for (let i = 0; i < this.cartItems.length; i++) {
      if (this.cartItems[i].carDetail.carId === carDetail.carId) {
        this.cartItems.splice(this.cartItems.indexOf(this.cartItems[i]), 1);
      }
    }
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  }

  calculateTotalAmount(): number {
    this.cartItems = this.listCart();

    let totalAmount: number = 0;
    for (let i = 0; i < this.cartItems.length; i++) {
      let rentalPeriod = this.dateTimeService.getRentalPeriod(
        this.cartItems[i].rentDate,
        this.cartItems[i].returnDate
      );
      let amount = this.cartItems[i].carDetail.dailyPrice * rentalPeriod;
      totalAmount += amount;
    }
    return totalAmount;
  }

  calculateTotalRentalPeriod(): number {
    this.cartItems = this.listCart();
    let totalRentalPeriod: number = 0;
    for (let i = 0; i < this.cartItems.length; i++) {
      let rentalPeriod = this.dateTimeService.getRentalPeriod(
        this.cartItems[i].rentDate,
        this.cartItems[i].returnDate
      );
      totalRentalPeriod += rentalPeriod;
    }
    return totalRentalPeriod;
  }

  listCart(): CartItem[] {
    return JSON.parse(localStorage.getItem('cartItems'), function (key, value) {
      if (key == 'rentDate') {
        return new Date(value);
      }
      if (key == 'returnDate') {
        return new Date(value);
      } else {
        return value;
      }
    });
  }
}

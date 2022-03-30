import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CarDetail } from 'src/app/models/carDetail';
import { CartItem } from 'src/app/models/cartItem';
import { CartSummaryService } from 'src/app/services/cart-summary.service';
import { DateTimeService } from 'src/app/services/date-time.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cart-summary',
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.css'],
})
export class CartSummaryComponent implements OnInit {
  cartItems: CartItem[];
  carDetail: CarDetail;
  baseUrl = environment.imageBase;
  defaultImage = environment.defaultImage;

  constructor(
    private cartSummaryService: CartSummaryService,
    private toastrService: ToastrService,
    private dateTimeService: DateTimeService
  ) {}

  ngOnInit(): void {
    this.listCart();
  }

  listCart() {    
    this.cartItems = this.cartSummaryService.listCart();
  }

  removeCart(carDetail: CarDetail) {
    this.toastrService.error('Araç silindi', carDetail.carName);
    this.cartSummaryService.removeFromCart(carDetail);
    this.cartItems = this.cartSummaryService.listCart();
  }

  showDate(date: Date) {
    return this.dateTimeService.showDate(date);
  }

  getRentalPeriod(rentDate: Date, returnDate: Date): number {
    return this.dateTimeService.getRentalPeriod(rentDate, returnDate);
  }
}

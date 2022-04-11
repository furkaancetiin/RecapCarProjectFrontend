import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/models/cartItem';
import { CartSummaryService } from 'src/app/services/cart-summary.service';
import { DateTimeService } from 'src/app/services/date-time.service';

@Component({
  selector: 'app-payment-completed',
  templateUrl: './payment-completed.component.html',
  styleUrls: ['./payment-completed.component.css']
})
export class PaymentCompletedComponent implements OnInit {

  cartItems:CartItem[]

  constructor(private cartSummaryService:CartSummaryService,private dateTimeService:DateTimeService) { }

  ngOnInit(): void {
    this.listCart();
    this.calculateTotalRentalPeriod();
    this.calculateTotalAmount();
  }


  listCart() {
    this.cartItems = this.cartSummaryService.listCart();
  }

  calculateTotalRentalPeriod() {
    return this.cartSummaryService.calculateTotalRentalPeriod();
  }

  calculateTotalAmount() {
    return this.cartSummaryService.calculateTotalAmount();
  }

  showDate(date: Date) {
    return this.dateTimeService.showDate(date);
  }

  getRentalPeriod(rentDate: Date, returnDate: Date): number {
    return this.dateTimeService.getRentalPeriod(rentDate, returnDate);
  }
}

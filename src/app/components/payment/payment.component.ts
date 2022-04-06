import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/models/cartItem';
import { CartSummaryService } from 'src/app/services/cart-summary.service';
import { DateTimeService } from 'src/app/services/date-time.service';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { Rental } from 'src/app/models/rental';
import { CustomerService } from 'src/app/services/customer.service';
import { UserForLogin } from 'src/app/models/userForLogin';
import { Customer } from 'src/app/models/customer';
import { RentPaymentRequest } from 'src/app/models/rentPaymentRequest';
import { RentalService } from 'src/app/services/rental.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  cartItems: CartItem[] = [];
  creditCardForm: FormGroup;
  currentUser: UserForLogin;

  constructor(
    private cartSummaryService: CartSummaryService,
    private dateTimeService: DateTimeService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastrService: ToastrService,
    private customerService: CustomerService,
    private rentalService: RentalService
  ) {}

  ngOnInit(): void {
    this.listCart();
    this.createCreditCardForm();
    this.currentUser = this.authService.getUser()!;   
    this.getCustomerId();
  }

  createCreditCardForm() {
    this.creditCardForm = this.formBuilder.group({
      cardHolderFullName: ['', Validators.required],
      cardNumber: ['', Validators.required],
      expireMonthAndYear: ['', Validators.required],
      cvc: ['', Validators.required],
    });
  }

  rent() {
    if (this.creditCardForm.valid) {
      this.getCustomerId().then(
        (customerId) => {
          let rentRequest: RentPaymentRequest = Object.assign(
            {},
            this.creditCardForm.value
          );
          rentRequest.customerId = customerId;
          rentRequest.amount = this.calculateTotalAmount();
          rentRequest.rentals = this.createRentals(customerId);

          this.rentalService.rent(rentRequest).subscribe((response) => {
            this.toastrService.success(response.message, 'Başarılı');
          });
        },
        () => {}
      );
    } else {
      this.toastrService.error(
        'Lütfen kart bilgilerinizi eksiksiz doldurunuz',
        'Kart bilgileri eksik'
      );
    }
  }

  createRentals(customerId: number): Rental[] {
    let rentals: Rental[] = [];
    this.cartItems.forEach((cartItem) => {
      let rental: Rental = new Rental();
      rental.carId = cartItem.carDetail.carId;
      rental.customerId = customerId;
      rental.rentDate = cartItem.rentDate;
      rental.returnDate = cartItem.returnDate;
      rentals.push(rental);
    });
    return rentals;
  }

  getCustomerId(): Promise<number> {
    return new Promise<number>((methodResolve) => {
      this.customerService.getCustomerByUserId(this.currentUser.id).subscribe(
        (successResult) => {
          methodResolve(successResult.data.customerId);
          console.log(successResult.data.customerId);
        },
        () => {
          //If the user is not a customer, save it as a customer
          let addedCustomer = new Customer();
          addedCustomer.userId = this.currentUser.id;
          addedCustomer.companyName = 'Test Company Name';
          this.customerService
            .addCustomer(addedCustomer)
            .subscribe((successAddedResult) => {
              methodResolve(successAddedResult.data);
            });
        }
        
      );
      
    });
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

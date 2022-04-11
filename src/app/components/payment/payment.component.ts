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
import { FindexPointService } from 'src/app/services/findex-point.service';
import { SingleFindexPoint } from 'src/app/models/singleFindexPoint';
import { CustomerCreditCardService } from 'src/app/services/customer-credit-card.service';
import { CreditCard } from 'src/app/models/creditCard';
import { RouteConfigLoadEnd, Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  cartItems: CartItem[] = [];
  creditCardForm: FormGroup;
  currentUser: UserForLogin;
  findexPointOfCustomer: number;
  customerCreditCards: CreditCard[];
  customerCreditCard: CreditCard;
  anotherCreditCard = false;
  savedCreditCard = false;
  paymentLoading = false;

  public customPatterns = {
    '0': { pattern: new RegExp('[a-zA-Z ıIöÖçÇüÜşŞİğĞ]') },
  };

  constructor(
    private cartSummaryService: CartSummaryService,
    private dateTimeService: DateTimeService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastrService: ToastrService,
    private customerService: CustomerService,
    private rentalService: RentalService,
    private findexPointService: FindexPointService,
    private customerCreditCardService: CustomerCreditCardService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.listCart();
    this.createCreditCardForm();
    this.currentUser = this.authService.getUser()!;
    this.getCustomerId();
    this.getCustomerCreditCardById();
  }

  createCreditCardForm() {
    this.creditCardForm = this.formBuilder.group({
      cardHolderFullName: ['', Validators.required],
      cardNumber: ['', Validators.required],
      expireMonthAndYear: ['', Validators.required],
      cvc: ['', Validators.required],
    });
  }

  getCustomerCreditCardById() {
    this.getCustomerId().then((customerId) => {
      this.customerCreditCardService
        .getCustomerCreditCardById(customerId)
        .subscribe((response) => {
          this.customerCreditCards = response.data;
        });
    });
  }

  toPayWithAnotherCreditCard(): boolean {
    return (this.anotherCreditCard = true);
  }

  getCurrentCustomerCreditCard(customerCreditCard: CreditCard) {
    if (this.customerCreditCard === customerCreditCard) {
      return 'checked';
    } else {
      return '';
    }
  }

  setCurrentCustomerCreditCard(customerCreditCard: CreditCard) {
    this.customerCreditCard = customerCreditCard;
    console.log(this.customerCreditCard);
    this.anotherCreditCard = false;
  }

  rentWithSavedCustomerCreditCard() {
    this.getCustomerId().then(
      (customerId) => {
        let rentRequest = new RentPaymentRequest();

        (rentRequest.cardHolderFullName =
          this.customerCreditCard.cardHolderFullName),
          (rentRequest.cvc = this.customerCreditCard.cvc),
          (rentRequest.cardNumber = this.customerCreditCard.cardNumber),
          (rentRequest.expireMonthAndYear =
            this.customerCreditCard.expireMonthAndYear),
          (rentRequest.customerId = customerId),
          (rentRequest.amount = this.calculateTotalAmount()),
          (rentRequest.rentals = this.createRentals(customerId)),
          (rentRequest.findexScores = this.createFindexPoint()),
          (async () => {
            this.paymentLoading = true;
            await this.delay(3000);
            this.rentalService.rent(rentRequest).subscribe(
              (response) => {
                this.toastrService.success(response.message, 'Başarılı');
                this.router.navigate(['payment-completed']);
              },
              (errorResponse) => {
                this.toastrService.error(errorResponse.error.message);
              }
            );
            this.paymentLoading = false;
          })();
      },
      () => {}
    );
  }

  rentWithAnotherCreditCard() {
    if (this.creditCardForm.valid) {
      this.getCustomerId().then(
        (customerId) => {
          let rentRequest: RentPaymentRequest = Object.assign(
            {},
            this.creditCardForm.value
          );
          (rentRequest.customerId = customerId),
            (rentRequest.amount = this.calculateTotalAmount()),
            (rentRequest.rentals = this.createRentals(customerId)),
            (rentRequest.findexScores = this.createFindexPoint()),
            (async () => {
              this.paymentLoading = true;
              await this.delay(3000);
              this.rentalService.rent(rentRequest).subscribe(
                (response) => {
                  this.toastrService.success(response.message, 'Başarılı');
                  this.router.navigate(['payment-completed']);
                },
                (errorResponse) => {
                  this.toastrService.error(errorResponse.error.message);
                }
              );
              this.paymentLoading = false;
            })();
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

  createFindexPoint(): SingleFindexPoint[] {
    let singleFindexPoints: SingleFindexPoint[] = [];
    this.cartItems.forEach((cartItem) => {
      let singleFindexPoint: SingleFindexPoint = new SingleFindexPoint();
      singleFindexPoint.findexScore = cartItem.carDetail.findexScore;
      singleFindexPoints.push(singleFindexPoint);
    });
    console.log(singleFindexPoints);
    return singleFindexPoints;
  }

  getCustomerFindexPoint() {
    this.getCustomerId().then((customerId) => {
      this.findexPointService
        .getFindexPointByCustomerId(customerId)
        .subscribe((response) => {
          this.findexPointOfCustomer = response.data.findexScore;
        });
    });
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
    console.log(rentals);
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

  delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
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

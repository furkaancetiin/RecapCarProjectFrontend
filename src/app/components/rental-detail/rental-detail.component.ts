import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarDetail } from 'src/app/models/carDetail';
import { CarImage } from 'src/app/models/carImage';
import { CartItem } from 'src/app/models/cartItem';
import { Customer } from 'src/app/models/customer';
import { FindexPoint } from 'src/app/models/findexPoint';
import { UserForLogin } from 'src/app/models/userForLogin';
import { AuthService } from 'src/app/services/auth.service';
import { CarDetailService } from 'src/app/services/car-detail.service';
import { CarImageService } from 'src/app/services/car-image-service';
import { CartSummaryService } from 'src/app/services/cart-summary.service';
import { CustomerService } from 'src/app/services/customer.service';
import { DateTimeService } from 'src/app/services/date-time.service';
import { FindexPointService } from 'src/app/services/findex-point.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-rental-detail',
  templateUrl: './rental-detail.component.html',
  styleUrls: ['./rental-detail.component.css'],
})
export class RentalDetailComponent implements OnInit {
  rentDate: string;
  returnDate: string;
  rentalPeriod: number;
  carDetails: CarDetail[];
  carDetail:CarDetail;
  carImages: CarImage[];
  cartItems: CartItem[];
  baseUrl = environment.imageBase;
  defaultImage = environment.defaultImage;
  currentUser: UserForLogin;
  carId: string;
  findexPointOfCar: number;
  findexPointOfCustomer: number;

  constructor(
    private toastrService: ToastrService,
    private cartSummaryService: CartSummaryService,
    private carDetailService: CarDetailService,
    private activatedRoute: ActivatedRoute,
    private carImageService: CarImageService,
    private dateTimeService: DateTimeService,
    private findexPointService: FindexPointService,
    private customerService: CustomerService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['carId']) {
        this.getCarDetailsById(params['carId']),
          this.getCarImagesByCarId(params['carId']),
          (this.rentDate = undefined!);
        this.returnDate = undefined!;
        this.rentalPeriod = undefined!;
      }
    });
    this.currentUser = this.authService.getUser()!;
    this.carId = this.activatedRoute.snapshot.paramMap.get('carId');

    this.getCustomerFindexPoint();
    this.getCarFindexPoint(parseInt(this.carId));
  }

  delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  addToCart(carDetail: CarDetail, rentDate: Date, returnDate: Date) {
    if (this.findexPointOfCustomer < this.findexPointOfCar) {
      this.toastrService.error(
        'Findex puanınız bu aracı kiralayabilmek için yeterli değildir.'
      );
      return;
    }
    this.cartSummaryService.addToCart(carDetail, rentDate, returnDate);
  }

  getCarDetailsById(id: number) {
    this.carDetailService.getCarDetailsByCarId(id).subscribe((response) => {
      this.carDetail = response.data;
    });
  }

  getCarImagesByCarId(carId: number) {
    this.carImageService.getCarImagesByCarId(carId).subscribe((response) => {
      this.carImages = response.data;
    });
  }

  calculateRentalPeriod() {
    this.rentalPeriod = this.getRentalPeriod(
      this.convertStringToDate(this.rentDate),
      this.convertStringToDate(this.returnDate)
    );
  }

  getRentalPeriod(rentDate: Date, returnDate: Date): number {
    return this.dateTimeService.getRentalPeriod(rentDate, returnDate);
  }

  convertStringToDate(dateString: string) {
    return this.dateTimeService.convertStringToDate(dateString);
  }

  getDateNow() {
    return this.dateTimeService.getDateNow();
  }

  addDayToDate(date: Date, addedDay: number) {
    return this.dateTimeService.addDayToDate(date, addedDay);
  }

  getCustomerFindexPoint() {
    this.getCustomerId().then((customerId) => {
      this.findexPointService
        .getFindexPointByCustomerId(customerId)
        .subscribe((response) => {
          this.findexPointOfCustomer = response.data.findexScore;
          console.log(this.findexPointOfCustomer);
        });
    });
  }

  getCustomerId(): Promise<number> {
    return new Promise<number>((methodResolve) => {
      this.customerService.getCustomerByUserId(this.currentUser.id).subscribe(
        (response) => {
          methodResolve(response.data.customerId);
          console.log(response.data.customerId);
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

  getCarFindexPoint(id: number) {
    (async () => {
      await this.delay(1000);
      this.carDetailService.getCarDetailsByCarId(id).subscribe((response) => {
        let findexPoint = new CarDetail();
        findexPoint.findexScore = response.data
        .findexScore;
        this.findexPointOfCar = findexPoint.findexScore;
        console.log(this.findexPointOfCar);
      });
    })();
  }
}

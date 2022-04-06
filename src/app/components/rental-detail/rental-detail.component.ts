import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarDetail } from 'src/app/models/carDetail';
import { CarImage } from 'src/app/models/carImage';
import { CartItem } from 'src/app/models/cartItem';
import { CarDetailService } from 'src/app/services/car-detail.service';
import { CarImageService } from 'src/app/services/car-image-service';
import { CartSummaryService } from 'src/app/services/cart-summary.service';
import { DateTimeService } from 'src/app/services/date-time.service';
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
  carImages: CarImage[];
  cartItems:CartItem[];
  baseUrl = environment.imageBase;
  defaultImage = environment.defaultImage;

  constructor(
    private toastrService: ToastrService,
    private cartSummaryService: CartSummaryService,
    private carDetailService: CarDetailService,
    private activatedRoute: ActivatedRoute,
    private carImageService: CarImageService,
    private dateTimeService: DateTimeService
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
  }

  addToCart(carDetail: CarDetail, rentDate: Date, returnDate: Date) {
    this.cartSummaryService.addToCart(carDetail, rentDate, returnDate);
    
    
  }

  getCarDetailsById(id: number) {
    this.carDetailService.getCarDetailsByCarId(id).subscribe((response) => {
      this.carDetails = response.data;
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
}

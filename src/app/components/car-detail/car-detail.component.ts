import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarDetail } from 'src/app/models/carDetail';
import { CarImage } from 'src/app/models/carImage';
import { Rental } from 'src/app/models/rental';
import { CarDetailService } from 'src/app/services/car-detail.service';
import { DateTimeService } from 'src/app/services/date-time.service';
import { RentalService } from 'src/app/services/rental.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css'],
})
export class CarDetailComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private carDetailService: CarDetailService,   
    private rentalService: RentalService,
    private dateTimeService:DateTimeService
  ) {}
  
  carDetail: CarDetail; 
  carImages: CarImage[];
  rentals:Rental[]
  reservationState=false;
  rentalResult: string;
  baseUrl = environment.imageBase;
  defaultImage = environment.defaultImage;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['carId']) {        
        this.getCarDetailsByCarId(params['carId']);
        this.getRentalDeliveryById(params['carId']);
        this.getRentalsById(params['carId']);
      }
    });
       
  }

  getCarDetailsByCarId(carId: number) {
    this.carDetailService.getCarDetailsByCarId(carId).subscribe((response) => {
      this.carDetail = response.data;
    });
  }
 
  getActiveImageClass(carImage: CarImage) {
    if (carImage === this.carImages[0]) {
      return 'active';
    } else {
      return '';
    }
  }

  getRentalsById(carId: number) {
    this.rentalService.getRentalsById(carId).subscribe(
      (response) => { 
             
        this.rentals = response.data;
        this.rentals.forEach(rental => {
         rental.rentDate=  new Date(rental.rentDate),
          rental.returnDate=new Date(rental.returnDate)
          this.reservationState=true; 
        }); 
      }      
    );
  }

  getRentalDeliveryById(carId: number) {
    this.rentalService.getRentalDeliveryById(carId).subscribe(
      (response) => {
        //console.log(response.message);
        this.rentalResult = response.message;
      },
      (responseError) => {
        this.rentalResult = responseError.error.message;
      }
    );
  }

  showDate(date:Date){
    return this.dateTimeService.showDate(date); 
  }  

}

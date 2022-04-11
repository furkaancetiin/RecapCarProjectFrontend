import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarDetail } from 'src/app/models/carDetail';
import { CarImage } from 'src/app/models/carImage';
import { CarDetailService } from 'src/app/services/car-detail.service';
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
    private rentalService: RentalService
  ) {}
  
  carDetail: CarDetail; 
  carImages: CarImage[];
  rentalResult: string;
  baseUrl = environment.imageBase;
  defaultImage = environment.defaultImage;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['carId']) {        
        this.getCarDetailsByCarId(params['carId']);
        this.getRentalDeliveryById(params['carId']);
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
}

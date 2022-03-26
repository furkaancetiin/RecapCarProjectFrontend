import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarDetail } from 'src/app/models/carDetail';
import { CarImage } from 'src/app/models/carImage';
import { RentalDetail } from 'src/app/models/rentalDetail';
import { CarDetailService } from 'src/app/services/car-detail.service';
import { CarImageService } from 'src/app/services/car-image-service';
import { CartService } from 'src/app/services/cart.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css']
})
export class RentalComponent implements OnInit {

  rentDate: string; 
  retunDate:string;
  carDetails: CarDetail[];
  rentalDetails:RentalDetail[];
  carImages:CarImage[];
  baseUrl = environment.imageBase;
  defaultImage = environment.defaultImage;
    
  constructor(
    private toastrService:ToastrService,
    private cartService:CartService,
    private carDetailService:CarDetailService,
    private activatedRoute:ActivatedRoute,
    private carImageService:CarImageService
    ) { }

  ngOnInit(): void {  
   this.activatedRoute.params.subscribe(params=>{
     if(params['carId']){
       this.getCarDetailsByCarId(params['carId']),
       this.getCarImagesByCarId(params['carId'])
     }
   })
  }  

  getCarDetailsByCarId(carId: number) {
    this.carDetailService.getCarDetailsByCarId(carId).subscribe((response) => {
      this.carDetails = response.data;
    });
  }

  getCarImagesByCarId(carId: number) {
    this.carImageService.getCarImagesByCarId(carId).subscribe((response) => {
      this.carImages = response.data;
    });
  }
 
}

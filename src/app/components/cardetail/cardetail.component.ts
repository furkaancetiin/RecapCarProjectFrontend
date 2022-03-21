import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CarDetail } from 'src/app/models/carDetail';
import { CarImage } from 'src/app/models/carImage';
import { CarImageDetail } from 'src/app/models/carImageDetail';
import { CarDetailService } from 'src/app/services/car-detail.service';
import { CarImageService } from 'src/app/services/car-image-service';
import { CartService } from 'src/app/services/cart.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cardetail',
  templateUrl: './cardetail.component.html',
  styleUrls: ['./cardetail.component.css'],
})
export class CarDetailComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private carDetailService: CarDetailService,
    private carImageService: CarImageService,
    private toastrService:ToastrService,
    private cartService:CartService
  ) {}

  cars:Car[];  
  carDetails: CarDetail[];
  carDetail: CarDetail;
  carImages: CarImage[];
  baseUrl = environment.imageBase;
  defaultImage = environment.defaultImage;
  loading = true;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['carId']) {
        this.getCarImagesByCarId(params['carId']);
        this.getCarDetailsByCarId(params['carId']);
      } else {
        this.getCarDetails();
      }
    });
  }

  getCarDetailsByCarId(carId: number) {
    this.carDetailService.getCarDetailsByCarId(carId).subscribe((response) => {
      this.carDetails = response.data;
    });
  }

  getCarDetails() {
    this.carDetailService.getCarsDetails().subscribe((response) => {
      this.carDetails = response.data;
    });
  }

  getActiveImageClass(carImage: CarImage) {
    if (carImage === this.carImages[0]) {
      return 'active';
    } else {
      return '';
    }
  }

  getCarImagesByCarId(carId: number) {
    this.carImageService.getCarImagesByCarId(carId).subscribe((response) => {
      this.carImages = response.data;
    });
  }

  addToCart(carDetail: CarDetail) {
    this.toastrService.success('Sepete eklendi',carDetail.carName);
    this.cartService.addToCart(carDetail);
  }
}

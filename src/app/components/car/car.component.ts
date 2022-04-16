import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { CarDetail } from 'src/app/models/carDetail';
import { Color } from 'src/app/models/color';
import { CarService } from 'src/app/services/car.service';
import { environment } from 'src/environments/environment';
import { CarImage } from 'src/app/models/carImage';
import { CarDetailService } from 'src/app/services/car-detail.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent implements OnInit {
  currentCar: Car;
  cars: Car[] = [];
  car: Car;
  carDetails: CarDetail[];
  carImages: CarImage[];
  carDetail: CarDetail;
  filterText = '';
  dataLoaded = false;
  baseUrl = environment.imageBase;
  defaultImage = environment.defaultImage;

  constructor(
    private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private carDetailService: CarDetailService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['brandId'] && params['colorId']) {
        this.getFilteredCarsById(params['brandId'], params['colorId']);
      }
      if (params['colorId']) {
        this.getCarDetailsByColorId(params['colorId']);
      } else if (params['brandId']) {
        this.getCarDetailsByBrandId(params['brandId']);
      } else {
        this.getCarDetails();
      }
    });  
  }

  setCurrentCar(car: Car) {
    this.currentCar = car;
  }

  getCurrentCarClass(car: Car) {
    if (car == this.currentCar) {
      return 'list-group-item active';
    } else {
      return 'list-group-item';
    }
  }

  getCars() {
    this.carService.getCars().subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
    });
  }

  getCarsByBrand(brandId: Brand) {
    this.carService.getCarsByBrand(brandId).subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
    });
  }

  getCarsByColor(colorId: Color) {
    this.carService.getCarsByColor(colorId).subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
    });
  }

  getFilteredCarsById(brandId: Brand, colorId: Color) {
    this.carDetailService
      .getFilteredCarsById(brandId, colorId)
      .subscribe((response) => {
        this.carDetails = response.data;
      });
  }

  getCarDetails() {
    this.carDetailService.getCarsDetails().subscribe((response) => {
      this.carDetails = response.data;
    });
  }

  getCarDetailsByBrandId(id: number) {
    this.carDetailService
      .getCarDetailsByBrandId(id)
      .subscribe((response) => {
        this.carDetails = response.data;
      });
  }

  getCarDetailsByColorId(id: number) {
    this.carDetailService.getCarDetailsByColorId(id).subscribe((response) => {
      this.carDetails = response.data;
    });
  }  
}

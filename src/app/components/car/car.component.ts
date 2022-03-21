import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { CarDetail } from 'src/app/models/carDetail';
import { Color } from 'src/app/models/color';
import { CarService } from 'src/app/services/car.service';

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
  carDetail: CarDetail;
  filterText = '';
  dataLoaded = false;

  constructor(
    private carService: CarService,
    private activatedRoute: ActivatedRoute,    
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if ((params['brandId']&&params['colorId'])) {
        this.getFilteredCarsById(params['brandId'],params['colorId']);
      }      
      if (params['colorId']) {
        this.getCarsByColor(params['colorId']);
      }
      else if (params['brandId']) {
        this.getCarsByBrand(params['brandId']);
      } 
      else {
        this.getCars();
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
    this.carService
      .getFilteredCarsById(brandId, colorId)
      .subscribe((response) => {
        this.cars = response.data;
      });
  }

  
}

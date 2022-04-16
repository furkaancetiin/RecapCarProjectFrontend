import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car-update',
  templateUrl: './car-update.component.html',
  styleUrls: ['./car-update.component.css'],
})
export class CarUpdateComponent implements OnInit {
  cars: Car[];
  car = new Car();
  brands: Brand[];
  colors: Color[];
  updateCarForm: FormGroup;

  constructor(
    private carService: CarService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private colorService: ColorService,
    private brandService: BrandService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        this.getCarById(params['id']);
      }
    });
    this.getBrands();
    this.getColors();    
  }
   
  getCarById(id: number) {
    this.carService.getCarById(id).subscribe((response) => {
      this.car = response.data;
      console.log(this.car);
    });
  }

  getBrands() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
    });
  }

  getColors() {
    this.colorService.getColors().subscribe((respond) => {
      this.colors = respond.data;     
    });

  }

  update() {
    
    this.carService.updateCar(this.car).subscribe((response) => {
      this.toastrService.success(response.message, 'Başarılı');
    });
  }
}

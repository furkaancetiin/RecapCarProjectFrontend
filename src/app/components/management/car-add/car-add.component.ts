import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css'],
})
export class CarAddComponent implements OnInit {
  
  addCarForm: FormGroup;
  brands:Brand[];
  colors:Color[];

  constructor(
    private formBuilder: FormBuilder,
    private carService: CarService,
    private toastrService: ToastrService,
    private brandService:BrandService,
    private colorService:ColorService
  ) {}

  ngOnInit(): void {
    this.getBrands();
    this.getColors();
    this.createAddCarForm();
  }

  createAddCarForm() {
    this.addCarForm = this.formBuilder.group({
      brandId: new FormControl(null, [Validators.required]),
      colorId: new FormControl(null, [Validators.required]),
      carName: ['', Validators.required],
      modelYear: ['', Validators.required],
      dailyPrice: ['', Validators.required],
      description: ['', Validators.required],
      findexScore:['',Validators.required]
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

  add(){
    if(this.addCarForm.valid){
      let carModel = Object.assign({},this.addCarForm.value);
      this.carService.addCar(carModel).subscribe(response=>{
        this.toastrService.success(response.message,'Başarılı');
      },errorResponse=>{
        this.toastrService.error(errorResponse.error.message);
      })
    }else{
      this.toastrService.error('Formunuz eksik','Dikkat');
    }
  }
}

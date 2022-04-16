import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Brand } from 'src/app/models/brand';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.css'],
})
export class FilterBarComponent implements OnInit {
  constructor(
    private colorService: ColorService,
    private brandService: BrandService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  brands: Brand[];
  colors: Color[];
  currentBrand: Brand;
  filterBarForm: FormGroup;
  allFilterParamatersEntered: boolean = false;

  ngOnInit(): void {
    this.getBrands();
    this.getColors();
    this.filterBarForm = this.formBuilder.group({
      brand: new FormControl(null, [Validators.required]),
      color: new FormControl(null, [Validators.required]),
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

  filter() {
    let brandId = this.filterBarForm.value.brand;
    let colorId = this.filterBarForm.value.color;

    if (this.getBrand()?.valid && this.getColor()?.valid) {     
      this.router.navigateByUrl('/cars/' + brandId + '/' + colorId);
      this.filterBarForm.reset();
     
    }
    else if(this.getBrand()?.valid){
      this.router.navigateByUrl('/cars/brand/'+brandId);
      this.filterBarForm.reset();
    }
    else if(this.getColor()?.valid){
      this.router.navigateByUrl('/cars/color/'+colorId);
      this.filterBarForm.reset();
    }
  }

  getBrand() {
    return this.filterBarForm.get('brand');
  }

  getColor() {
    return this.filterBarForm.get('color');
  }
 
}

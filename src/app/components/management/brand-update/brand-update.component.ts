import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand-update',
  templateUrl: './brand-update.component.html',
  styleUrls: ['./brand-update.component.css'],
})
export class BrandUpdateComponent implements OnInit {
  brands: Brand[];
  brand = new Brand();

  constructor(
    private brandService: BrandService,
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['brandId']) {
        this.getBrandById(params['brandId']);
      }
    });
    this.getBrands();
  }

  getBrandById(brandId: number) {
    this.brandService.getBrandById(brandId).subscribe((response) => {
      this.brand = response.data;
      console.log(this.brand);
    });
  }

  getBrands() {
    this.brandService.getBrands().subscribe((respond) => {
      this.brands = respond.data;
    });
  }

  update() {
    this.brandService.updateBrand(this.brand).subscribe(
      (response) => {
        this.toastrService.success(response.message, 'Başarılı');
      },
      (errorResponse) => {
        this.toastrService.error(errorResponse.error.message);
      }
    );
  }
}

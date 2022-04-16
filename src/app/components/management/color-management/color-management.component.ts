import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-management',
  templateUrl: './color-management.component.html',
  styleUrls: ['./color-management.component.css']
})
export class ColorManagementComponent implements OnInit {

  colors: Color[];

  constructor(private brandService: ColorService,private toastrService:ToastrService) {}

  ngOnInit(): void {
    this.getColors();
  }

  getColors() {
    this.brandService.getColors().subscribe((response) => {
      this.colors = response.data;
    });
  }

  deleteColor(brand: Color) {
    this.brandService.deleteColor(brand).subscribe(
      (response) => {
        this.toastrService.success(response.message, 'Başarılı');
        
      },
      (errorResponse) => {
        this.toastrService.error(errorResponse.error.message);
      }
    );
  }
}

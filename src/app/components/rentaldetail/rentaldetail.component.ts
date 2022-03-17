import { Component, OnInit } from '@angular/core';
import { RentalDetail } from 'src/app/models/rentalDetail';
import { RentalDetailService } from 'src/app/services/rentaldetail.service';

@Component({
  selector: 'app-rentaldetail',
  templateUrl: './rentaldetail.component.html',
  styleUrls: ['./rentaldetail.component.css']
})
export class RentalDetailComponent implements OnInit {

  rentalDetails:RentalDetail[]=[]
  constructor(private rentalDetailService:RentalDetailService) { }

  ngOnInit(): void {
    this.getRentalDetails()
  }

  getRentalDetails(){
    this.rentalDetailService.getRentalDetails().subscribe(response=>{
      this.rentalDetails=response.data
    })
  }

}

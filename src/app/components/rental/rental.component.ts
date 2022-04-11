import { Component, OnInit } from '@angular/core';
import { CarDetail } from 'src/app/models/carDetail';
import { Rental } from 'src/app/models/rental';
import { RentPaymentRequest } from 'src/app/models/rentPaymentRequest';
import { CarDetailService } from 'src/app/services/car-detail.service';
import { RentalService } from 'src/app/services/rental.service';


@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css'],
})
export class RentalComponent implements OnInit {

  rentals:Rental[];
  carDetail:CarDetail;

  constructor() {}

  ngOnInit(): void {
  
  }  
  

}

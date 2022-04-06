import { Component, OnInit } from '@angular/core';
import { Rental } from 'src/app/models/rental';
import { RentPaymentRequest } from 'src/app/models/rentPaymentRequest';
import { RentalService } from 'src/app/services/rental.service';


@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css'],
})
export class RentalComponent implements OnInit {

  rentals:Rental[];
 

  constructor() {}

  ngOnInit(): void {}  

}

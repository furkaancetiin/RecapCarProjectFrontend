import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ListResponseModel } from '../models/listResponseModel';
import { Rental } from '../models/rental';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  constructor(private httpClient:HttpClient) { }

  getRentalDeliveryById(id:number):Observable<ListResponseModel<Rental>>{
    let newPath = environment.apiUrl+"rentals/getrentaldeliverybyid?id="+id
    return this.httpClient.get<ListResponseModel<Rental>>(newPath)
  }    
}

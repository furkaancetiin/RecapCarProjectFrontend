import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ListResponseModel } from '../models/listResponseModel';
import { RentalDetail } from '../models/rentalDetail';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class RentalDetailService {
  
  constructor(private httpClient:HttpClient) { }

  getRentalDetails():Observable<ListResponseModel<RentalDetail>>{
    let newPath = environment.apiUrl+"rentals/getall"
    return this.httpClient.get<ListResponseModel<RentalDetail>>(newPath);
  }

  getRentalDetailsById(id:number):Observable<ListResponseModel<RentalDetail>>{
    let newPath = environment.apiUrl+"rentals/getrentaldetailsbyid?id="+id;
    return this.httpClient.get<ListResponseModel<RentalDetail>>(newPath)
  }
  
}

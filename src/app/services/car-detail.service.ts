import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CarDetail } from '../models/carDetail';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarDetailService {  

  constructor(private httpClient:HttpClient) { }

  getCarDetailsByCarId(id:number):Observable<ListResponseModel<CarDetail>>{
    let newPath = environment.apiUrl+"cars/getcardetailsbyid?id="+id
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath)
  }
  getCarsDetails():Observable<ListResponseModel<CarDetail>>{
    let newPath = environment.apiUrl+"cars/getcardetails"
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath)
  } 
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Brand } from '../models/brand';
import { CarDetail } from '../models/carDetail';
import { Color } from '../models/color';
import { ListResponseModel } from '../models/listResponseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarDetailService {   

  constructor(private httpClient:HttpClient) { }

  getCarDetailsByCarId(id:number):Observable<SingleResponseModel<CarDetail>>{
    let newPath = environment.apiUrl+"cars/getcardetailsbyid?id="+id
    return this.httpClient.get<SingleResponseModel<CarDetail>>(newPath)
  }
  getCarsDetails():Observable<ListResponseModel<CarDetail>>{
    let newPath = environment.apiUrl+"cars/getcardetails"
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath)
  } 
  getCarDetailsByBrandId(id:number):Observable<ListResponseModel<CarDetail>>{
    let newPath = environment.apiUrl+"cars/getcardetailsbybrandid?id="+id
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath)
  }

  getCarDetailsByColorId(id:number):Observable<ListResponseModel<CarDetail>>{
    let newPath = environment.apiUrl+"cars/getcardetailsbycolorid?id="+id
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath)
  }

  getFilteredCarsById(brandId:Brand,colorId:Color):Observable<ListResponseModel<CarDetail>>{
    let newPath = environment.apiUrl+"cars/getfilteredcarsbyid?brandId="+brandId+"&colorId="+colorId
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath)
    
  }  
  
}

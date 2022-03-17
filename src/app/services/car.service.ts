import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Brand } from '../models/brand';
import { Car } from '../models/car';
import { CarDetail } from '../models/carDetail';
import { Color } from '../models/color';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(private httpClient: HttpClient) { }

  getCars():Observable<ListResponseModel<Car>> {
    let newPath = environment.apiUrl + "cars/getall"
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarsByBrand(id:Brand):Observable<ListResponseModel<Car>> {
    let newPath = environment.apiUrl + "cars/getcarsbybrandid?id="+id
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarsByColor(id:Color):Observable<ListResponseModel<Car>>{
    let newPath =environment.apiUrl + "cars/getcarsbycolorid?id="+id    
    return this.httpClient.get<ListResponseModel<Car>>(newPath)

  }  

  getCarsDetails():Observable<ListResponseModel<CarDetail>>{
    let newPath = environment.apiUrl+"cars/getcarsdetails"
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath)
  }

  getFilteredCarsById(brandId:Brand,colorId:Color):Observable<ListResponseModel<Car>>{
    let newPath = environment.apiUrl+"cars/getfilteredcarsbyid?brandId="+brandId+"&colorId="+colorId
    return this.httpClient.get<ListResponseModel<Car>>(newPath)
  }
    
}

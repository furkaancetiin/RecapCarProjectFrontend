import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Brand } from '../models/brand';
import { Car } from '../models/car';
import { CarDetail } from '../models/carDetail';
import { Color } from '../models/color';
import { ListResponseModel } from '../models/listResponseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(private httpClient: HttpClient) { }

  getCars():Observable<ListResponseModel<Car>> {
    let newPath = environment.apiUrl + "cars/getall"
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarById(id:number):Observable<SingleResponseModel<Car>> {
    let newPath = environment.apiUrl + "cars/getbyid?id="+id
    return this.httpClient.get<SingleResponseModel<Car>>(newPath);
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

  addCar(car:Car):Observable<SingleResponseModel<Car>>{
    let newPath = environment.apiUrl+"cars/add";
    return this.httpClient.post<SingleResponseModel<Car>>(newPath,car);
  }
  deleteCar(car:Car):Observable<SingleResponseModel<Car>>{
    let newPath = environment.apiUrl+"cars/delete";
    return this.httpClient.post<SingleResponseModel<Car>>(newPath,car);
  }
  updateCar(car:Car):Observable<SingleResponseModel<Car>>{
    let newPath = environment.apiUrl+"cars/update";
    return this.httpClient.post<SingleResponseModel<Car>>(newPath,car);
  }



  
}

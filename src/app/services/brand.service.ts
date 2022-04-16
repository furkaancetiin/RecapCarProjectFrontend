import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Brand } from '../models/brand';
import { ListResponseModel } from '../models/listResponseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class BrandService {  

  constructor(private httpClient:HttpClient) { }

  getBrands():Observable<ListResponseModel<Brand>>{
    let newPath = environment.apiUrl+"brands/getall"
    return this.httpClient.get<ListResponseModel<Brand>>(newPath);
  }

  getBrandById(id:number):Observable<SingleResponseModel<Brand>>{
    let newPath = environment.apiUrl+"brands/getbyid?id="+id
    return this.httpClient.get<SingleResponseModel<Brand>>(newPath);
  }

  addBrand(brand:Brand):Observable<SingleResponseModel<Brand>>{
    let newPath = environment.apiUrl + "brands/add";
    return this.httpClient.post<SingleResponseModel<Brand>>(newPath,brand)

  }

  deleteBrand(brand:Brand):Observable<SingleResponseModel<Brand>>{
    let newPath = environment.apiUrl + "brands/delete";
    return this.httpClient.post<SingleResponseModel<Brand>>(newPath,brand)
  }

  updateBrand(brand:Brand):Observable<SingleResponseModel<Brand>>{
    let newPath = environment.apiUrl + "brands/update";
    return this.httpClient.post<SingleResponseModel<Brand>>(newPath,brand)
  }
}

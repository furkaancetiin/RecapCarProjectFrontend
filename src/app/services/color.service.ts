import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Color } from '../models/color';
import { ListResponseModel } from '../models/listResponseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  constructor(private httpClient:HttpClient) { }

  getColors():Observable<ListResponseModel<Color>>{
    let newPath = environment.apiUrl+"colors/getall"
    return this.httpClient.get<ListResponseModel<Color>>(newPath)
  }

  getColorById(id:number):Observable<SingleResponseModel<Color>>{
    let newPath = environment.apiUrl+"colors/getbyid?id="+id
    return this.httpClient.get<SingleResponseModel<Color>>(newPath)
  }

  addColor(color:Color):Observable<SingleResponseModel<Color>>{
    let newPath = environment.apiUrl+"colors/add";
    return this.httpClient.post<SingleResponseModel<Color>>(newPath,color);
  }

  deleteColor(color:Color):Observable<SingleResponseModel<Color>>{
    let newPath = environment.apiUrl+"colors/delete";
    return this.httpClient.post<SingleResponseModel<Color>>(newPath,color);
  }

  updateColor(color:Color):Observable<SingleResponseModel<Color>>{
    let newPath = environment.apiUrl+"colors/update";
    return this.httpClient.post<SingleResponseModel<Color>>(newPath,color);
  }
}

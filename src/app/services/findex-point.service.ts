import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FindexPoint } from '../models/findexPoint';
import { SingleResponseModel } from '../models/singleResponseModel';
import { CustomerService } from './customer.service';

@Injectable({
  providedIn: 'root'
})
export class FindexPointService { 

  constructor(private httpClient:HttpClient) { }  

  getFindexPointByCustomerId(id:number):Observable<SingleResponseModel<FindexPoint>> {
    let newPath = environment.apiUrl + "findexpoints/getfindexpointbycustomerid?id="+id
    return this.httpClient.get<SingleResponseModel<FindexPoint>>(newPath);    
  }  
}

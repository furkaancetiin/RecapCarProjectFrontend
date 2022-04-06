import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Customer } from '../models/customer';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private httpClient:HttpClient) { }

  getCustomerByUserId(id:number):Observable<SingleResponseModel<Customer>> {
    let newPath = environment.apiUrl + "customers/getcustomerbyuserid?id="+id
    return this.httpClient.get<SingleResponseModel<Customer>>(newPath);
    
  }

  addCustomer(customer: Customer): Observable<SingleResponseModel<number>> {
    let newPath = environment.apiUrl + 'customers/add';
    return this.httpClient.post<SingleResponseModel<number>>(newPath, customer);
  }
}

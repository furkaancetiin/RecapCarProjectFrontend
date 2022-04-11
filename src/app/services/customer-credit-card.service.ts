import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CreditCard } from '../models/creditCard';
import { CustomerCreditCard } from '../models/customerCreditCard';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CustomerCreditCardService {

  constructor(private httpClient:HttpClient) { }

  getCustomerCreditCardById(customerId:number){
    let newPath = environment.apiUrl + "customercreditcards/getcustomercreditcardbyid?id="+customerId
    return this.httpClient.get<ListResponseModel<CreditCard>>(newPath);
  }
}

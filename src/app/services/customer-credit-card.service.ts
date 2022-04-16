import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreditCard } from '../models/creditCard';
import { CustomerCreditCardModel } from '../models/customerCreditCardModel';
import { ListResponseModel } from '../models/listResponseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CustomerCreditCardService {

  constructor(private httpClient:HttpClient) { }

  getCustomerCreditCardById(customerId:number){
    let newPath = environment.apiUrl + "customercreditcards/getcustomercreditcardbyid?id="+customerId
    return this.httpClient.get<ListResponseModel<CreditCard>>(newPath);
  }

  saveCustomerCreditCard(customerCreditCardModel:CustomerCreditCardModel):Observable<SingleResponseModel<CustomerCreditCardModel>>{
    let newPath = environment.apiUrl+"customercreditcards/savecustomercreditcard";
    return this.httpClient.post<SingleResponseModel<CustomerCreditCardModel>>(newPath,customerCreditCardModel);
  }
}
  

import { Rental } from "./rental";
import { SingleFindexPoint } from "./singleFindexPoint";

export class RentPaymentRequest {
    cardNumber:string;
    expireMonthAndYear:string;    
    cvc:string;
    cardHolderFullName:string;
    customerId:number;
    rentals:Rental[];   
    findexScores:SingleFindexPoint[]; 
    amount:number;
  }
import { CarImageDetail } from "./carImageDetail";

export interface CarDetail{
    carId:number;
    carName:string,
    image:CarImageDetail[],
    brandName:string,
    colorName:string,
    modelYear:number,
    dailyPrice:number,
    description:string,   
}
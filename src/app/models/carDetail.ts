import { CarImageDetail } from "./carImageDetail";

export class CarDetail{
    carId:number;
    brandId:number;
    colorId:number;
    carName:string;
    image:CarImageDetail[];
    brandName:string;
    colorName:string;
    modelYear:number;
    dailyPrice:number;
    description:string; 
    findexScore:number; 
}
import { Pipe, PipeTransform } from '@angular/core';
import { Car } from '../models/car';
import { CarDetail } from '../models/carDetail';

@Pipe({
  name: 'carFilter'
})
export class CarFilterPipe implements PipeTransform {

  transform(value: CarDetail[], filterText: string): CarDetail[] {
    filterText = filterText?filterText.toLocaleLowerCase():null
    return filterText?value.filter((c:CarDetail)=>c.brandName.toLocaleLowerCase().indexOf(filterText)!==-1):value;
  }
}

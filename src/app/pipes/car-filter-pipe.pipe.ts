import { Pipe, PipeTransform } from '@angular/core';
import { CarDetail } from '../models/entities/carDetail';
@Pipe({
  name: 'carFilterPipe'
})
export class CarFilterPipePipe implements PipeTransform {

  transform(value: CarDetail[], carFilterText:string): CarDetail[] {
    carFilterText = carFilterText ? carFilterText.toLocaleLowerCase() : "";
    return carFilterText ?  value.filter(c=>c.carName.toLocaleLowerCase().indexOf(carFilterText) !== -1) : value;
  }

}

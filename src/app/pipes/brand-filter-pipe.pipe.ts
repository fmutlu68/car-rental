import { Pipe, PipeTransform } from '@angular/core';
import { Brand } from '../models/entities/brand';

@Pipe({
  name: 'brandFilterPipe'
})
export class BrandFilterPipePipe implements PipeTransform {

  transform(value: Brand[], brandFilterText:string): Brand[] {
    brandFilterText = brandFilterText ? brandFilterText.toLocaleLowerCase() : "";
    return brandFilterText ?  value.filter(b=>b.name.toLocaleLowerCase().indexOf(brandFilterText)!==-1) : value;
  }

}

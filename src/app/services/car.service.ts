import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { CarResponseModel } from '../models/responses/carResponseModel';
import { CarDetailResponseModel } from '../models/responses/carDetailResponseModel';
import { ListResponseModel } from '../models/responses/listResponseModel';
import { Car } from '../models/entities/car';
import { CarDetail } from '../models/entities/carDetail';
import { EntityResponseModel } from '../models/responses/entityResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  apiUrl : string = "http://localhost:61956/api/cars/";
  constructor(private httpClient : HttpClient) { }

  getCars() : Observable<ListResponseModel<Car>>{
    return this.httpClient.get<ListResponseModel<Car>>(this.apiUrl + "getall");
  }
  getCarsDetails() : Observable<ListResponseModel<CarDetail>> {
    return this.httpClient.get<ListResponseModel<CarDetail>>(this.apiUrl + "getcardetails");
  }
  getCarsByColor(colorId:number) : Observable<ListResponseModel<CarDetail>> {
    return this.httpClient.get<ListResponseModel<CarDetail>>(this.apiUrl + "getdetailsbycolor?colorId="+colorId);
  }
  getCarsByBrand(brandId:number) : Observable<ListResponseModel<CarDetail>> {
    return this.httpClient.get<ListResponseModel<CarDetail>>(this.apiUrl + "getdetailsbybrand?brandid="+brandId);
  }
  getCarById(carId:number) : Observable<EntityResponseModel<CarDetail>> {
    return this.httpClient.get<EntityResponseModel<CarDetail>>(this.apiUrl + "getcardetailbyid?carId="+carId);
  }
}

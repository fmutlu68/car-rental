import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { CarResponseModel } from '../models/responses/carResponseModel';
import { CarDetailResponseModel } from '../models/responses/carDetailResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  apiUrl : string = "http://localhost:61956/api/cars/";
  constructor(private httpClient : HttpClient) { }

  getCars() : Observable<CarResponseModel>{
    return this.httpClient.get<CarResponseModel>(this.apiUrl + "getall");
  }
  getCarsDetails() : Observable<CarDetailResponseModel> {
    return this.httpClient.get<CarDetailResponseModel>(this.apiUrl + "getcardetails");
  }
}

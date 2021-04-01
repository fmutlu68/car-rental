import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { CarResponseModel } from '../models/responses/carResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  apiUrl : string = "http://localhost:61956/api/cars/";
  constructor(private HttpClient : HttpClient) { }

  getCars() : Observable<CarResponseModel>{
    return this.HttpClient.get<CarResponseModel>(this.apiUrl + "getall");
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarImageResponseModel } from '../models/responses/carImageResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarImageService {
  apiUrl : string = "http://localhost:61956/api/carimages/";
  constructor(private httpClient : HttpClient) { }

  getCarImages() : Observable<CarImageResponseModel> {
    return this.httpClient.get<CarImageResponseModel>(this.apiUrl + "getall");
  }
}

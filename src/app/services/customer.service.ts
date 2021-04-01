import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { ColorResponseModel } from '../models/responses/ColorResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  apiUrl : string = "http://localhost:61956/api/customers/";
  constructor(private httpClient : HttpClient) { }

  getCustomers() : Observable<ColorResponseModel> {
    return this.httpClient.get<ColorResponseModel>(this.apiUrl + "getall");
  }
}

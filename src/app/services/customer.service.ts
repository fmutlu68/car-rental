import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { CustomerResponseModel } from '../models/responses/customerResponseModel';
import { CustomerDetail } from '../models/entities/customerDetail';
import { ListResponseModel } from '../models/responses/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  apiUrl : string = "http://localhost:61956/api/customers/";
  constructor(private httpClient : HttpClient) { }

  getCustomers() : Observable<CustomerResponseModel> {
    return this.httpClient.get<CustomerResponseModel>(this.apiUrl + "getall");
  }
  getCustomerDetails() : Observable<ListResponseModel<CustomerDetail>>{
    return this.httpClient.get<ListResponseModel<CustomerDetail>>(this.apiUrl + "getdetails");
  }
}

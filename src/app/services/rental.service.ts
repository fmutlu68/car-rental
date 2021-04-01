import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RentalResponseModel } from '../models/responses/rentalResponseModel';

@Injectable({
  providedIn: 'root'
})
export class RentalService {
  apiUrl : string = "http://localhost:61956/api/rentals/";
  constructor(private httpClient : HttpClient) { }

  getRentals() : Observable<RentalResponseModel> {
    return this.httpClient.get<RentalResponseModel>(this.apiUrl + "getrentaldetails");
  }
}

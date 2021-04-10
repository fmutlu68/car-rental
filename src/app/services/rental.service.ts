import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RentalRentDetail } from '../models/entities/rentalRentDetail';
import { ResponseModel } from '../models/responses/responseModel';
import { RentalResponseModel } from '../models/responses/rentalResponseModel';

@Injectable({
  providedIn: 'root'
})
export class RentalService {
  apiUrl : string = "http://localhost:61956/api/rentals/";
  headers = { 'content-type': 'application/json'}  
  constructor(private httpClient : HttpClient) { }

  getRentals() : Observable<RentalResponseModel> {
    return this.httpClient.get<RentalResponseModel>(this.apiUrl + "getrentaldetails");
  }
  rentACar(rentalRentDetail : RentalRentDetail) : Observable<ResponseModel> {
    console.log("Renting A Car");
    return this.httpClient.post<ResponseModel>(this.apiUrl + "rentacar",JSON.stringify(rentalRentDetail),{headers:this.headers});
  }
}

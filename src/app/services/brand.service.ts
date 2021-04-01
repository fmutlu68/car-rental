import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { BrandResponseModel } from '../models/responses/brandResponseModel';

@Injectable({
  providedIn: 'root'
})

export class BrandService {
  apiUrl : string = "http://localhost:61956/api/brands/";
  
  constructor(private httpClient : HttpClient) { }

  getBrands() : Observable<BrandResponseModel>{
    return this.httpClient.get<BrandResponseModel>(this.apiUrl + "getall");
  }
}

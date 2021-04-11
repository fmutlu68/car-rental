import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaderResponse } from "@angular/common/http";
import { Observable } from 'rxjs';
import { BrandResponseModel } from '../models/responses/brandResponseModel';
import { Brand } from '../models/entities/brand';
import { ResponseModel } from '../models/responses/responseModel';

@Injectable({
  providedIn: 'root'
})

export class BrandService {
  apiUrl : string = "http://localhost:61956/api/brands/";
  
  constructor(private httpClient : HttpClient) { }

  getBrands() : Observable<BrandResponseModel>{
    return this.httpClient.get<BrandResponseModel>(this.apiUrl + "getall");
  }
  deleteBrand(brand:Brand): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl+"delete",brand);
  }
  addBrand(brand:Brand) : Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + "add",brand);
  }
  updateBrand(brand:Brand): Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl + "update",brand);
  }
}

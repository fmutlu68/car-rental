import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { ColorResponseModel } from '../models/responses/colorResponseModel';
import { Color } from '../models/entities/color';
import { ResponseModel } from '../models/responses/responseModel';

@Injectable({
  providedIn: 'root'
})
export class ColorService {
  apiUrl : string = "http://localhost:61956/api/colors/";
  headers = { 'content-type': 'application/json'}  
  constructor(private httpClient : HttpClient) { }

  getColors() : Observable<ColorResponseModel> {
    return this.httpClient.get<ColorResponseModel>(this.apiUrl + "getall");
  }
  addColor(color:Color) : Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + "add",this.convertToJSON(color),{headers:this.headers});
  }
  deleteColor(color:Color) : Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + "delete",this.convertToJSON(color),{headers:this.headers});
  }

  convertToJSON(color:Color) {
    return JSON.stringify(color);
  }
}

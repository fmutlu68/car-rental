import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { RentalRentDetail } from '../models/entities/rentalRentDetail';
@Injectable({
  providedIn: 'root'
})
export class DataSharingService {
  public isBrandAffected : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isColorAffected : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public rentalRentDetail : BehaviorSubject<RentalRentDetail> = new BehaviorSubject<RentalRentDetail>(null);
  constructor() { }
}

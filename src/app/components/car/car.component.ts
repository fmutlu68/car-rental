import { Component, OnInit } from '@angular/core';
import { Car } from 'src/app/models/entities/car';
import { CarDetail } from 'src/app/models/entities/carDetail';
import { CarResponseModel } from 'src/app/models/responses/carResponseModel';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {
  dataLoaded : boolean = false;
  cars : CarDetail[] = [];
  constructor(private carService : CarService) { }

  ngOnInit(): void {
    this.loadCars();
  }

  loadCars() {
    this.carService.getCarsDetails().subscribe(response=>{
      this.cars = response.data;
      this.dataLoaded = true;
    });
  }
}

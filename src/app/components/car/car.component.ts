import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  constructor(private carService : CarService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(params=>{
      console.log(params);
      console.log(params["colorId"]);
      if (params["brandId"] != undefined){
        this.loadCarsByBrand(params["brandId"]);
      }else if (params["colorId"] != undefined){
        this.loadCarsByColor(params["colorId"]);
      }else{
        this.loadCars();
      }
    });
  }
  loadCarsByColor(colorId: number) {
    this.dataLoaded = false;
    this.cars = [];
    this.carService.getCarsByColor(colorId).subscribe(response=>{
      console.log(response.data);
      this.cars = response.data;
      this.dataLoaded = true;
    });
  }

  loadCars() {
    this.dataLoaded = false;
    this.cars = [];
    this.carService.getCarsDetails().subscribe(response=>{
      this.cars = response.data;
      this.dataLoaded = true;
    });
  }
  loadCarsByBrand(brandId: number) {
    this.dataLoaded = false;
    this.cars = [];
    this.carService.getCarsByBrand(brandId).subscribe(response=>{
      console.log(response.data);
      this.cars = response.data;
      this.dataLoaded = true;
    });
  }
  
}

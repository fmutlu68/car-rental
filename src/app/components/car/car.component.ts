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
  selectedOperation : string = "";
  dataLoaded : boolean = false;
  carFilterText : string = "";
  cars : CarDetail[] = [];
  constructor(private carService : CarService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(params=>{
      if (params["brandId"] != undefined){
        this.loadCarsByBrand(params["brandId"]);
        this.selectedOperation = "Brand";
      }else if (params["colorId"] != undefined){
        this.loadCarsByColor(params["colorId"]);
        this.selectedOperation = "Color";
      }else{
        this.loadCars();
      }
    });
  }
  loadCarsByColor(colorId: number) {
    this.dataLoaded = false;
    this.cars = [];
    this.carService.getCarsByColor(colorId).subscribe(response=>{
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
      this.cars = response.data;
      this.dataLoaded = true;
    });
  }
  
}

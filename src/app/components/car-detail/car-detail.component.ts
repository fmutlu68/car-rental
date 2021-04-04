import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarDetail } from 'src/app/models/entities/carDetail';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {
  dataLoaded : boolean = false;
  carImages : string[] = [];
  currentImage : number = -1;
  carDetail:CarDetail = {
    brandName:"",
    carName:"",
    colorName:"",
    dailyPrice:"0",
    modelYear:"0000",
    imageList: [],
    brandId:0,
    carId:0,
    colorId:0,
  };
  carId:number = 0;
  constructor(private carService : CarService, private activatedRoute : ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if (params["carId"] != undefined){
        this.carId = params["carId"];
        this.loadSelectedCar();
      }
    });
  }

  loadSelectedCar() {
    this.carService.getCarById(this.carId).subscribe(data=>{
      this.carDetail = data.data;
      this.carImages = this.carDetail.imageList;
      this.dataLoaded = data.success;
      this.currentImage = this.carImages.length - 1;
    });
  }

  getImageLink(image:string) {
    let link = "http://localhost:61956"+ image;
    console.log("CurrentImageIndex: " + this.currentImage);
    return link;
  }
  getCurrentImageNumber(image:string){
    return this.carImages.indexOf(image);
  }
  getIndicatorClass(image:string) {
    if (this.carImages.indexOf(image) == this.currentImage){
      return "active";
    }else{
      return "";
    }
  }
  getCarouselItemClass(image:string) {
    if (this.carImages.indexOf(image) == this.currentImage){
      return "carousel-item active";
    }else{
      return "carousel-item";
    }
  }
}

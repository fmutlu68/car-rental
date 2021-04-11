import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';

import { CarDetail } from 'src/app/models/entities/carDetail';
import { CustomerDetail } from 'src/app/models/entities/customerDetail';
import { RentalRent } from 'src/app/models/entities/rentalRent';
import { RentalRentDetail } from 'src/app/models/entities/rentalRentDetail';
import { CarService } from 'src/app/services/car.service';
import { CustomerService } from 'src/app/services/customer.service';
import { DataSharingService } from 'src/app/services/data-sharing.service';

import { ToastrService } from 'ngx-toastr';
import { ParseTreeResult } from '@angular/compiler';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {
  dataLoaded : boolean = false;
  rentDate : string;
  returnDate : string;
  selectedCurrentCustomerId : number;
  carImages : string[] = [];
  customers : CustomerDetail[] = [];
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
    isRentedNow:false
  };
  carId:number = 0;
  constructor(private carService : CarService, 
    private activatedRoute : ActivatedRoute, 
    private customerService : CustomerService,
    private toastrService : ToastrService,
    private dataSharingService : DataSharingService,
    private router : Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if (params["carId"] != undefined){
        this.carId = params["carId"];
        this.loadSelectedCar();
        this.loadCustomers();
      }
    });
  }

  loadSelectedCar() {
    this.carService.getCarDetailById(this.carId).subscribe(data=>{
      this.carDetail = data.data;
      this.carImages = this.carDetail.imageList;
      this.dataLoaded = data.success;
      if (this.carImages !== null){
        this.currentImage = this.carImages.length - 1;
      }
    });
  }

  loadCustomers() {
    this.customerService.getCustomerDetails().subscribe(response=>{
      this.customers = response.data;
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
  routeToRentalPayment() {
    let rentalDetail : RentalRentDetail = new RentalRentDetail();
    if (this.carId){
      rentalDetail.currentRental = {} as RentalRent;
      rentalDetail.currentRental.carId = parseInt(this.carId.toString());
    }else{
      this.toastrService.error("Araba Seçilmemiş.","Hata");
      return;
    }
    if (typeof(this.selectedCurrentCustomerId) === "number" ){
      rentalDetail.currentRental.customerId = this.selectedCurrentCustomerId;
    }else {
      this.toastrService.error("Bir Müşteri Seçmelisiniz","Hata");
      return;
    }
    if (typeof(this.rentDate) === "string" && this.rentDate){
      rentalDetail.currentRental.rentDate = new Date(this.rentDate);
    }else{
      this.toastrService.error("Bir Başlangıç Tarihi Seçmelisiniz","Hata");
      return;
    }
    if (typeof(this.returnDate) === "string" && this.returnDate){
      rentalDetail.currentRental.returnDate = new Date(this.returnDate);
    }else{
      this.toastrService.error("Bir Bitiş Tarihi Seçmelisiniz","Hata");
      return;
    }
    rentalDetail.dayNumber = (rentalDetail.currentRental.returnDate.valueOf() - rentalDetail.currentRental.rentDate.valueOf()) / 86400000;
    if (rentalDetail.dayNumber <=0){
      this.toastrService.error("Tarih Seçimlerini Yeniden Yapınız.");
      return;
    }else if (this.checkDate(rentalDetail.currentRental.rentDate)){
      this.toastrService.error("Kiralama Başlangıç Tarihi En Geç Bugün Olarak Seçilmelidir.");
      return;
    }
    rentalDetail.car = {
      brandId : this.carDetail.brandId,
      colorId : this.carDetail.colorId,
      dailyPrice : parseInt(this.carDetail.dailyPrice),
      description : this.carDetail.carName,
      id : parseInt(this.carDetail.carId.toString()),
      modelYear : this.carDetail.modelYear
    }
    this.dataSharingService.rentalRentDetail.next(rentalDetail);
    console.log(this.dataSharingService.rentalRentDetail.getValue());
    this.router.navigate(["/cars/payment"])
  }

  getTodayDate(){
    let date : string = "";
    let todayDate : Date = new Date(Date.now());
    date = todayDate.getUTCFullYear() + "-" + (todayDate.getMonth() +1) + "-" + todayDate.getDate();
    return date;
  }

  checkDate(willCheckDate : Date) :boolean{
    let strDateTime = willCheckDate.toISOString();
    let todayDate:string[] = this.getTodayDate().split("-");
    let strDate:string[] = strDateTime.split("T")[0].split("-");
    if (strDate[0]!==todayDate[0]){
      return false;
    }else if (strDate[1]!==todayDate[1]){
      return false;
    }else if (strDate[2]!==todayDate[2]){
      return false;
    }
    return true;
  }
}

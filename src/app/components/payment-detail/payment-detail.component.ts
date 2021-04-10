import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CreditCard } from 'src/app/models/entities/creditCard';
import { RentalRentDetail } from 'src/app/models/entities/rentalRentDetail';
import { DataSharingService } from 'src/app/services/data-sharing.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-payment-detail',
  templateUrl: './payment-detail.component.html',
  styleUrls: ['./payment-detail.component.css']
})
export class PaymentDetailComponent implements OnInit {

  rentalDetail : RentalRentDetail;
  expirationMonth:number;
  expirationYear:number;
  constructor(
    private dataSharingService : DataSharingService, 
    private rentalService : RentalService,
    private toastrService : ToastrService) { }

  ngOnInit(): void {
    this.loadRental();
  }
  loadRental() {
    this.rentalDetail = this.dataSharingService.rentalRentDetail.getValue();
    this.rentalDetail.currentCreditCard = {} as CreditCard;
    // this.rentalDetail = {
    //   dayNumber : 8,
    //   car : {
    //     brandId : 4002,
    //     colorId: 4003,
    //     dailyPrice : 350,
    //     description : "Passat",
    //     id: 2005,
    //     modelYear : "2015"
    //   },
    //   rental:{
    //     carId:2005,
    //     customerId:2,
    //     rentDate: new Date("Sun Apr 11 2021 03:00:00 GMT+0300 (GMT+03:00)"),
    //     returnDate: new Date("Sun Apr 18 2021 03:00:00 GMT+0300 (GMT+03:00)")
    //   }
    // }
  }
  calculateTotalAmount() {
    let totalAmount : number = this.rentalDetail.car.dailyPrice * this.rentalDetail.dayNumber; 
    return totalAmount + (totalAmount*18/100);
  }
  pay() {
    this.rentalDetail.currentCreditCard.expirationDate = new Date();
    this.rentalDetail.paymentAmount = this.calculateTotalAmount(); 
    this.rentalDetail.currentCreditCard.expirationDate.setUTCFullYear(this.expirationYear,this.expirationMonth,1);
    this.toastrService.info("Lütfen Bekleyiniz","Bilgi");
    this.rentalService.rentACar(this.rentalDetail).subscribe(response=>{
      console.log(response);
      if (response.success){
        this.toastrService.success(response.message,"İşlem Başarılı");
      }else{
        this.toastrService.error(response.message,"İşlem Başarısız");
      }
    });
  }
}

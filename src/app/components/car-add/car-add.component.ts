import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,FormControl,Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/entities/brand';
import { Car } from 'src/app/models/entities/car';
import { Color } from 'src/app/models/entities/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css']
})
export class CarAddComponent implements OnInit {
  carAddForm : FormGroup;
  carId : number;
  willUpdateCar : Car;
  brands: Brand[] = [];
  colors: Color[] = [];
  constructor(
    private formBuilder:FormBuilder, 
    private brandService:BrandService, 
    private colorService:ColorService,
    private carService:CarService,
    private toastrService:ToastrService,
    private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if (params["willUpdateCarId"]){
        this.carId = params["willUpdateCarId"];
        this.loadWillUpdateCar();
      }
    });
    this.createAddCarForm();
    this.loadBrandsAndColors();
  }
  loadWillUpdateCar() {
    this.carService.getCarById(this.carId).subscribe(response=>{
      this.willUpdateCar = response.data;
      this.createAddCarForm();
    });
  }
  createAddCarForm() {
    if (this.willUpdateCar){
      this.carAddForm = this.formBuilder.group({
        description: [this.willUpdateCar.description,Validators.required],
        dailyPrice: [this.willUpdateCar.dailyPrice,Validators.required],
        modelYear: [this.willUpdateCar.modelYear,Validators.required],
        colorId : [this.willUpdateCar.colorId,Validators.required],
        brandId : [this.willUpdateCar.brandId,Validators.required]
      });
      return;
    }
    this.carAddForm = this.formBuilder.group({
      description : ["",Validators.required],
      dailyPrice : ["",Validators.required],
      modelYear : ["",Validators.required],
      colorId : ["",Validators.required],
      brandId : ["",Validators.required]
    });
  }

  loadBrandsAndColors() {
    this.brandService.getBrands().subscribe(response=>{
      if (response.success){
        this.brands = response.data;
      }
    },errorResponse=>{
      this.brands.push({id:1,name:"Bir Hata Oluştu."})
    });
    this.colorService.getColors().subscribe(response=>{
      if (response.success){
        this.colors = response.data;
      }
    },errorResponse=>{
      this.colors.push({id:1,name:"Bir Hata Oluştu."})
    });
  }
  addCar() {
    let infoMessage = this.toastrService.info("Lütfen Bekleyiniz.","Bilgi");
    if(this.carAddForm.valid){
      let carAddModel = Object.assign({},this.carAddForm.value);
      if (this.willUpdateCar){
        carAddModel.id = this.willUpdateCar.id;
        this.carService.updateCar(carAddModel).subscribe(response=>{
          this.toastrService.remove(infoMessage.toastId);
          if (response.success){
            this.toastrService.success(response.message,"İşlem Başarılı");
          }else{
            this.toastrService.error(response.message,"İşlem Başarısız.");
          }
        },responseErr=>{
          this.toastrService.remove(infoMessage.toastId);
          for (let i = 0; i < responseErr.error.Errors.length; i++) {
            this.toastrService.error(responseErr.error.Errors[i].ErrorMessage, responseErr.error.Errors[i].PropertyName + " Hatası");
          }
        });
      }
      this.carService.addCar(carAddModel).subscribe(response=>{
        this.toastrService.remove(infoMessage.toastId);
        if (response.success){
          this.toastrService.success(response.message,"İşlem Başarılı");
        }else{
          this.toastrService.error(response.message,"İşlem Başarısız.");
        }
      },responseErr=>{
        this.toastrService.remove(infoMessage.toastId);
        for (let i = 0; i < responseErr.error.Errors.length; i++) {
          this.toastrService.error(responseErr.error.Errors[i].ErrorMessage, responseErr.error.Errors[i].PropertyName + " Hatası");
        }
      });
    }
  }
}

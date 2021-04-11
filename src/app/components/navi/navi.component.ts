import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,FormControl,Validators } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';

import { Brand } from 'src/app/models/entities/brand';
import { Color } from 'src/app/models/entities/color';
import { BrandService } from 'src/app/services/brand.service';
import { ColorService } from 'src/app/services/color.service';
import { DataSharingService } from 'src/app/services/data-sharing.service';
@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {

  brands : Brand[] = [];
  colors : Color[] = [];
  updateColorId:number = -1;
  updateBrandId:number = -1;
  naviBrandFilterText : string = "";
  naviColorFilterText : string = "";
  brandForm : FormGroup;
  colorForm : FormGroup;
  constructor(
    private brandService : BrandService,
    private colorService : ColorService, 
    private toastrService : ToastrService,
    private dataSharingService : DataSharingService,
    private formBuilder : FormBuilder) { }

  ngOnInit(): void {
    this.loadBrands();
    this.loadColors();
    this.prepareBrandForm(null);
    this.prepareColorForm(null);
  }
  loadBrands() {
    this.brandService.getBrands().subscribe(r=>{
      this.brands = r.data;
    });
  }
  loadColors() {
    this.colorService.getColors().subscribe(r=>{
      this.colors = r.data;
    });
  }
  deleteCurrentBrand(brand : Brand) {
    let activeToast = this.toastrService.info("Lütfen Bekleyiniz","Bilgi");
    this.brandService.deleteBrand(brand).subscribe(response=>{
      if (response.success){
        this.toastrService.remove(activeToast.toastId);
        this.toastrService.success(response.message,"Silme İşlemi");
        this.loadBrands();
      }else{
        this.toastrService.error(response.message,"İşlem Başarısız");
      }
    });
  }
  insOrUpBrand(operationName:string) {
    if (this.brandForm.valid){
      let activeToast = this.toastrService.info("Lütfen Bekleyiniz","Bilgi");
      let brandModel = Object.assign({},this.brandForm.value);
      if (operationName === "Marka Güncelle"){
        brandModel.id = this.updateBrandId;
        this.brandService.updateBrand(brandModel).subscribe(response=>{
          if (response.success === true){
            this.dataSharingService.isBrandAffected.next(true);
            this.toastrService.remove(activeToast.toastId);
            this.toastrService.success(response.message,"İşlem Başarılı");
          }else{
            this.toastrService.error(response.message,"İşlem Başarısız");
          }
        });
        this.updateBrandId = -1;
      }else{
        this.brandService.addBrand(brandModel).subscribe(response=>{
          if (response.success === true){
            this.dataSharingService.isBrandAffected.next(true);
            this.toastrService.remove(activeToast.toastId);
            this.toastrService.success(response.message,"İşlem Başarılı");
          }else{
            this.toastrService.error(response.message,"İşlem Başarısız");
          }
        });
      }
      
    }else{
      this.toastrService.error("Kesinlikle Girilmesi Gereken Özellikler Girilmemiş.","Hata");
    }
    
  }
  deleteCurrentColor(color : Color) {
    let activeToast = this.toastrService.info("Lütfen Bekleyiniz","Bilgi");
    this.colorService.deleteColor(color).subscribe(response=>{
      if (response.success){
        this.dataSharingService.isColorAffected.next(true);
        this.toastrService.remove(activeToast.toastId);
        this.toastrService.success(response.message,"Silme İşlemi");
        this.loadColors();
      }else{
        this.toastrService.error(response.message,"İşlem Başarısız");
      }
    });
  }
  insOrUpColor(operationName:string) {
    if (this.colorForm.valid){
      let activeToast = this.toastrService.info("Lütfen Bekleyiniz","Bilgi");
      let color = Object.assign({},this.colorForm.value);
      if (operationName === "Renk Güncelle"){
        color.id = this.updateColorId;
        this.colorService.updateColor(color).subscribe(response=>{
          this.dataSharingService.isColorAffected.next(true);
          if (response.success === true){
            this.toastrService.remove(activeToast.toastId);
            this.toastrService.success(response.message,"İşlem Başarılı");
          }else{
            this.toastrService.error(response.message,"İşlem Başarısız");
          }
        });
        this.updateColorId = -1;
        return;
      }
      this.colorService.addColor(color).subscribe(response=>{
        this.dataSharingService.isColorAffected.next(true);
        if (response.success === true){
          this.toastrService.remove(activeToast.toastId);
          this.toastrService.success(response.message,"İşlem Başarılı");
        }else{
          this.toastrService.error(response.message,"İşlem Başarısız");
        }
      });
    }else{
      this.toastrService.error("Kesinlikle Girilmesi Gereken Özellikler Girilmemiş.","Hata");
    }
  }
  prepareBrandForm(brand:Brand|null) {
    if (brand === null){
      this.brandForm = this.formBuilder.group({
        name:["",Validators.required]
      });
      return;
    }
    this.brandForm = this.formBuilder.group({
      name:[brand.name,Validators.required]
    });
    this.updateBrandId=brand.id;
  }
  prepareColorForm(color:Color|null) {
    console.log("Color: " + color);
    if (color === null){
      this.colorForm = this.formBuilder.group({
        name:["",Validators.required]
      });
      return;
    }
    this.colorForm = this.formBuilder.group({
      name:[color.name,Validators.required]
    });
    this.updateColorId=color.id;
  }
  getBrandModalTitle(){
    if (this.updateColorId !== -1){
      return "Marka Güncelle"
    }
    return "Marka Ekle"
  }
  getColorModalTitle(){
    if (this.updateColorId !== -1){
      return "Renk Güncelle"
    }
    return "Renk Ekle"
  }
  clearAllBrandCRUDCache() {
    this.updateBrandId = -1;
  }
  clearAllColorCRUDCache() {
    this.updateColorId = -1;
  }
}

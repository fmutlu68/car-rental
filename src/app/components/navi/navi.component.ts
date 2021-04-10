import { Component, OnInit } from '@angular/core';
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
  naviBrandFilterText : string = "";
  naviColorFilterText : string = "";
  naviBrandNameText : string = "";
  naviColorNameText : string = "";
  constructor(
    private brandService : BrandService,
    private colorService : ColorService, 
    private toastrService : ToastrService,
    private dataSharingService : DataSharingService) { }

  ngOnInit(): void {
    this.loadBrands();
    this.loadColors();
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
  addBrand() {
    let activeToast = this.toastrService.info("Lütfen Bekleyiniz","Bilgi");
    let brand = {name:this.naviBrandNameText} as Brand;
    this.brandService.addBrand(brand).subscribe(response=>{
      if (response.success === true){
        this.dataSharingService.isBrandAffected.next(true);
        this.toastrService.remove(activeToast.toastId);
        this.toastrService.success(response.message,"İşlem Başarılı");
      }else{
        this.toastrService.error(response.message,"İşlem Başarısız");
      }
    });
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
  addColor() {
    let activeToast = this.toastrService.info("Lütfen Bekleyiniz","Bilgi");
    let color = {name:this.naviColorNameText} as Color;
    this.colorService.addColor(color).subscribe(response=>{
      this.dataSharingService.isColorAffected.next(true);
      if (response.success === true){
        this.toastrService.remove(activeToast.toastId);
        this.toastrService.success(response.message,"İşlem Başarılı");
      }else{
        this.toastrService.error(response.message,"İşlem Başarısız");
      }
    });
  }
}

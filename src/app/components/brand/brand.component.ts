import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Brand } from 'src/app/models/entities/brand';
import { BrandResponseModel } from 'src/app/models/responses/brandResponseModel';
import { BrandService } from 'src/app/services/brand.service';
import { DataSharingService } from 'src/app/services/data-sharing.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {
  dataLoaded : boolean = false;
  isBrandAffected : boolean = false;
  brandFilterText : string = "";
  currentBrand : Brand = {
    id : -1,
    name : "",
  };
  brands : Brand[] = [];
  brandResponseModel : BrandResponseModel = {
    data : this.brands,
    message : "",
    success : false,
  };
  constructor(private brandService : BrandService, private dataSharingService : DataSharingService) { 
    dataSharingService.isBrandAffected.subscribe(isAffected=>{
      this.isBrandAffected = isAffected;
      this.checkIsBrandAffected();
    });
  }

  ngOnInit(): void {
    this.loadBrands();
  }

  loadBrands() {
    this.brandService.getBrands().subscribe(response=>{
      this.brandResponseModel = response;
      this.brands = response.data;
      this.dataLoaded = true;
    });
  }

  setCurrentBrand(brand: Brand | undefined) {
    if (brand === undefined){
      this.currentBrand = {
        id: -1,
        name: "",
      }
    }else{
      this.currentBrand = brand;
    }
  }
  getCurrentBrandClass(brand: Brand){
    if (brand == this.currentBrand){
      return "list-group-item active";
    }else{
      return "list-group-item";
    }
  }
  getAllBrandClass() {
    if (this.currentBrand.id === -1){
      return "list-group-item active";
    }else{
      return "list-group-item";
    }
  }
  checkIsBrandAffected() {
    if (this.isBrandAffected === true){
      this.dataLoaded = false;
      this.loadBrands();
      this.dataSharingService.isBrandAffected.next(false);
      this.isBrandAffected = false;
    }
  }
}


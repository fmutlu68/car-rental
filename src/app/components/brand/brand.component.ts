import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Brand } from 'src/app/models/entities/brand';
import { BrandResponseModel } from 'src/app/models/responses/brandResponseModel';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {
  dataLoaded : boolean = false;
  currentBrand : Brand = {
    id: -1,
    name: "",
  }
  brands : Brand[] = [];
  brandResponseModel : BrandResponseModel = {
    data : this.brands,
    message : 'Yükleniyor.',
    success : false
  };
  constructor(private brandService : BrandService) { }

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
}

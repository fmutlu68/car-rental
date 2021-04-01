import { Component, OnInit } from '@angular/core';
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
}

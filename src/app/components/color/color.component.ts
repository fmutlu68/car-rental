import { Component, OnInit } from '@angular/core';
import { Color } from 'src/app/models/entities/color';
import { ColorResponseModel } from 'src/app/models/responses/colorResponseModel';
import { ColorService } from 'src/app/services/color.service';
import { DataSharingService } from 'src/app/services/data-sharing.service';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css']
})
export class ColorComponent implements OnInit {

  dataLoaded : boolean = false;
  isColorAffected : boolean = false;
  colorFilterText : string = "";
  currentColor: Color = {
    id:-1,
    name:"",
  }
  colors : Color[] = [];
  colorResponseModel : ColorResponseModel = {
    data: this.colors,
    message: "Yükleniyor..",
    success: false
  };
  constructor(private colorService : ColorService, private dataSharingService : DataSharingService) { 
    dataSharingService.isColorAffected.subscribe(isAffected => {
      this.isColorAffected = isAffected;
      this.checkIsColorAffected();
    });
  }
  checkIsColorAffected() {
    if (this.isColorAffected === true){
      this.dataLoaded = false;
      this.loadColors();
      this.dataSharingService.isColorAffected.next(false);
    }
  }

  ngOnInit(): void {
    this.loadColors();
  }

  loadColors() {
    this.colorService.getColors().subscribe(response=>{
      this.colorResponseModel = response;
      this.colors = response.data;
      this.dataLoaded = true;
    });
  }
  setCurrentColor(color: Color | undefined) {
    if (color === undefined){
      this.currentColor = {
        id: -1,
        name: "",
      }
    }else{
      this.currentColor = color;
    }
  }
  getCurrentColorClass(color: Color){
    if (color == this.currentColor){
      return "list-group-item active";
    }else{
      return "list-group-item";
    }
  }
  getAllColorClass() {
    if (this.currentColor.id === -1){
      return "list-group-item active";
    }else{
      return "list-group-item";
    }
  }
}

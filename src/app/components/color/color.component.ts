import { Component, OnInit } from '@angular/core';
import { Color } from 'src/app/models/entities/color';
import { ColorResponseModel } from 'src/app/models/responses/colorResponseModel';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css']
})
export class ColorComponent implements OnInit {

  dataLoaded : boolean = false;
  colors : Color[] = [];
  colorResponseModel : ColorResponseModel = {
    data: this.colors,
    message: "Yükleniyor..",
    success: false
  };
  constructor(private colorService : ColorService) { }

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
}

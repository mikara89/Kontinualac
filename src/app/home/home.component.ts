import { DataSharedService } from '../services/data-shared.service';
import { kontGreda } from 'app/models/kontGreda';
import { ParamKontGreda } from '../models/paramKontGreda';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  kontGreda:kontGreda=new kontGreda({brOslonca:2,nizRaspona:[4]});;
  isSvgUpdate:boolean;

  constructor(private dataSharedService:DataSharedService) {
   
  }
  
  ngOnInit() {
    //this.kontGreda= new kontGreda({brOslonca:2,nizRaspona:[4]});
    this.dataSharedService.onGetData.emit(this.kontGreda);
  }
  OnKonChange(changedKontGreda){
    this.kontGreda=changedKontGreda;
  }
}

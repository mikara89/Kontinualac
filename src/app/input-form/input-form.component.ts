import { FormBuilder } from '@angular/forms';
import { NgModel } from '@angular/forms/src/directives';
import { kontGreda } from 'app/models/kontGreda';
import { ParamKontGreda } from '../models/paramKontGreda';
import { ParamOpterecenja } from './../models/kontGreda';
import { OpterecenjaService } from './../services/opterecenja.service';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Opterecenje } from 'app/models/opterecenje';
import { Observable } from 'rxjs/Observable';
import { DataSharedService } from 'app/services/data-shared.service';

@Component({
  selector: 'input-form-opt',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.css']
})
export class InputFormComponent implements OnInit {

  opterecenje:Opterecenje[]=[];
  zadataOpt:ParamOpterecenja[]=[];
  opt={}as ParamOpterecenja;
  activeOpt;
  ukupnaDuzGrede:number=0;
  isDuzinaVisibly:boolean=true;
  //isCalculateDone:boolean=true;
  @Input('kontGreda')kontGreda:kontGreda;


  constructor(
    private opterecenjeServices:OpterecenjaService,
    private dataSharedService:DataSharedService
  ) { 
    this.dataSharedService.onGetData.subscribe(k => {
      this.kontGreda=k;
  });
  }

  ngOnInit() {
    this.opterecenje=this.opterecenjeServices.getOpterecenje();

    this.getDuzinaGrede();

  }
  setActiveOpt(value){
    this.activeOpt=value;
    
    this.isDuzinaVisibly=(this.activeOpt=='uprkoncsila' || this.activeOpt=='podzkoncsila' || this.activeOpt=='koncmoment')?false:true;
    let d=!this.isDuzinaVisibly ? 0 : null;
    this.opt={duzopt:d, sila:null, polozopt:null, tipopt:value}as ParamOpterecenja;
    (this.opt as ParamOpterecenja).tipopt=this.activeOpt;
  }
  addOpt(){
    //this.kontGreda.optercenja.push(this.opt);
    this.kontGreda.addOpterecenje(this.opt);
    this.opt={}as ParamOpterecenja;
    delete this.activeOpt;
    this.calculate();
  }
  removeOpt(opt:ParamOpterecenja){
    let index = this.kontGreda.optercenja.indexOf(opt, 0);
    if (index > -1) {
     
      this.kontGreda.removeOpterecenje(index);
      this.calculate();
    }
  }
  getDuzinaGrede() {
    this.kontGreda.paramKontGreda.nizRaspona.forEach(c=>{
      this.ukupnaDuzGrede=this.ukupnaDuzGrede+c;
    });
  }
  getJedMere(opt:string){
    return this.opterecenjeServices.getJedMere(opt);
  }

  validating(duzopt:NgModel,polozopt:NgModel,sila:NgModel){
    if(this.opt.duzopt!=null && 
      polozopt.valid && 
      sila.valid && 
      polozopt.value<=this.kontGreda.raspon)
      return false;
    return true;
  }

  //TODO 
  async calculate(){
    await this.kontGreda.calculateAll();
    console.log(this.kontGreda.Extrims);
    
  }
}

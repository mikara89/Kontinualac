import { kontGreda } from './../models/kontGreda';
import { DataSharedService } from './../services/data-shared.service';
import { ParamKontGreda } from '../models/paramKontGreda';
import { Component, OnInit, Output, EventEmitter, HostListener, ViewChild, ElementRef, Input, ChangeDetectorRef  } from '@angular/core';
import { ParamOpterecenja } from 'app/models/kontGreda';
import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'display-greda',
  templateUrl: './display-greda.component.html',
  styleUrls: ['./display-greda.component.css']
}) 
export class DisplayGredaComponent implements OnInit {
  pointsM="";
  pointsT="";
  oslonci=[];
  @ViewChild('myIdentifier') myIdentifier: ElementRef;
  @Input('kontGreda')kontGreda:kontGreda;
  svgWidth:number;
  svgHeight:number ;
  svgWorkingWidth:number;
  svgWorkingHeight:number;
  isSvgReady:boolean;isSvgMTNReady:boolean;
  sub:Subscription;
  constructor(private cdr: ChangeDetectorRef, private dataSharedService:DataSharedService) {
    this.sub=this.dataSharedService.onGetData.subscribe(k => {
      this.kontGreda=k as kontGreda;
      this.svgOnChange();
  });
    
  }

  ngOnInit() {
    this.kontGreda.OnChange.subscribe(c=>
      {      

          if(this.kontGreda.isResultOk) 
             this.removingMTNPath();   
    });
  }

  ngAfterViewInit() {
    this.isSvgReady=false;
    this.cdr.detectChanges();
    this.svgWidth=this.myIdentifier.nativeElement.offsetWidth;
    this.svgHeight=this.myIdentifier.nativeElement.offsetHeight-6;
    this.svgWorkingWidth=this.svgWidth-100;
    this.svgWorkingHeight=this.svgHeight-50;
    this.isSvgReady=true;
    this.cdr.detectChanges();
  }
  svgOnChange(){
    this.isSvgReady=false;
    this.cdr.detectChanges();
    this.isSvgReady=true;
    this.cdr.detectChanges();
  }
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.ngAfterViewInit(); 
    
  }
  removingMTNPath(){
    this.svgOnChange();
  }
}

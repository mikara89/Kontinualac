import { Component, OnInit, Input } from '@angular/core';
import { MarkOpt } from 'app/models/MarkOpt';
import { kontGreda } from 'app/models/kontGreda';
import { DataSharedService } from 'app/services/data-shared.service';

@Component({
  selector: 'g[crtanje-mtn]',
  templateUrl: './crtanje-mtn.component.html',
  styleUrls: ['./crtanje-mtn.component.css']
})
export class CrtanjeMTNComponent implements OnInit {

  MTN: any[];
  DrawingPath:string;
  @Input('display')display;
  //@Input('OsaStapa')OsaStapa:any[];
  @Input('pX')pX:number;
  @Input('pY')pY:number;
  @Input('scale')scale:number;
  @Input('jm')jm:number;
  @Input('kontGreda')kontGreda:kontGreda;

  markText:MarkOpt[]=[];
  //{text:"",x:0,y:0,fontSize:12 };
  constructor(private dataSharedService:DataSharedService) {

  }

  ngOnInit() {
    this.drawMTN();
    }

  
  drawMTN(): any {

    if(this.kontGreda.isResultOk){

      switch (this.display) {
        case "M":
          this.MTN=this.kontGreda.Mdij;
          break;
          case 'N':
          this.MTN=this.kontGreda.Ndij;
          break;
          case 'T':
          this.MTN=this.kontGreda.Tdij;
          break;
        default:
          break;
      }
    }

    var MTN_string=`M${this.pX},${this.pY}`;
    var x=this.MTN;
    var arr:any[]=[];
    arr.push(Math.max.apply(null,this.MTN));
    arr.push(Math.abs(Math.min.apply(null,this.MTN)));

    var sc=50/(Math.max.apply(null,arr)==0?1:Math.max.apply(null,arr));
    
    for (let i = 0; i < this.kontGreda.OsaStapa.length; i++) {
      var a=` L${this.pX+this.kontGreda.OsaStapa[i]*this.jm},${this.pY+this.MTN[i]*sc}`
      MTN_string+=a;
    }
    
    MTN_string+=` L${this.pX+this.kontGreda.OsaStapa[this.kontGreda.OsaStapa.length-1]*this.jm},${this.pY}`;// vracanje linije u poslednji oslonac

    this.DrawingPath=MTN_string;
  }
}

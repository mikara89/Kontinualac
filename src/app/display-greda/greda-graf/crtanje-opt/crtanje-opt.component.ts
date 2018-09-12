
import { Component, OnInit, Input } from '@angular/core';
import { ParamOpterecenja } from 'app/models/kontGreda';
import { MarkOpt } from 'app/models/MarkOpt';

@Component({
  selector: 'g[crtanje-opt]',
  templateUrl: './crtanje-opt.component.html',
  styleUrls: ['./crtanje-opt.component.css']
})
export class CrtanjeOptComponent implements OnInit {
  @Input('opterecenje')opt:ParamOpterecenja;
  @Input('pX')pX:number;
  @Input('pY')pY:number;
  @Input('scale')scale:number;
  @Input('jm')jm:number;
  optX:number;
  optY:number;
  markText:MarkOpt={text:"",x:0,y:0,fontSize:12 };
  drawingPath:string[]=[];
  constructor() { }

  ngOnInit() {
    this.drawOpt()
    this.optX=this.pX+this.opt.polozopt*this.jm;
    this.optY=this.pY;
  }
  drawOpt(){
    switch (this.opt.tipopt) {
      case 'uprkoncsila':
        this.uprkoncsila();
        break;
        case 'podzkoncsila':
        this.podzkoncsila();
        break;
        case 'koncmoment':
        
        break;
        case 'podopt':
        
        break;
        case 'trougdesno':
        
        break;
        case 'trouglevo':
        
        break;
      default:
        break;
    }
  }
  uprkoncsila(){
    var vLineY=this.opt.sila>0?this.pY+40:this.pY-40;
    var vLineX=this.pX+this.opt.polozopt*this.jm;
    var arrowLine=this.opt.sila>0?this.pY+10:this.pY-10;
    this.drawingPath.push(`
        M${vLineX},${vLineY} 
        L${vLineX},${this.pY} 
        M${vLineX-5},${arrowLine} 
        L${vLineX},${this.pY} 
        L${vLineX+5},${arrowLine}`)

    this.markText.fontSize=12;
    this.markText.text=`${this.opt.sila}kN`;
    this.markText.x=vLineX+20;
    this.markText.y=this.opt.sila>0?vLineY+5:vLineY;
  }
  podzkoncsila(){
    var vLineY=this.pY-10;
    var vLineX1=this.pX+this.opt.polozopt*this.jm;
    var vLineX2=this.opt.sila>0
      ?this.pX+this.opt.polozopt*this.jm+40
      :this.pX+this.opt.polozopt*this.jm-40;

    var arrowLine=this.opt.sila>0?vLineX1+10:vLineX1-10;
    this.drawingPath.push(`
        M${vLineX2},${vLineY} 
        L${vLineX1},${vLineY} 
        M${arrowLine},${vLineY-5} 
        L${vLineX1},${vLineY} 
        L${arrowLine},${vLineY+5}
        `)

    this.markText.fontSize=12;
    this.markText.text=`${this.opt.sila}kN`;
    this.markText.x=this.opt.sila>0?vLineX1+25:vLineX1-25;
    this.markText.y=vLineY-5;
  }
}

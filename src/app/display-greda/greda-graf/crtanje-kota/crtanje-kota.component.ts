import { Component, OnInit, Input } from '@angular/core';
import { Point } from 'app/models/point';

@Component({
  selector: 'g[crtanje-kota]',
  templateUrl: './crtanje-kota.component.html',
  styleUrls: ['./crtanje-kota.component.css']
})
export class CrtanjeKotaComponent implements OnInit {

  DrawingPath:string[]=[];
  DrawingText={text:"",x:0,y:0,fontSize:12 };

  @Input('startPoint')p1:Point;
  @Input('nextPoints')ps:Point[]=[];
  @Input('scale')scale:number;
  @Input('jm')jm;
  @Input('i')i;
  @Input('dimensions')dimensions:number;
  offset:number=70;
  vLineHight:number=15;

  constructor() { }

  ngOnInit() {

    this.p1.pY+=this.offset;
    this.drawingAll();

    //console.log(this.dimensions);
    
  }
drawingAll(){
  this.drawKotaBoudiry(this.dimensions);
}

drawKotaBoudiry(dis:number){
  let aLine=this.vLineHight*0.8;
  let pLocal:Point={pX:this.p1.pX+dis, pY:this.p1.pY}
  /// vertical line
  this.DrawingPath.push(
    `M${pLocal.pX-aLine/2},${pLocal.pY+aLine/2}
     L${pLocal.pX+aLine/2},${pLocal.pY-aLine/2}`)
  /// angled line   
  this.DrawingPath.push(
    `M${pLocal.pX},${pLocal.pY+(this.vLineHight/2)} 
    L${pLocal.pX},${pLocal.pY-this.vLineHight/2}`);
  /// Horizonatal line
  if(this.dimensions>0){
    this.DrawingPath.push(
      `M${pLocal.pX},${pLocal.pY} 
      L${pLocal.pX-this.dimensions},${pLocal.pY}`
    );

    this.DrawingText= {
      text:""+Math.round(this.dimensions/this.jm) +'[m]'
    , x:pLocal.pX-this.dimensions/2,y:pLocal.pY-5, fontSize:12}  
  }
 
  }

} 

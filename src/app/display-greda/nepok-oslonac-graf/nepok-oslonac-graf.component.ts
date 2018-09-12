import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'g[nepok-oslonac-graf]',
  templateUrl: './nepok-oslonac-graf.component.html',
  styleUrls: ['./nepok-oslonac-graf.component.css']
})
export class NepokOslonacGrafComponent implements OnInit {
 points:string;
 @Input('isPokretan')isPokretan:boolean;
 @Input('oznakaOslonca')oznakaOslonca:number;
 
 pointsBase:any[]=[{
    x1:'',
    y1:'',
    x2:'',
    y2:''
 }];
 baseLine={
  x1:0,
  y1:0,
  x2:0,
  y2:0
};
offset=10;
 @Input('pX')pX;
 @Input('pY')pY;
 pXc=this.pX;
 pYc=this.pY;
 xBr=this.pX+15;
 yBr=this.pY+15;
 @Input('scale')scale=1;
 

  constructor() { }

  ngOnInit() {

    this.offset=this.offset*this.scale
    this.drawTriangle();
    this.drawBase();
    
  }
  drawTriangle(){ 
    let sx=this.pX;
    let sy=this.pY;
    let p1=sx+","+sy;
    let p2=sx-this.offset+","+(sy+this.offset);
    let p3=sx+this.offset+","+(sy+this.offset);
    this.points=p1+" "+p2+" "+p3+" "+p1;
    
  }
  drawBase(){ 
    //this.pY=this.pY+(this.isPokretan?this.offset/2:0);
    let pY=this.pY+(this.isPokretan?this.offset/2:0);
    this.baseLine={
      x1:this.pX-this.offset*1,
      y1:pY+this.offset,
      x2:this.pX+this.offset*1,
      y2:pY+this.offset,
    }
    for(var i=0; i<5;i++){
      let x1=''+(this.pX-this.offset+this.offset*i/2);
      let y1=''+(pY+this.offset);
      let x2=''+((this.pX-this.offset+this.offset*i/2)-this.offset/2);
      let y2=''+((pY+this.offset)+this.offset/2);
      
      this.pointsBase.push({x1,y1,x2,y2});

    }      
  }
}

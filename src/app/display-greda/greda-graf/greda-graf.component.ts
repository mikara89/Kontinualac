import { Point } from 'app/models/point';
import { ParamKontGreda } from 'app/models/paramKontGreda';

import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { kontGreda, ParamOpterecenja } from 'app/models/kontGreda';
import { Observable } from 'rxjs/Observable';
import { DataSharedService } from 'app/services/data-shared.service';

@Component({
  selector: 'g[greda-graf]',
  templateUrl: './greda-graf.component.html',
  styleUrls: ['./greda-graf.component.css']
})
export class GredaGrafComponent implements OnInit {


  @Input('kontGreda')kontGreda:kontGreda;
  @Input('scale')scale:number;
  @Input('WorkingWidth')WorkingWidth:number;
  @Input('pX')pX:number;
  @Input('pY')pY:number;
  @Input('display')display;
  ps:Point;
  kote:any[]=[];
  distanc:number[]=[];
  jm;
  MTN;
  DrawingPath;//Ova properti je array stringova koj sadrzi podatke za crtanje Diagrama
  greda={
    rasponi:[
      {id:0,duzina:0}
    ]
      ,oslonci:[{id:0, x:this.pX,y:this.pY}]
};
  constructor() { }

  ngOnInit() {

    this.ps={pX:this.pX, pY:this.pY}
    this.jm=this.WorkingWidth / this.kontGreda.raspon;
    
    this.drawKote();
    this.draw();
 
  }
  draw(){
    let raspon;
    this.kontGreda.paramKontGreda.nizRaspona.forEach(r=>raspon+=r);
  
    for(let i=0;i<this.kontGreda.paramKontGreda.nizRaspona.length;i++){
      if(i==0){
        this.greda.rasponi[i].id=i;
        this.greda.rasponi[i].duzina=this.kontGreda.paramKontGreda.nizRaspona[i]*this.jm;
      }else{
        this.greda.rasponi.push({id:i,duzina:this.kontGreda.paramKontGreda.nizRaspona[i]*this.jm})
      }
      };

    this.greda.oslonci[0].x=this.pX;
    this.greda.oslonci[0].y=this.pY;
    for(let i=1;i<this.kontGreda.paramKontGreda.brOslonca;i++){
      this.greda.oslonci.push({
        id:i,
        x:this.greda.oslonci[i-1].x+this.greda.rasponi[i-1].duzina,
        y:this.pY
      });
    };
  }
  drawKote(): any {
    this.kote.push(
      {ps:this.ps,distanc:0}
    );
    this.kote.push(
      {ps:{pX:this.kote[0].ps.pX+this.kote[0].distanc,pY:this.ps.pY},distanc:this.kontGreda.nizrasp[0]*this.jm}
    );
    for (let i = 1; i < this.kontGreda.nizrasp.length; i++) {
        this.kote.push(
          {ps:{pX:this.kote[i].ps.pX+this.kote[i].distanc,pY:this.ps.pY}, distanc:this.kontGreda.nizrasp[i]*this.jm}
        )
    }
  }
}

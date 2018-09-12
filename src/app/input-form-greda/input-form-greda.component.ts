import { Observable } from 'rxjs/Rx';
import { kontGreda } from 'app/models/kontGreda';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DataSharedService } from 'app/services/data-shared.service';

@Component({
  selector: 'input-form-greda',
  templateUrl: './input-form-greda.component.html',
  styleUrls: ['./input-form-greda.component.css']
})
export class InputFormGredaComponent implements OnInit {
  defRaspon=4;
  //@Input('kontGreda')kontGreda:Observable<kontGreda>;
  //kontGreda:kontGreda;
  @Input('kontGreda')kontGreda:kontGreda;
  @Output()kontGredaChange= new EventEmitter();
  active=1;
  constructor( private dataSharedService:DataSharedService) {
    this.dataSharedService.onGetData.subscribe(k => {
      this.kontGreda=k;
  });
   }

  ngOnInit() {
    this.markActivKota()
  }
  addRaspon(){
    this.kontGreda.paramKontGreda.brOslonca +=1;
    this.kontGreda.broslonaca+=1;
    this.kontGreda.paramKontGreda.nizRaspona.push(this.defRaspon);
    this.OnKonChange();
  }
  removeRaspon(){
    if (this.kontGreda.paramKontGreda.brOslonca>2) {
      
      this.kontGreda.paramKontGreda.brOslonca -=1;
      this.kontGreda.broslonaca-=1;
      let index = this.kontGreda.paramKontGreda.nizRaspona
        .indexOf(this.kontGreda.paramKontGreda.nizRaspona.length-1, 0);
      this.kontGreda.paramKontGreda.nizRaspona.splice(index, 1);
      this.OnKonChange();
      if(this.active>this.kontGreda.paramKontGreda.nizRaspona.length)
        this.preview();
    }
  }
  OnKonChange(){
    this.dataSharedService.onGetData.emit(this.kontGreda);
  }
  
   next(){
     this.active+=1;
   }
   preview(){
    this.active-=1;
  }
  markActivKota(){
        var e=document.getElementById("kota_"+this.active);
        e.parentElement.style.backgroundColor="red";
        console.log(e);
        
  }
}

import { kontGreda,ParamOpterecenja } from './models/kontGreda';

import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title;

  constructor() {
    // let g= new kontGreda(4,[3,4,3]);
    // let p:ParamOpterecenja={
    //   tipopt:"podopt",     
    //   sila:10,
    //   polozopt:0,
    //   duzopt:10
    // }
    // g.calculate(p);
    // g.calculate({tipopt:'podopt',sila:10, polozopt:0, duzopt:10});
    // this.title=g.Mdij;
    
  }
}

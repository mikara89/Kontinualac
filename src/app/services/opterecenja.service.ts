import { Injectable } from '@angular/core';
import { Opterecenje } from 'app/models/opterecenje';

@Injectable()
export class OpterecenjaService {

  constructor() { }
  getOpterecenje():Opterecenje[]{
    return [
      {name:"uprkoncsila", disc:"upravno koncentrisano sila", jedMere:"[kN]"},
      {name:"podzkoncsila", disc:"podužna koncentrisano sila", jedMere:"[kN]"},
      {name:"koncmoment", disc:"koncentrisani moment", jedMere:"[kNm]"},
      {name:"podopt", disc:"jednako raspodeljeno opterećenje", jedMere:"[kN/m]"},
      {name:"trougdesno", disc:"trouglasto opterećenje sa desna", jedMere:"[kN/m]"},
      {name:"trouglevo", disc:"trouglasto opterećenje sa leva", jedMere:"[kN/m]"},
    ]
  }
  getJedMere(opt:string):string{
    let opts=this.getOpterecenje();
    let toReturn:string='';
    opts.forEach(o=>{
      if(o.name==opt)
        toReturn= o.jedMere;
    })
    return toReturn;
  }
}

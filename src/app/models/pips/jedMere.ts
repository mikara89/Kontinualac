import { OpterecenjaService } from './../../services/opterecenja.service';
import {Pipe,PipeTransform} from '@angular/core';

@Pipe({
    name: 'jedMera'
})
export class JedMeraPipe implements PipeTransform{

    constructor(private opterecenjeServices:OpterecenjaService) {
        
        
    }
    transform(value:string, tipopt?:string){
        if(!value)
            return null;

        return value + this.opterecenjeServices.getJedMere(tipopt)    
    }
}
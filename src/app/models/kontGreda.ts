import { ParamOpterecenja } from './kontGreda';
import { async } from '@angular/core/testing';
import * as kon from './../../assets/kontinualnagreda';
import { ParamKontGreda } from 'app/models/paramKontGreda';
import { EventEmitter } from '@angular/core';

 export class kontinualnagreda{
    tipopt:string;
    koncsila:number;
    polozopt:number;
    duzopt:number;
    podopt:number;
    trougdesno:number;
    trouglevo:number;
    brtacakaose:number;
    tackeose:any[];
    nizstatnepoz:any[];
    reakcije:any[];
    Mdij:any[];
    Tdij:any[];
    Ndij:any[];
    ukupniraspon:number;
}
export interface ParamOpterecenja{
    tipopt:string,
    sila:number,
    polozopt:number,
    duzopt:number
}

export class kontGreda{
    Mdij:any[];
    Tdij:any[];
    Ndij:any[];
    OsaStapa:any[];
    prvoopt:boolean;
    txt1="Uneti podaci\n";
    redBrOpt=0;
    ukReak:any[];
    nizrasp:any[];
    optercenja:ParamOpterecenja[]=[];
    paramKontGreda={nizRaspona:[]} as ParamKontGreda;
    broslonaca:number;
    isResultOk:boolean=false;
    OnChange=new EventEmitter<any>();


    constructor(paramKontGreda:ParamKontGreda) {
        this.paramKontGreda=paramKontGreda;
        this.broslonaca=paramKontGreda.brOslonca;
        this.nizrasp=paramKontGreda.nizRaspona;
        this.Mdij=[];
        this.Tdij=[];
        this.Ndij=[];
        this.OsaStapa=[];
        this.ukReak=[];   
        this.isResultOk=false;    
    }

    calculate(paramOpterecenja:ParamOpterecenja)
        {       
        let kg=kon.kontinualnaGreda(
            this.broslonaca,
            this.nizrasp,
            paramOpterecenja.tipopt,
            paramOpterecenja.sila,
            paramOpterecenja.polozopt,
            paramOpterecenja.duzopt
        );
        //this.redBrOpt++;
        this.addMTN(kg);
    }
    async calculateAll()
    { 
        this.Mdij=[];
        this.Tdij=[];
        this.Ndij=[];
        this.OsaStapa=[];
        this.ukReak=[];    
        if(this.optercenja.length!=0){         
            for (let i = 0; i < this.optercenja.length; i++) {
                this.calculate(this.optercenja[i]);           
            }
            // for(let o of this.optercenja){
            //     await this.calculate(o);
            // }
            this.isResultOk=true;
        }else this.isResultOk=false;          
        this.OnChange.emit("Calculate");
    }
    addOpterecenje(opt:ParamOpterecenja){
        if(opt){
            this.redBrOpt++;
            this.isResultOk=false;
            this.calculateAll();
            //this.OnChange.emit("addOpterecenje");
            this.optercenja.push(opt);
            
        }
        
    }
    removeOpterecenje(index:number){
        if(this.optercenja[index]){
            if(this.redBrOpt>0)this.redBrOpt--;
            this.isResultOk=false;
            this.calculateAll();
            //this.OnChange.emit("removeOpterecenje");
            this.optercenja.splice(index, 1);
            
        }
        
    }
    get raspon():number{
        let raspon:number=0;
        this.paramKontGreda.nizRaspona.forEach(r=>raspon=raspon+r);
        return raspon;
    }

    private async addMTN(newGreda:kontinualnagreda){
        console.log("a");
        
        for (let i = 0; i < 500; i++) {

            if(!this.Mdij[i]) this.Mdij[i] =0;
            this.Mdij[i] +=newGreda.Mdij[i];

            if(!this.Tdij[i]) this.Tdij[i] =0;
            this.Tdij[i] +=newGreda.Tdij[i];

            if(!this.Ndij[i]) this.Ndij[i] =0;
            this.Ndij[i] +=newGreda.Ndij[i];

        }
        for(let i=0;i<=this.broslonaca;i++)
        {
            if(!this.ukReak[i]) this.ukReak[i] =0;
            this.ukReak[i]=this.ukReak[i]+newGreda.reakcije[i];
        }

        var dx=newGreda.ukupniraspon/499;
        if(!this.OsaStapa[0])
            for(var i = 0; i <= 499; i++)
            {
                this.OsaStapa[i] =0;
                this.OsaStapa[i]=i*dx;
            };
    }
    
    public get Extrims() : any {
        if(!this.isResultOk) return;

        let obj={
            M:{
                max:{x:0, Value:0},
                min:{x:0, Value:0},
            },
            T:{
                max:{x:0, Value:0},
                min:{x:0, Value:0},
            },
            N:{
                max:{x:0, Value:0},
                min:{x:0, Value:0},
            },
        }

            obj.M.max.Value=this.Round(Math.max.apply(null,this.Mdij),2);
            obj.M.max.x=this.Round(this.OsaStapa[this.Mdij.indexOf(obj.M.max.Value)],2);
            obj.M.min.Value=this.Round(Math.min.apply(null,this.Mdij),2);
            obj.M.min.x=this.Round(this.OsaStapa[this.Mdij.indexOf(obj.M.min.Value)],2);

            obj.T.max.Value=this.Round(Math.max.apply(null,this.Tdij),2);
            obj.T.max.x=this.Round(this.OsaStapa[this.Tdij.indexOf(obj.T.max.Value)],2);
            obj.T.min.Value=this.Round(Math.min.apply(null,this.Tdij),2);
            obj.T.min.x=this.Round(this.OsaStapa[this.Tdij.indexOf(obj.T.min.Value)],2);

            obj.N.max.Value=this.Round(Math.max.apply(null,this.Ndij),2);
            obj.N.max.x=this.Round(this.OsaStapa[this.Ndij.indexOf(obj.N.max.Value)],2);
            obj.N.min.Value=this.Round(Math.min.apply(null,this.Ndij),2);
            obj.N.min.x=this.Round(this.OsaStapa[this.Ndij.indexOf(obj.N.min.Value)],2);

        return obj;
    }

    public get ExtrimsBySpan() : any {
        if(!this.isResultOk) return;

        let obj=[{
            
            M:{
                max:{x:0, Value:0},
                min:{x:0, Value:0},
            },
            T:{
                max:{x:0, Value:0},
                min:{x:0, Value:0},
            },
            N:{
                max:{x:0, Value:0},
                min:{x:0, Value:0},
            },
        }]

        for (let i = 0; i < this.nizrasp.length; i++) {
            let one= i==0?0:this.addArray(this.nizrasp,i-1);
            let two= one+this.nizrasp[i];
            let M:any[]=[];
            let T:any[]=[];
            let N:any[]=[];
            for (let j = one; j < this.OsaStapa.length; j++) {
                if(one>=this.OsaStapa[j]<two){
                    M.push(this.Mdij[i]);
                    T.push(this.Tdij[i]);
                    N.push(this.Ndij[i]);
                }
                
                
            }
            
        }
            // obj.M.max.Value=this.Round(Math.max.apply(null,this.Mdij),2);
            // obj.M.max.x=this.Round(this.OsaStapa[this.Mdij.indexOf(obj.M.max.Value)],2);
            // obj.M.min.Value=this.Round(Math.min.apply(null,this.Mdij),2);
            // obj.M.min.x=this.Round(this.OsaStapa[this.Mdij.indexOf(obj.M.min.Value)],2);

            // obj.T.max.Value=this.Round(Math.max.apply(null,this.Tdij),2);
            // obj.T.max.x=this.Round(this.OsaStapa[this.Tdij.indexOf(obj.T.max.Value)],2);
            // obj.T.min.Value=this.Round(Math.min.apply(null,this.Tdij),2);
            // obj.T.min.x=this.Round(this.OsaStapa[this.Tdij.indexOf(obj.T.min.Value)],2);

            // obj.N.max.Value=this.Round(Math.max.apply(null,this.Ndij),2);
            // obj.N.max.x=this.Round(this.OsaStapa[this.Ndij.indexOf(obj.N.max.Value)],2);
            // obj.N.min.Value=this.Round(Math.min.apply(null,this.Ndij),2);
            // obj.N.min.x=this.Round(this.OsaStapa[this.Ndij.indexOf(obj.N.min.Value)],2);

        return obj;
    }

    Round(number, precision) {
        var factor = Math.pow(10, precision);
        var tempNumber = number * factor;
        var roundedTempNumber = Math.round(tempNumber);
        return roundedTempNumber / factor;
    };
    addArray(array:any[],index:number){
        let resToReturn:number;
        for (let i = 0; i < index; i++) {
            resToReturn+= array[i];
        }
        return resToReturn;
    }
    closest(num:number, arr) {
        var curr:number = arr[0];
        var diff = Math.abs (num - curr);
        for (var val = 0; val < arr.length; val++) {
            var newdiff = Math.abs (num - arr[val]);
            if (newdiff < diff) {
                diff = newdiff;
                curr = arr[val];
            }
        }
        return curr;
    }
    ExtrimesBySpan(span:number,M,T,N):any{

        let obj;
        obj.M.max.Value=this.Round(Math.max.apply(null,M),2);
        obj.M.max.x=this.Round(this.OsaStapa[M.indexOf(obj.M.max.Value)],2);
        obj.M.min.Value=this.Round(Math.min.apply(null,M),2);
        obj.M.min.x=this.Round(this.OsaStapa[M.indexOf(obj.M.min.Value)],2);

        obj.T.max.Value=this.Round(Math.max.apply(null,T),2);
        obj.T.max.x=this.Round(this.OsaStapa[T.indexOf(obj.T.max.Value)],2);
        obj.T.min.Value=this.Round(Math.min.apply(null,T),2);
        obj.T.min.x=this.Round(this.OsaStapa[T.indexOf(obj.T.min.Value)],2);

        obj.N.max.Value=this.Round(Math.max.apply(null,N),2);
        obj.N.max.x=this.Round(this.OsaStapa[N.indexOf(obj.N.max.Value)],2);
        obj.N.min.Value=this.Round(Math.min.apply(null,N),2);
        obj.N.min.x=this.Round(this.OsaStapa[N.indexOf(obj.N.min.Value)],2);

        return obj;

    }
    
}
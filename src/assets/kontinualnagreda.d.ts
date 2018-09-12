import { kontinualnagreda } from "app/models/kontGreda";

declare module Kontinualac {

    export function kontinualnaGreda(
        broslonaca:number,
        nizrasp:any[],
        tipopt:string,
        sila:number,
        polozopt:number,
        duzopt:number
    ):kontinualnagreda;
  }
  export=Kontinualac;

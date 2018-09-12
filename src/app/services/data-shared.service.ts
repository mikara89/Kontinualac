import { kontGreda } from './../models/kontGreda';
import { Http } from '@angular/http';
import { EventEmitter, Injectable } from '@angular/core';

@Injectable()
export class DataSharedService {

  onGetData= new EventEmitter<kontGreda>();
  constructor(private http: Http){}
  getData() {
    this.http.post('/params',null).map(res => {
      this.onGetData.emit(res.json());
    });
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root'
})
export class CurdService {
  base_url: string = ''
  constructor(
    private _shared: SharedService,
    private _http: HttpClient
  ) { 
    this._shared.base_url.subscribe(
      (res: any) => {
        console.log(res, 'message');
        this.base_url = res;
      }
    )
  }
    login(data: any) {
      return this._http.post(`${this.base_url}CheckLogin`, data);
    }
}

import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService implements OnInit{

  constructor() { }
  base_url = new BehaviorSubject<string>('https://turningbrain.co.in/api')
  img_base_url = new BehaviorSubject<string>('https://turningbrain.co.in/')
  ngOnInit(): void {
  }
}

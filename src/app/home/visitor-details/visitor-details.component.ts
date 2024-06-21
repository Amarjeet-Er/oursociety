import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-visitor-details',
  templateUrl: './visitor-details.component.html',
  styleUrls: ['./visitor-details.component.scss'],
})
export class VisitorDetailsComponent  implements OnInit {
  on_details: any;
  img_url: any;
  on_members: any;

  constructor(
    private _shared:SharedService,
    private _router:Router
  ) { }

  ngOnInit() {
    this._shared.img_base_url.subscribe(
      (res:any)=>{
        this.img_url=res
      }
    )
    this._shared.shared_details.subscribe(
      (res:any)=>{
        console.log(res);
        this.on_details=res
        this.on_members=res.familyDataList
        console.log(this.on_members, 'memebr');
        
      }
    )
  }
}

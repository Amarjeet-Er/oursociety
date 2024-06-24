import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-flat-owner-details',
  templateUrl: './flat-owner-details.component.html',
  styleUrls: ['./flat-owner-details.component.scss'],
})
export class FlatOwnerDetailsComponent implements OnInit {
  on_details: any;
  img_url: any;
  on_members: any;
  on_cars: any;

  constructor(
    private _shared: SharedService,
    private _router: Router
  ) { }

  ngOnInit() {
    this._shared.img_base_url.subscribe(
      (res: any) => {
        this.img_url = res
      }
    )
    this._shared.shared_details.subscribe(
      (res: any) => {
        this.on_details = res
        this.on_members = res.familyDataList
        this.on_cars = res.familyCarData
      }
    )
  }
  onUpdate(data: any) {
    this._shared.shared_details.next(data);
    this._router.navigate(['/home/flatownerupdate'])
  }
}

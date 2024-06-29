import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CurdService } from 'src/app/service/curd.service';
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-flat-owner-profile',
  templateUrl: './flat-owner-profile.component.html',
  styleUrls: ['./flat-owner-profile.component.scss'],
})
export class FlatOwnerProfileComponent  implements OnInit {
  ProfileImg: string = '../../../assets/images/user.webp'
  img_url: any;
  ProfileData: any;


  constructor(
    private _router: Router,
    private _crud: CurdService,
    private _shared: SharedService
  ) {
    this._shared.img_base_url.subscribe(
      (data) => {
        this.img_url = data;
      }
    )
  }

  ngOnInit() {

    this._shared.shared_details.subscribe(
      (data) => {
        this.ProfileData = data;
        console.log(this.ProfileData, 'prfdf');

      }
    )
  }
}
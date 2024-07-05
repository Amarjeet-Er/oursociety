import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CurdService } from 'src/app/service/curd.service';
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-emp-profile',
  templateUrl: './emp-profile.component.html',
  styleUrls: ['./emp-profile.component.scss'],
})
export class EmpProfileComponent implements OnInit {
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
      }
    )
  }
}
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CurdService } from 'src/app/service/curd.service';
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-owner-home',
  templateUrl: './owner-home.component.html',
  styleUrls: ['./owner-home.component.scss'],
})
export class OwnerHomeComponent implements OnInit {

  ProfileImg: string = '../../../assets/images/user.webp'
  flatId: any;
  flat_id: any;
  flatEmail: any;
  profile_data: any;
  img_url: any;
  flat_filter_data: any;
  flat_data: any;

  constructor(
    private _router: Router,
    private _crud: CurdService,
    private _shared: SharedService
  ) {
    this.flatId = localStorage.getItem('flatId');
    this.flat_id = JSON.parse(this.flatId);
    this.flatEmail = this.flat_id.Username
    console.log(this.flatEmail, 'email');
  }

  ngOnInit() {
    this._shared.img_base_url.subscribe(
      (data) => {
        this.img_url = data;
      }
    )
    this._crud.get_flat_owner_list().subscribe(
      (res: any) => {
        if (res && res.Data) {
          this.flat_data = res.Data.filter((employee: any) => employee.ownerEmail === this.flatEmail);
          this.flat_filter_data = this.flat_data[0];
          console.log(this.flat_filter_data, 'sdsd');

        }
      }
    );
  }

  onProfileDetails(data: any) {
    this._shared.shared_details.next(data)
    this._router.navigate(['/flatowner/ownerprofile'])
  }
  onRegistrationList(): boolean {
    return this._router.isActive('/flatowner/flatemplist', true);
  }

  onOwnerList(): boolean {
    return this._router.isActive('/flatowner/flatownerlist', true);
  }

  onLogout() {
    this._router.navigate(['/'])
  }
}

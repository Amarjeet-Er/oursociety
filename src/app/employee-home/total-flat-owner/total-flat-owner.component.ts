import { Component, OnInit } from '@angular/core';
import { CurdService } from 'src/app/service/curd.service';
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-total-flat-owner',
  templateUrl: './total-flat-owner.component.html',
  styleUrls: ['./total-flat-owner.component.scss'],
})
export class TotalFlatOwnerComponent implements OnInit {
  panelOpenState = false;
  reg_data: any;
  base_url: any;
  reg_filter_data: any;

  // Constructor
  constructor(
    private _crud: CurdService,
    private _shared: SharedService,
  ) {

    this._shared.img_base_url.subscribe((res: any) => {
      this.base_url = res;
    });
  }


  ngOnInit() {
    this._crud.get_flat_owner_list().subscribe(
      (res: any) => {
        this.reg_data = res.Data;
        this.reg_filter_data = res.Data;
      }
    )
  }

  onSearch(filter: any) {
    this.reg_data = this.reg_filter_data.filter((data: any) => {
      if (data?.buildName.toString().toLowerCase().indexOf(filter.toLowerCase()) !== -1) {
        return true;
      }
      if (data?.flatName.toString().toLowerCase().indexOf(filter.toLowerCase()) !== -1) {
        return true;
      }
      if (data?.flatOwnerName.toString().toLowerCase().indexOf(filter.toLowerCase()) !== -1) {
        return true;
      }
      if (data?.primaryNumber.toString().toLowerCase().indexOf(filter.toLowerCase()) !== -1) {
        return true;
      }
      if (data?.aadharNumber.toString().toLowerCase().indexOf(filter.toLowerCase()) !== -1) {
        return true;
      }
      if (data?.ownerEmail.toString().toLowerCase().indexOf(filter.toLowerCase()) !== -1) {
        return true;
      }
      if (data?.ownerDesignation.toString().toLowerCase().indexOf(filter.toLowerCase()) !== -1) {
        return true;
      }
      if (data?.totalFamilyMember.toString().toLowerCase().indexOf(filter.toLowerCase()) !== -1) {
        return true;
      }
      if (data?.havingCar.toString().toLowerCase().indexOf(filter.toLowerCase()) !== -1) {
        return true;
      }
      return false;
    }
    );
  }
}

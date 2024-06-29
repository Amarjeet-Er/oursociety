import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CurdService } from 'src/app/service/curd.service';
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-owner-flat-list',
  templateUrl: './owner-flat-list.component.html',
  styleUrls: ['./owner-flat-list.component.scss'],
})
export class OwnerFlatListComponent implements OnInit {
  headerBox: boolean = true;
  siteSearch: boolean = false
  reg_data: any;
  img_url: any;
  reg_filter_data: any;
  constructor(
    private _router: Router,
    private _crud: CurdService,
    private _shared: SharedService
  ) { }
  ngOnInit(): void {
    this._shared.img_base_url.subscribe(
      (res: any) => {
        this.img_url = res
      }
    )
    this._crud.get_flat_owner_list().subscribe(
      (res: any) => {
        console.log(res);

        if (res.Status === 'Success') {
          this.reg_data = res.Data;
          this.reg_filter_data = res.Data;
        }
      }
    )
  }

  onSearchOpen() {
    this.headerBox = !this.headerBox;
    this.siteSearch = !this.siteSearch;
  }
  onSearchClose() {
    this.headerBox = !this.headerBox;
    this.siteSearch = !this.siteSearch;
    this._crud.get_flat_owner_list().subscribe(
      (res: any) => {
        if (res.Status === 'Success') {
          this.reg_data = res.Data;
          this.reg_filter_data = res.Data;
        }
      }
    )
  }

  onSearch(filter: any) {

    this.reg_data = this.reg_filter_data.filter((data: any) => {
      if (data?.flatOwnerName.toString().toLowerCase().indexOf(filter.toLowerCase()) !== -1) {
        return true;
      }
      if (data?.ownerDesignation.toString().toLowerCase().indexOf(filter.toLowerCase()) !== -1) {
        return true;
      }
      if (data?.primaryNumber.toString().toLowerCase().indexOf(filter.toLowerCase()) !== -1) {
        return true;
      }
      return false;
    }
    );
  }
}

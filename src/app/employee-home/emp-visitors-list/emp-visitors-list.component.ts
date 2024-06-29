import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CurdService } from 'src/app/service/curd.service';
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-emp-visitors-list',
  templateUrl: './emp-visitors-list.component.html',
  styleUrls: ['./emp-visitors-list.component.scss'],
})
export class EmpVisitorsListComponent  implements OnInit {

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
        console.log(res);
        this.img_url = res
      }
    )
    this._crud.get_visistors_list().subscribe(
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
    this._crud.get_visistors_list().subscribe(
      (res: any) => {
        console.log(res);
        if (res.Status === 'Success') {
          this.reg_data = res.Data;
          this.reg_filter_data = res.Data;
        }
      }
    )
  }

  onDetails(data:any) {
    this._shared.shared_details.next(data)    
    this._router.navigate(['/employee/empvisistorsdetails']);
  }
  onSearch(filter: any) {

    this.reg_data = this.reg_filter_data.filter((data: any) => {
      if (data?.visitorName.toString().toLowerCase().indexOf(filter.toLowerCase()) !== -1) {
        return true;
      }
      if (data?.havingVehicle.toString().toLowerCase().indexOf(filter.toLowerCase()) !== -1) {
        return true;
      }
      if (data?.visitorMobileNum.toString().toLowerCase().indexOf(filter.toLowerCase()) !== -1) {
        return true;
      }
      return false;
    }
    );
  }
}

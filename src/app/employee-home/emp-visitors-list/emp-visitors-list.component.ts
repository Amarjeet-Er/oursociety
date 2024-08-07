import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { CurdService } from 'src/app/service/curd.service';
import { SharedService } from 'src/app/service/shared.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-emp-visitors-list',
  templateUrl: './emp-visitors-list.component.html',
  styleUrls: ['./emp-visitors-list.component.scss'],
})
export class EmpVisitorsListComponent implements OnInit {

  headerBox: boolean = true;
  siteSearch: boolean = false
  reg_data: any;
  img_url: any;
  reg_filter_data: any;
  UserId: any;
  user_id: any;
  admin_id: any;
  constructor(
    private _router: Router,
    private _crud: CurdService,
    private _shared: SharedService
  ) {
    this.UserId = localStorage.getItem('empId');
    this.user_id = JSON.parse(this.UserId);
    this.admin_id = this.user_id?.Username;
  }
  ngOnInit(): void {
    this._shared.img_base_url.subscribe(
      (res: any) => {
        this.img_url = res
      }
    )
    this._router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
      this.loadData();
    });

    this.loadData();
  }

  loadData() {
    this._crud.get_visistors_list().subscribe(
      (res: any) => {
        if (res.Status === 'Success') {
          if (res && res.Data) {
            this.reg_data = res.Data.filter((visistor: any) => visistor.actionBy === this.admin_id);
            this.reg_filter_data = this.reg_data;
          }
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
        if (res.Status === 'Success') {
          if (res && res.Data) {
            this.reg_data = res.Data.filter((visistor: any) => visistor.actionBy === this.admin_id);
            this.reg_filter_data = this.reg_data;
          }
        }
      }
    )
  }

  onDetails(data: any) {
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

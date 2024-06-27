import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CurdService } from 'src/app/service/curd.service';
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-flat-dashboard',
  templateUrl: './flat-dashboard.component.html',
  styleUrls: ['./flat-dashboard.component.scss'],
})
export class FlatDashboardComponent  implements OnInit {
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
    this._crud.get_emp_list().subscribe(
      (res: any) => {
        console.log(res);
        if (res.Status === 'Success') {
          this.reg_data = res.AllRegisteredEmployee;
          this.reg_filter_data = res.AllRegisteredEmployee;
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
    this._crud.get_emp_list().subscribe(
      (res: any) => {
        console.log(res);
        if (res.Status === 'Success') {
          this.reg_data = res.AllRegisteredEmployee;
          this.reg_filter_data = res.AllRegisteredEmployee;
        }
      }
    )
  }

  onDetails(data:any) {
    this._shared.shared_details.next(data)    
    this._router.navigate(['/home/employeedetails']);
  }
  onSearch(filter: any) {

    this.reg_data = this.reg_filter_data.filter((data: any) => {
      if (data.empName.toString().toLowerCase().indexOf(filter.toLowerCase()) !== -1) {
        return true;
      }
      if (data.empEmail.toString().toLowerCase().indexOf(filter.toLowerCase()) !== -1) {
        return true;
      }
      if (data.empMobNo.toString().toLowerCase().indexOf(filter.toLowerCase()) !== -1) {
        return true;
      }
      return false;
    }
    );
  }
}

import { Component, OnInit } from '@angular/core';
import { CurdService } from 'src/app/service/curd.service';
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-employee-guard-list',
  templateUrl: './employee-guard-list.component.html',
  styleUrls: ['./employee-guard-list.component.scss'],
})
export class EmployeeGuardListComponent implements OnInit {
  siteSearch: boolean = false;
  panelOpenState = false;
  reg_data: any;
  base_url: any;
  onViewFilterList: boolean = true;
  onAllClose: boolean = false;
  onSelectApply: boolean = true;
  reg_filter_data: any;

  constructor(
    private _crud: CurdService,
    private _shared: SharedService,
  ) { }

  ngOnInit() {
    this._shared.img_base_url.subscribe((res: any) => {
      this.base_url = res;
    });

    this._crud.get_emp_list().subscribe(
      (res: any) => {
        if (res && res.AllRegisteredEmployee) {
          this.reg_data = res.AllRegisteredEmployee.filter((employee: any) => employee.employee_type === "Security Guard");
          this.reg_filter_data = this.reg_data;
        }
      }
    );
  }
  onFilterData() {
    this.siteSearch = !this.siteSearch;
    this.onViewFilterList = true;
  }
  onSearch(filter: any) {
    this.reg_data = this.reg_filter_data.filter((data: any) => {
      if (data?.employee_type.toString().toLowerCase().indexOf(filter.toLowerCase()) !== -1) {
        return true;
      }
      if (data?.empName.toString().toLowerCase().indexOf(filter.toLowerCase()) !== -1) {
        return true;
      }
      if (data?.empMobNo.toString().toLowerCase().indexOf(filter.toLowerCase()) !== -1) {
        return true;
      }
      if (data?.aadharNumber.toString().toLowerCase().indexOf(filter.toLowerCase()) !== -1) {
        return true;
      }
      if (data?.empEmail.toString().toLowerCase().indexOf(filter.toLowerCase()) !== -1) {
        return true;
      }
      if (data?.currentAddress.toString().toLowerCase().indexOf(filter.toLowerCase()) !== -1) {
        return true;
      }
      return false;
    }
    );
  }
}

import { Component, OnInit } from '@angular/core';
import { CurdService } from 'src/app/service/curd.service';
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-total-employee',
  templateUrl: './total-employee.component.html',
  styleUrls: ['./total-employee.component.scss'],
})
export class TotalEmployeeComponent implements OnInit {
  panelOpenState = false;
  base_url: any;
  reg_data: any;
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

  async ngOnInit() {
    this._crud.get_emp_list().subscribe(
      (res: any) => {
        this.reg_data = res.AllRegisteredEmployee;
        this.reg_filter_data = res.AllRegisteredEmployee;
      }
    )
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

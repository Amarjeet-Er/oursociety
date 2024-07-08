import { Component, OnInit } from '@angular/core';
import { CurdService } from 'src/app/service/curd.service';
import { SharedService } from 'src/app/service/shared.service';
@Component({
  selector: 'app-emp-dashboard',
  templateUrl: './emp-dashboard.component.html',
  styleUrls: ['./emp-dashboard.component.scss'],
})
export class EmpDashboardComponent implements OnInit {
  empId: any;
  emp_id: any;
  empEmail: any;
  list_emp_total: any;
  flat_owner_list: any;
  list_dashboard: any;
  img_url: any;
  profile_data: any;
  emp_filter_data: any;

  constructor(
    private _crud: CurdService,
    private _shared: SharedService
  ) {
    this.empId = localStorage.getItem('empId');
    this.emp_id = JSON.parse(this.empId);
    this.empEmail = this.emp_id.Username

    this._crud.get_emp_list().subscribe(
      (res: any) => {
        this.list_emp_total = res.AllRegisteredEmployee;
      }
    )
    this._crud.get_flat_owner_list().subscribe(
      (res: any) => {
        this.flat_owner_list = res.Data;
      }
    )
    this._crud.get_visistors_list().subscribe(
      (res: any) => {
        if (res.Status === 'Success') {
          if (res && res.Data) {
            this.list_dashboard = res.Data.filter((visistor: any) => visistor.actionBy === this.empEmail);
            console.log(this.list_dashboard, 'list');
          }
        }
      }
    )
  }

  ngOnInit(): void {
    this._shared.img_base_url.subscribe(
      (data) => {
        this.img_url = data;
      }
    )
    this._crud.get_emp_list().subscribe(
      (res: any) => {
        if (res && res.AllRegisteredEmployee) {
          this.profile_data = res.AllRegisteredEmployee.filter((employee: any) => employee.empEmail === this.empEmail);
          this.emp_filter_data = this.profile_data[0];
        }
      }
    );
  }

  GratingData(): string {
    const hours = new Date().getHours();
    if (hours < 12) {
      return 'Good morning!';
    } else if (hours < 18) {
      return 'Good afternoon!';
    } else {
      return 'Good evening!';
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { CurdService } from 'src/app/service/curd.service';

@Component({
  selector: 'app-admin-reports',
  templateUrl: './admin-reports.component.html',
  styleUrls: ['./admin-reports.component.scss'],
})
export class AdminReportsComponent implements OnInit {
  visitor_data: any;
  emp_data: any;
  flat_owner_data: any;

  constructor(
    private _crud: CurdService
  ) { }

  ngOnInit() {
    this._crud.get_visistors_list().subscribe(
      (res: any) => {
        this.visitor_data = res.Data
      }
    )
    this._crud.get_flat_owner_list().subscribe(
      (res: any) => {
        this.flat_owner_data = res.Data
      }
    )
    this._crud.get_emp_list().subscribe(
      (res: any) => {
        this.emp_data = res.AllRegisteredEmployee;
      }
    )
  }
}

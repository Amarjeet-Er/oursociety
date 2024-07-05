import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chart, registerables } from 'chart.js';
import { CurdService } from 'src/app/service/curd.service';
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-flat-dashboard',
  templateUrl: './flat-dashboard.component.html',
  styleUrls: ['./flat-dashboard.component.scss'],
})
export class FlatDashboardComponent implements OnInit {
  list_visistor: any;
  flat_owner_list: any;
  list_dashboard: any;
  list_emp_total: any;
  emp_filter_data: any;
  img_url: any;
  visitor_list: any;
  reg_data: any;
  flatId: any;
  flat_id: any;
  flatEmail: any;
  flat_data: any;
  flat_filter_data: any;
  constructor(
    private _router: Router,
    private _crud: CurdService,
    private _shared: SharedService
  ) {
    this.flatId = localStorage.getItem('flatId');
    this.flat_id = JSON.parse(this.flatId);
    this.flatEmail = this.flat_id.Username
    this._crud.get_emp_list().subscribe(
      (res: any) => {
        this.list_emp_total = res.AllRegisteredEmployee;
      }
    )
  }

  ngOnInit(): void {
    this._shared.img_base_url.subscribe(
      (data) => {
        this.img_url = data;
      }
    )
    this._crud.get_flat_owner_list().subscribe(
      (res: any) => {
        this.flat_owner_list = res.Data;
        if (res && res.Data) {
          this.flat_data = res.Data.filter((employee: any) => employee.ownerEmail === this.flatEmail);
          this.flat_filter_data = this.flat_data[0];
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

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CurdService } from 'src/app/service/curd.service';
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-visitor-today',
  templateUrl: './visitor-today.component.html',
  styleUrls: ['./visitor-today.component.scss'],
})
export class VisitorTodayComponent implements OnInit {

  siteSearch: boolean = false;
  panelOpenState = false;
  reg_data: any;
  base_url: any;
  onViewFilterList: boolean = true;
  onAllClose: boolean = false;
  onSelectApply: boolean = true;

  EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet; charset=UTF-8';
  documentDefinition: any;
  reg_filter_data: any;
  img_url: any;

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
    this._crud.get_visistors_list().subscribe(
      (res: any) => {
        if (res.Status === 'Success') {
          const today = new Date().toISOString().split('T')[0];
          const filteredData = res.Data.filter((item: any) => item.visitingDate === today);
          this.reg_data = filteredData;
          this.reg_filter_data = filteredData;
        }
      }
    )
  }

  onSearch(filter: any) {
    const lowerCaseFilter = filter.toLowerCase();
    this.reg_data = this.reg_filter_data.filter((data: any) => {
      const fieldsToCheck = [
        data?.visitorName,
        data?.visitorMobileNum,
        data?.totalVisitors,
        data?.visitingDate,
        data?.havingVehicle,
        data?.visitorVehicleModel,
        data?.visitorVehicleNumber,
        data?.visitorVehicleParkingArea
      ];
      const approvalStatusString = data?.approvalStatus === 1 ? 'Approved' : data?.approvalStatus === 0 ? 'Rejected' : 'Pending';
      fieldsToCheck.push(approvalStatusString);
      return fieldsToCheck.some(field => field?.toString().toLowerCase().indexOf(lowerCaseFilter) !== -1);
    });
  }
}

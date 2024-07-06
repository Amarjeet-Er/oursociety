import { Component, OnInit } from '@angular/core';
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
        if (res.Status === 'Success') {
          this.reg_data = res.Data;
          this.reg_filter_data = res.Data;
        }
      }
    )
  }

  onSearch(filter: any) {
    const lowerCaseFilter = filter.toLowerCase();
    this.reg_data = this.reg_filter_data.filter((data: any) => {
      const flatOwnerNameMatch = data?.flatOwnerName?.toString().toLowerCase().indexOf(lowerCaseFilter) !== -1;
      const ownerDesignationMatch = data?.ownerDesignation?.toString().toLowerCase().indexOf(lowerCaseFilter) !== -1;
      const combinedBuildAndFlatName = `${data?.buildName || ''} / ${data?.flatName || ''}`.toLowerCase();
      const buildAndFlatNameMatch = combinedBuildAndFlatName.indexOf(lowerCaseFilter) !== -1;
      const primaryNumberMatch = data?.primaryNumber?.toString().toLowerCase().indexOf(lowerCaseFilter) !== -1;
      return flatOwnerNameMatch || buildAndFlatNameMatch || primaryNumberMatch || ownerDesignationMatch;
    });
  }
}

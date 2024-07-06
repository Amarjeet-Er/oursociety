import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CurdService } from 'src/app/service/curd.service';
import { SharedService } from 'src/app/service/shared.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-flat-owner-list',
  templateUrl: './flat-owner-list.component.html',
  styleUrls: ['./flat-owner-list.component.scss'],
})
export class FlatOwnerListComponent implements OnInit {
  headerBox: boolean = true;
  siteSearch: boolean = false;
  reg_data: any;
  img_url: any;
  reg_filter_data: any;

  constructor(
    private _router: Router,
    private _crud: CurdService,
    private _shared: SharedService
  ) { }

  ngOnInit(): void {
    this._shared.img_base_url.subscribe((res: any) => {
      this.img_url = res;
    });

    this._router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
      this.loadData();
    });

    this.loadData();
  }

  loadData(): void {
    this._crud.get_flat_owner_list().subscribe((res: any) => {
      if (res.Status === 'Success') {
        this.reg_data = res.Data;
        this.reg_filter_data = res.Data;
      }
    });
  }

  onSearchOpen() {
    this.headerBox = !this.headerBox;
    this.siteSearch = !this.siteSearch;
  }

  onSearchClose() {
    this.headerBox = !this.headerBox;
    this.siteSearch = !this.siteSearch;
    this.loadData();
  }

  onDetails(data: any) {
    this._shared.shared_details.next(data);
    this._router.navigate(['/home/flatownerdetails']);
  }

  onSearch(filter: any) {
    const lowerCaseFilter = filter.toLowerCase();
    this.reg_data = this.reg_filter_data.filter((data: any) => {
      const flatOwnerNameMatch = data?.flatOwnerName?.toString().toLowerCase().indexOf(lowerCaseFilter) !== -1;
      const combinedBuildAndFlatName = `${data?.buildName || ''} / ${data?.flatName || ''}`.toLowerCase();
      const buildAndFlatNameMatch = combinedBuildAndFlatName.indexOf(lowerCaseFilter) !== -1;
      const primaryNumberMatch = data?.primaryNumber?.toString().toLowerCase().indexOf(lowerCaseFilter) !== -1;
      return flatOwnerNameMatch || buildAndFlatNameMatch || primaryNumberMatch;
    });
  }
}

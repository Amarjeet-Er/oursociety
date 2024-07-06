import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { CurdService } from 'src/app/service/curd.service';
import { SharedService } from 'src/app/service/shared.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-visitor-list',
  templateUrl: './visitor-list.component.html',
  styleUrls: ['./visitor-list.component.scss'],
})
export class VisitorListComponent implements OnInit {
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
          this.reg_data = res.Data;
          this.reg_filter_data = res.Data;
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
          this.reg_data = res.Data;
          this.reg_filter_data = res.Data;
        }
      }
    )
  }

  onDetails(data: any) {
    this._shared.shared_details.next(data)
    this._router.navigate(['/home/visitordetails']);
  }
  onSearch(filter: any) {
    const lowerCaseFilter = filter.toLowerCase();

    this.reg_data = this.reg_filter_data.filter((data: any) => {
      const visitorNameMatch = data?.visitorName?.toString().toLowerCase().indexOf(lowerCaseFilter) !== -1;
      const visitorMobileNumMatch = data?.visitorMobileNum?.toString().toLowerCase().indexOf(lowerCaseFilter) !== -1;

      let approvalStatusString = '';
      if (data?.approvalStatus === 1) {
        approvalStatusString = 'Approved';
      } else if (data?.approvalStatus === 0) {
        approvalStatusString = 'Rejected';
      } else {
        approvalStatusString = 'Pending';
      }
      const approvalStatusMatch = approvalStatusString.toLowerCase().indexOf(lowerCaseFilter) !== -1;

      return visitorNameMatch || approvalStatusMatch || visitorMobileNumMatch;
    });
  }
}

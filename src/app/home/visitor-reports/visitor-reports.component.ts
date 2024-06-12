import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-visitor-reports',
  templateUrl: './visitor-reports.component.html',
  styleUrls: ['./visitor-reports.component.scss'],
})
export class VisitorReportsComponent  implements OnInit {
  headerBox: boolean = true;
  siteSearch: boolean = false
  getDta = [
    { "name": "Ayush Singh", "desi": "Angular", "phone": "8956231254" },
    { "name": "Uday Sir", "desi": "Angular", "phone": "8956231254" },
    { "name": "Manish", "desi": "Angular", "phone": "8956231254" },
    { "name": "Alice", "desi": "Angular", "phone": "8956231254" },
    { "name": "Munna kumar", "desi": "Angular", "phone": "8956231254" },
    { "name": "Denesh", "desi": "Angular", "phone": "8956231254" },
  ]
  constructor(private _router: Router) { }
  ngOnInit(): void {
    
  }

  onHeaderBox() {
    this.headerBox = !this.headerBox;
    this.siteSearch = !this.siteSearch;
  }
  onDataSearch() {
    this.headerBox = !this.headerBox;
    this.siteSearch = !this.siteSearch;
  }
  onAddVisistor() {
    this._router.navigate(['/home/visitorreg']);
  }
  visitorDetails() {
    this._router.navigate(['/home/visitordetails']);
  }
  onSearch(filter: any) {

  }
}

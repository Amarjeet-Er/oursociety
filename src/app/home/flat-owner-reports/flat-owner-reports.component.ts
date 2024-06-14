import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-flat-owner-reports',
  templateUrl: './flat-owner-reports.component.html',
  styleUrls: ['./flat-owner-reports.component.scss'],
})
export class FlatOwnerReportsComponent  implements OnInit {
  headerBox: boolean = true;
  siteSearch: boolean = false
  getDta = [
    { "name": "Ayush Singh", "desi": "Angular", "phone": "8956231254" },
    { "name": "Uday Sir", "desi": "Angular", "phone": "8956231254" },
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

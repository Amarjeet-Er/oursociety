import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-flat-owner-list',
  templateUrl: './flat-owner-list.component.html',
  styleUrls: ['./flat-owner-list.component.scss'],
})
export class FlatOwnerListComponent implements OnInit {
  headerBox: boolean = true;
  siteSearch: boolean = false
  getDta = [
    { "name": "John", "desi": "Angular", "phone": "8956231254" },
    { "name": "Amarjeet", "desi": "Angular", "phone": "8956231254" },
    { "name": "Akhilesh", "desi": "Angular", "phone": "8956231254" },
  ]
  constructor(
    private _router: Router
  ) { }
  ngOnInit(): void {  }

  onHeaderBox() {
    this.headerBox = !this.headerBox;
    this.siteSearch = !this.siteSearch;
  }
  onDataSearch() {
    this.headerBox = !this.headerBox;
    this.siteSearch = !this.siteSearch;
  }
  onAddOwner() {
    this._router.navigate(['/home/flatownerreg']);
  }
  onDetails() {
    this._router.navigate(['/home/flatownerdetails']);
  }
  onSearch(filter: any) {

  }
}

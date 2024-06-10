import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-visitor-list',
  templateUrl: './visitor-list.component.html',
  styleUrls: ['./visitor-list.component.scss'],
})
export class VisitorListComponent implements OnInit {
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
  constructor(private router: Router) { }
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
    this.router.navigate(['/home/visitorreg']);
  }
  visitorDetails() {
    this.router.navigate(['/home/visitordetails']);
  }
  onSearch(filter: any) {

  }
}

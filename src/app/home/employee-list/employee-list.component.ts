import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonSearchbar } from '@ionic/angular';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
})
export class EmployeeListComponent implements OnInit {
  headerBox: boolean = true;
  siteSearch: boolean = false
  getDta = [
    { "name": "John", "desi": "Angular", "phone": "8956231254" },
    { "name": "Amarjeet", "desi": "Angular", "phone": "8956231254" },
    { "name": "Akhilesh", "desi": "Angular", "phone": "8956231254" },
    { "name": "Ayush Singh", "desi": "Angular", "phone": "8956231254" },
    { "name": "Uday Sir", "desi": "Angular", "phone": "8956231254" },
    { "name": "Manish", "desi": "Angular", "phone": "8956231254" },
    { "name": "Alice", "desi": "Angular", "phone": "8956231254" },
    { "name": "Munna kumar", "desi": "Angular", "phone": "8956231254" },
    { "name": "Denesh", "desi": "Angular", "phone": "8956231254" },
  ]
  constructor(
    private _router: Router
  ) { }
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
  onAddEmp() {
    this._router.navigate(['/home/employeereg']);
  }
  onDetails() {
    this._router.navigate(['/home/employeedetails']);
  }
  onSearch(filter: any) { }

}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BackBtnService } from './service/back-btn.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  user_id: any;
  UserId: any
  flatId: any;
  flat_id: any;
  flatOwnerId: any;
  empId: any;
  emp_id: any;
  employeeId: any;
  admin_id: any;
  constructor(
    private _router: Router,
    private _backbtn: BackBtnService,
    private _location: Location,
  ) {

  }
  ngOnInit(): void {
    this._backbtn.back();
    this.isLogin()
  }

  isLogin() {
    this.UserId = localStorage.getItem('userId');
    this.user_id = JSON.parse(this.UserId);
    this.admin_id = this.user_id?.RollId;

    this.flatId = localStorage.getItem('flatId');
    this.flat_id = JSON.parse(this.flatId);
    this.flatOwnerId = this.flat_id?.RollId;

    this.empId = localStorage.getItem('empId');
    this.emp_id = JSON.parse(this.empId);
    this.employeeId = this.emp_id?.RollId;

    if (this.admin_id) {
      if (this._location.path() == '') {
        this._router.navigate(['/home'])
      }
      else {
      }
    }
    if (this.flatOwnerId) {
      if (this._location.path() == '') {
        this._router.navigate(['/flatowner'])
      }
      else {
      }
    }
    if (this.employeeId) {
      if (this._location.path() == '') {
        this._router.navigate(['/employee'])
      }
      else {
      }
    }
  }
}
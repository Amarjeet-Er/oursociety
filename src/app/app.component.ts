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
    console.log(this.user_id, 'user id');

    if (this.user_id) {
      if (this._location.path() == '') {
        this._router.navigate(['/home'])
      }
      else {
      }
    }
  }
}
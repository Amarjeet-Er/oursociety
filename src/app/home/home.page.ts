import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private _router: Router
  ) { }

  onRegistrationList(): boolean {
    return this._router.isActive('/home/employeelist', true);
  }

  onOwnerList(): boolean {
    return this._router.isActive('/home/flatownerlist', true);
  }

  onVisitorList(): boolean {
    return this._router.isActive('/home/visitorlist', true);
  }
  onReportsDashboard(): boolean {
    return this._router.isActive('/home/adminreports', true);
  }

  onLogout() {
    this._router.navigate(['/'])
  }
}

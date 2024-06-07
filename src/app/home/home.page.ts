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
  onRegistration(): boolean {
    return this._router.isActive('/home/employeereg', true);
  }
  onRegistrationList(): boolean {
    return this._router.isActive('/home/employeelist', true);
  }
  onOwnerReg(): boolean {
    return this._router.isActive('/home/flatownerreg', true);
  }
  onOwnerList(): boolean {
    return this._router.isActive('/home/flatownerlist', true);
  }
  onVisitorReg(): boolean {
    return this._router.isActive('/home/visitorreg', true);
  }
  onVisitorList(): boolean {
    return this._router.isActive('/home/visitorlist', true);
  }

  onLogout(){
    this._router.navigate(['/'])
  }
}

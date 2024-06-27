import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-owner-home',
  templateUrl: './owner-home.component.html',
  styleUrls: ['./owner-home.component.scss'],
})
export class OwnerHomeComponent  implements OnInit {

  
  constructor(
    private _router: Router
  ) { }
  ngOnInit(): void {
  }

  onRegistrationList(): boolean {
    return this._router.isActive('/home/employeelist', true);
  }

  onOwnerList(): boolean {
    return this._router.isActive('/home/flatownerlist', true);
  }

  onVisitorList(): boolean {
    return this._router.isActive('/home/visitorlist', true);
  }

  onLogout() {
    this._router.navigate(['/'])
  }
}

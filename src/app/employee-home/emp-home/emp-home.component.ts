import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-emp-home',
  templateUrl: './emp-home.component.html',
  styleUrls: ['./emp-home.component.scss'],
})
export class EmpHomeComponent implements OnInit {

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

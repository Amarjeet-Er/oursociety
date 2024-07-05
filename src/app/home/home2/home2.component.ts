import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home2',
  templateUrl: './home2.component.html',
  styleUrls: ['./home2.component.scss'],
})
export class Home2Component  implements OnInit {
  constructor(
    private _router: Router
  ) { }
  ngOnInit(): void {
  }

  onDashboardChat(): boolean {
    return this._router.isActive('/home/dashboard', true);
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
  onReportsDashboard(): boolean {
    return this._router.isActive('/home/adminreports', true);
  }

  onLogout() {
    this._router.navigate(['/'])
  }
}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmployeeRegComponent } from './employee-reg/employee-reg.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { VisitorRegComponent } from './visitor-reg/visitor-reg.component';
import { FlatOwnerRegComponent } from './flat-owner-reg/flat-owner-reg.component';
import { FlatOwnerListComponent } from './flat-owner-list/flat-owner-list.component';
import { VisitorListComponent } from './visitor-list/visitor-list.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { VisitorDetailsComponent } from './visitor-details/visitor-details.component';
import { FlatOwnerDetailsComponent } from './flat-owner-details/flat-owner-details.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { VisitorReportsComponent } from './visitor-reports/visitor-reports.component';
import { EmployeeReportsComponent } from './employee-reports/employee-reports.component';
import { FlatOwnerReportsComponent } from './flat-owner-reports/flat-owner-reports.component';

const routes: Routes = [
  {
    path: '', component: HomePage,
    children: [
      { path: '', component: DashboardComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'employeelist', component: EmployeeListComponent },
      { path: 'visitorlist', component: VisitorListComponent },
      { path: 'flatownerlist', component: FlatOwnerListComponent },
    ]
  },
  { path: 'employeereg', component: EmployeeRegComponent },
  { path: 'employeedetails', component: EmployeeDetailsComponent },
  {path: 'employeereports', component: EmployeeReportsComponent},
  { path: 'flatownerreg', component: FlatOwnerRegComponent },
  { path: 'flatownerdetails', component: FlatOwnerDetailsComponent },
  { path: 'flatownerreports', component: FlatOwnerReportsComponent },
  { path: 'visitorreg', component: VisitorRegComponent },
  { path: 'visitorreports', component: VisitorReportsComponent },
  { path: 'visitordetails', component: VisitorDetailsComponent },
  { path: 'profile', component: UserProfileComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule { }

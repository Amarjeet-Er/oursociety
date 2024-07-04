import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpHomeComponent } from './emp-home/emp-home.component';
import { EmpDashboardComponent } from './emp-dashboard/emp-dashboard.component';
import { VisitorListComponent } from '../home/visitor-list/visitor-list.component';
import { EmpProfileComponent } from './emp-profile/emp-profile.component';
import { EmpVisitorsRegComponent } from './emp-visitors-reg/emp-visitors-reg.component';
import { EmpVisitorsDetailsComponent } from './emp-visitors-details/emp-visitors-details.component';
import { EmpVisitorsListComponent } from './emp-visitors-list/emp-visitors-list.component';
import { VisitorFlatOwnerFindComponent } from './visitor-flat-owner-find/visitor-flat-owner-find.component';
import { TotalEmployeeComponent } from './total-employee/total-employee.component';
import { TotalFlatOwnerComponent } from './total-flat-owner/total-flat-owner.component';
import { TotalVisitorReportsComponent } from './total-visitor-reports/total-visitor-reports.component';
import { EmpAboutComponent } from './emp-about/emp-about.component';
import { EmpContactComponent } from './emp-contact/emp-contact.component';
import { EmpTermConditionComponent } from './emp-term-condition/emp-term-condition.component';
import { EmpChangePasswordComponent } from './emp-change-password/emp-change-password.component';

const routes: Routes = [
  {
    path: '', component: EmpHomeComponent,
    children: [
      { path: '', component: EmpDashboardComponent },
      { path: 'dashboard', component: EmpDashboardComponent },
      { path: 'empvisitorlist', component: EmpVisitorsListComponent },
      { path: 'totalemployee', component: TotalEmployeeComponent },
      { path: 'totalflatowner', component: TotalFlatOwnerComponent },
    ]
  },
  {path: 'empvisistorsreg', component: EmpVisitorsRegComponent},
  {path: 'empvisistorsdetails', component: EmpVisitorsDetailsComponent},
  {path: 'empprofile', component: EmpProfileComponent},
  {path: 'empvisitorflatfind', component: VisitorFlatOwnerFindComponent},
  {path: 'totalvisitorreports', component: TotalVisitorReportsComponent},
  {path: 'empabout', component: EmpAboutComponent},
  {path: 'empcontact', component: EmpContactComponent},
  {path: 'emptermandcondition', component: EmpTermConditionComponent},
  {path: 'empchangepassword', component: EmpChangePasswordComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeHomeRoutingModule { }

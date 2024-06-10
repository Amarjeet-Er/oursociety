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

const routes: Routes = [
  {
    path: '', component: HomePage,
    children: [
      { path: '', component: DashboardComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'employeereg', component: EmployeeRegComponent },
      { path: 'employeelist', component: EmployeeListComponent },
      { path: 'visitorreg', component: VisitorRegComponent },
      { path: 'visitorlist', component: VisitorListComponent },
      { path: 'visitordetails', component: VisitorDetailsComponent },
      { path: 'flatownerreg', component: FlatOwnerRegComponent },
      { path: 'flatownerlist', component: FlatOwnerListComponent },
    ]
  },
  { path: 'profile', component: UserProfileComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule { }

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
import { TearmAndConditionComponent } from './tearm-and-condition/tearm-and-condition.component';
import { EmployeeUpdateComponent } from './employee-update/employee-update.component';
import { FlatOwnerUpdateComponent } from './flat-owner-update/flat-owner-update.component';
import { HelpDeskComponent } from './help-desk/help-desk.component';
import { VisitorByFlatOwnerFindComponent } from './visitor-by-flat-owner-find/visitor-by-flat-owner-find.component';
import { AdminReportsComponent } from './admin-reports/admin-reports.component';
import { EmployeeGuardListComponent } from './employee-guard-list/employee-guard-list.component';
import { EmployeeMaidListComponent } from './employee-maid-list/employee-maid-list.component';
import { AdminAboutComponent } from './admin-about/admin-about.component';
import { AdminContactComponent } from './admin-contact/admin-contact.component';
import { AdminChangePasswordComponent } from './admin-change-password/admin-change-password.component';
import { VisitorTodayComponent } from './visitor-today/visitor-today.component';
import { AdminChatListComponent } from './admin-chat-list/admin-chat-list.component';
import { Home2Component } from './home2/home2.component';
import { NewChatComponent } from './new-chat/new-chat.component';
import { FlatRegAviReportsComponent } from './flat-reg-avi-reports/flat-reg-avi-reports.component';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: '', 
        component: Home2Component,
        children: [
          { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
          { path: 'dashboard', component: DashboardComponent },
          { path: 'employeelist', component: EmployeeListComponent },
          { path: 'visitorlist', component: VisitorListComponent, pathMatch: 'full' },
          { path: 'flatownerlist', component: FlatOwnerListComponent },
          { path: 'adminreports', component: AdminReportsComponent },
        ],
        data: { name: 'Home 2' }  
      },
      { path: 'adminchatlist', component: AdminChatListComponent },
      { path: 'employeereg', component: EmployeeRegComponent },
      { path: 'employeeUpdate', component: EmployeeUpdateComponent },
      { path: 'employeedetails', component: EmployeeDetailsComponent },
      { path: 'employeereports', component: EmployeeReportsComponent },
      { path: 'employeeguard', component: EmployeeGuardListComponent },
      { path: 'employeemaid', component: EmployeeMaidListComponent },
      { path: 'flatownerreg', component: FlatOwnerRegComponent },
      { path: 'flatownerupdate', component: FlatOwnerUpdateComponent },
      { path: 'flatownerdetails', component: FlatOwnerDetailsComponent },
      { path: 'flatownerreports', component: FlatOwnerReportsComponent },
      { path: 'visitorreg', component: VisitorRegComponent },
      { path: 'visitorreports', component: VisitorReportsComponent },
      { path: 'visitordetails', component: VisitorDetailsComponent },
      { path: 'visitortoday', component: VisitorTodayComponent },
      { path: 'visitorbyflatownerfind', component: VisitorByFlatOwnerFindComponent },
      { path: 'profile', component: UserProfileComponent },
      { path: 'tearmandcondition', component: TearmAndConditionComponent },
      { path: 'helpdesk', component: HelpDeskComponent },
      { path: 'adminabout', component: AdminAboutComponent },
      { path: 'admincontact', component: AdminContactComponent },
      { path: 'newchatadmin', component: NewChatComponent },
      { path: 'changepassword', component: AdminChangePasswordComponent },
      { path: 'flatregisteravailable', component: FlatRegAviReportsComponent },
      { path: 'home2', redirectTo: '', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule { }

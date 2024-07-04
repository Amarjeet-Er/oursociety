import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OwnerHomeComponent } from './owner-home/owner-home.component';
import { FlatDashboardComponent } from './flat-dashboard/flat-dashboard.component';
import { FlatEmployeeListComponent } from './flat-employee-list/flat-employee-list.component';
import { OwnerFlatListComponent } from './owner-flat-list/owner-flat-list.component';
import { FlatOwnerProfileComponent } from './flat-owner-profile/flat-owner-profile.component';
import { FlatOwnerChatComponent } from './flat-owner-chat/flat-owner-chat.component';
import { FlatAboutComponent } from './flat-about/flat-about.component';
import { FlatContactComponent } from './flat-contact/flat-contact.component';
import { FlatTermConditionComponent } from './flat-term-condition/flat-term-condition.component';
import { FlatChangePasswordComponent } from './flat-change-password/flat-change-password.component';

const routes: Routes = [
  {
    path: '', component: OwnerHomeComponent,
    children: [
      { path: '', component: FlatDashboardComponent },
      { path: 'dashboard', component: FlatDashboardComponent },
      { path: 'flatemplist', component: FlatEmployeeListComponent },
      { path: 'flatownerlist', component: OwnerFlatListComponent },
    ]
  },
  {path: 'ownerprofile' , component : FlatOwnerProfileComponent},
  {path: 'flatownerchat' , component : FlatOwnerChatComponent},
  {path: 'flatabout' , component : FlatAboutComponent},
  {path: 'flatcontact' , component : FlatContactComponent},
  {path: 'flattermandcondition' , component : FlatTermConditionComponent},
  {path: 'flatchangepassword' , component : FlatChangePasswordComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FlatOwnerHomeRoutingModule { }

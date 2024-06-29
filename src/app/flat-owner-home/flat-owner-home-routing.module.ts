import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OwnerHomeComponent } from './owner-home/owner-home.component';
import { FlatDashboardComponent } from './flat-dashboard/flat-dashboard.component';
import { FlatEmployeeListComponent } from './flat-employee-list/flat-employee-list.component';
import { OwnerFlatListComponent } from './owner-flat-list/owner-flat-list.component';
import { FlatOwnerProfileComponent } from './flat-owner-profile/flat-owner-profile.component';
import { FlatOwnerChatComponent } from './flat-owner-chat/flat-owner-chat.component';

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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FlatOwnerHomeRoutingModule { }

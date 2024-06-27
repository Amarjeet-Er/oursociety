import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OwnerHomeComponent } from './owner-home/owner-home.component';
import { FlatDashboardComponent } from './flat-dashboard/flat-dashboard.component';

const routes: Routes = [
  {
    path: '', component: OwnerHomeComponent,
    children: [
      { path: '', component: FlatDashboardComponent },
      { path: 'dashboard', component: FlatDashboardComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FlatOwnerHomeRoutingModule { }

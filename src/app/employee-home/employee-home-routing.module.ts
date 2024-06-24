import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpHomeComponent } from './emp-home/emp-home.component';
import { EmpDashboardComponent } from './emp-dashboard/emp-dashboard.component';

const routes: Routes = [
  {
    path: '', component: EmpHomeComponent,
    children: [
      { path: '', component: EmpDashboardComponent },
      { path: 'dashboard', component: EmpDashboardComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeHomeRoutingModule { }

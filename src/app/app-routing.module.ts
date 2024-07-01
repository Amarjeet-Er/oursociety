import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

const routes: Routes = [
  { path: '', component: LoginPageComponent },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'employee',
    loadChildren: () => import('./employee-home/employee-home.module').then(m => m.EmployeeHomeModule)
  },
  {
    path: 'flatowner',
    loadChildren: () => import('./flat-owner-home/flat-owner-home.module').then(m => m.FlatOwnerHomeModule)
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'forgotpassword', component: ForgotPasswordComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

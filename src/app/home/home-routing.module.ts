import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import { SideBarComponent } from './side-bar/side-bar.component';

const routes: Routes = [
  {
    path: '', component: HomePage,
    children: [
      { path: '', component: SideBarComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginPageComponent } from './login-page/login-page.component';
import { DashboardComponent } from './home/dashboard/dashboard.component';
import { EmployeeRegComponent } from './home/employee-reg/employee-reg.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployeeListComponent } from './home/employee-list/employee-list.component';
import { SwiperModule } from 'swiper/angular';
import { FlatOwnerRegComponent } from './home/flat-owner-reg/flat-owner-reg.component';
import { FlatOwnerListComponent } from './home/flat-owner-list/flat-owner-list.component';
import { VisitorRegComponent } from './home/visitor-reg/visitor-reg.component';
import { VisitorListComponent } from './home/visitor-list/visitor-list.component';
import { UserProfileComponent } from './home/user-profile/user-profile.component';
import { VisitorDetailsComponent } from './home/visitor-details/visitor-details.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    DashboardComponent,
    EmployeeRegComponent,
    EmployeeListComponent,
    FlatOwnerRegComponent,
    FlatOwnerListComponent,
    VisitorRegComponent,
    VisitorListComponent,
    VisitorDetailsComponent,
    UserProfileComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SwiperModule
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule { }

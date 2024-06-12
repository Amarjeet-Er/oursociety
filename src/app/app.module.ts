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
import { HttpClientModule } from '@angular/common/http';
import { FlatOwnerDetailsComponent } from './home/flat-owner-details/flat-owner-details.component';
import { EmployeeDetailsComponent } from './home/employee-details/employee-details.component';
import { VisitorReportsComponent } from './home/visitor-reports/visitor-reports.component';
import { NgxUiLoaderHttpModule, NgxUiLoaderModule, NgxUiLoaderRouterModule } from "ngx-ui-loader";

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    DashboardComponent,
    EmployeeRegComponent,
    EmployeeListComponent,
    EmployeeDetailsComponent,
    FlatOwnerRegComponent,
    FlatOwnerListComponent,
    FlatOwnerDetailsComponent,
    VisitorRegComponent,
    VisitorListComponent,
    VisitorDetailsComponent,
    VisitorReportsComponent,
    UserProfileComponent,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SwiperModule,
    HttpClientModule,
    NgxUiLoaderModule.forRoot({
      fgsType: 'rectangle-bounce',
      fgsColor: '#000000',
      fgsSize: 70,
      overlayColor: '#0163aa',
      pbThickness: 3,
      pbColor: '#000000',
    }),
    // NgxUiLoaderRouterModule,
    NgxUiLoaderHttpModule,
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule { }



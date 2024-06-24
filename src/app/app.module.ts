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
import { MatIconModule } from '@angular/material/icon';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatMenuModule } from '@angular/material/menu';
import { EmployeeReportsComponent } from './home/employee-reports/employee-reports.component';
import { FlatOwnerReportsComponent } from './home/flat-owner-reports/flat-owner-reports.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TearmAndConditionComponent } from './home/tearm-and-condition/tearm-and-condition.component';
import { EmployeeUpdateComponent } from './home/employee-update/employee-update.component';
import { FlatOwnerUpdateComponent } from './home/flat-owner-update/flat-owner-update.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { EmpHomeComponent } from './employee-home/emp-home/emp-home.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    DashboardComponent,
    EmployeeRegComponent,
    EmployeeUpdateComponent,
    EmployeeListComponent,
    EmployeeDetailsComponent,
    EmployeeReportsComponent,
    FlatOwnerRegComponent,
    FlatOwnerUpdateComponent,
    FlatOwnerListComponent,
    FlatOwnerDetailsComponent,
    FlatOwnerReportsComponent,
    VisitorRegComponent,
    VisitorListComponent,
    VisitorDetailsComponent,
    VisitorReportsComponent,
    UserProfileComponent,
    TearmAndConditionComponent,
    ForgotPasswordComponent,
    EmpHomeComponent,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SwiperModule,
    HttpClientModule,
    MatIconModule,
    MatMenuModule,
    MatSnackBarModule,
    NgxUiLoaderModule,
    NgxUiLoaderHttpModule.forRoot({
      showForeground: true,
    })
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, provideAnimationsAsync()],
  bootstrap: [AppComponent],
})
export class AppModule { }



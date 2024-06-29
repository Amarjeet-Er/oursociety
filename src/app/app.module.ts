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
import { MatSelectModule } from '@angular/material/select';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { HelpDeskComponent } from './home/help-desk/help-desk.component';
import { OwnerHomeComponent } from './flat-owner-home/owner-home/owner-home.component';
import { FlatDashboardComponent } from './flat-owner-home/flat-dashboard/flat-dashboard.component';
import { VisitorByFlatOwnerFindComponent } from './home/visitor-by-flat-owner-find/visitor-by-flat-owner-find.component';
import { AdminReportsComponent } from './home/admin-reports/admin-reports.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { EmployeeGuardListComponent } from './home/employee-guard-list/employee-guard-list.component';
import { EmployeeMaidListComponent } from './home/employee-maid-list/employee-maid-list.component';
import { EmpDashboardComponent } from './employee-home/emp-dashboard/emp-dashboard.component';
import { EmpProfileComponent } from './employee-home/emp-profile/emp-profile.component';
import { EmpVisitorsRegComponent } from './employee-home/emp-visitors-reg/emp-visitors-reg.component';
import { EmpVisitorsDetailsComponent } from './employee-home/emp-visitors-details/emp-visitors-details.component';
import { EmpVisitorsListComponent } from './employee-home/emp-visitors-list/emp-visitors-list.component';
import { FlatEmployeeListComponent } from './flat-owner-home/flat-employee-list/flat-employee-list.component';
import { OwnerFlatListComponent } from './flat-owner-home/owner-flat-list/owner-flat-list.component';
import { FlatOwnerProfileComponent } from './flat-owner-home/flat-owner-profile/flat-owner-profile.component';
import { AdminAboutComponent } from './home/admin-about/admin-about.component';
import { AdminContactComponent } from './home/admin-contact/admin-contact.component';
import { MatBadgeModule } from '@angular/material/badge';
import { FlatOwnerChatComponent } from './flat-owner-home/flat-owner-chat/flat-owner-chat.component';
import { AdminChangePasswordComponent } from './home/admin-change-password/admin-change-password.component';
import { VisitorFlatOwnerFindComponent } from './employee-home/visitor-flat-owner-find/visitor-flat-owner-find.component';

@NgModule({
  declarations: [
    // admin
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
    VisitorByFlatOwnerFindComponent,
    UserProfileComponent,
    TearmAndConditionComponent,
    ForgotPasswordComponent,
    HelpDeskComponent,
    FlatDashboardComponent,
    AdminReportsComponent,
    EmployeeGuardListComponent,
    EmployeeMaidListComponent,
    AdminAboutComponent,
    AdminContactComponent,
    AdminChangePasswordComponent,

    // employe
    EmpHomeComponent,
    EmpDashboardComponent,
    EmpProfileComponent,
    EmpVisitorsListComponent,
    EmpVisitorsRegComponent,
    EmpVisitorsDetailsComponent,
    VisitorFlatOwnerFindComponent,

    // owner 
    OwnerHomeComponent,
    FlatEmployeeListComponent,
    FlatOwnerListComponent,
    OwnerFlatListComponent,
    FlatOwnerProfileComponent,
    FlatOwnerChatComponent,
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
    MatSelectModule,
    CanvasJSAngularChartsModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    MatBadgeModule,
    NgxUiLoaderHttpModule.forRoot({
      showForeground: true,
    })
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, provideAnimationsAsync()],
  bootstrap: [AppComponent],
})
export class AppModule { }



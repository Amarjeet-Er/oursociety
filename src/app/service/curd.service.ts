import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root'
})
export class CurdService {
  base_url: string = ''
  constructor(
    private _shared: SharedService,
    private _http: HttpClient
  ) {
    this._shared.base_url.subscribe(
      (res: any) => {
        console.log(res, 'message');
        this.base_url = res;
      }
    )
  }
  login(data: any) {
    return this._http.post(`${this.base_url}SocietyApi/Check_login`, data);
  }

  //employee
  post_emp_add_edit(data: any) {
    return this._http.post(`${this.base_url}EmployeeRegisterApi/EmployeeRegister`, data);
  }

  get_emp_type() {
    return this._http.get<[]>(`${this.base_url}EmployeeTypeApi/GetEmployeeType`);
  }
  get_emp_list() {
    return this._http.get<[]>(`${this.base_url}AllEmployeeListApi/GetAllRegisteredEmployee`);
  }

  //owner
  get_building_block() {
    return this._http.get<[]>(`${this.base_url}BuildingBlock/Build_Block`)
  }
  get_flat_number(building_id: string) {
    return this._http.get<[]>(`${this.base_url}FlatNumber/FlatNumber?b_id=${building_id}`)
  }
  post_flat_owner_add_edit(data: any) {
    return this._http.post(`${this.base_url}RegisteredFlat/FlatRegister`, data);
  }

  get_flat_owner_list() {
    return this._http.get<[]>(`${this.base_url}RegisteredFlat/Flat_List`)
  }

  //visitors
  get_visistors_list() {
    return this._http.get<[]>(`${this.base_url}VisitorData/VisitorList`)
  }
  post_visitor_add(data: any) {
    return this._http.post(`${this.base_url}VisitorData/AddVisitor`, data);
  }


  //dashboards 
  get_chart_flat_list() {
    return this._http.get<[]>(`${this.base_url}flatChart/FlatChartData`)
  }
  get_chart_emp_list() {
    return this._http.get<[]>(`${this.base_url}EmpChart/EmpChartData`)
  }
  get_chart_visitors_list() {
    return this._http.get<[]>(`${this.base_url}Visitor/VisitorData`)
  }
  get_dashboard_list() {
    return this._http.get<[]>(`${this.base_url}Dashboard/DashboardData`)
  }

  // chating
  get_admin_chat_any(){
    return this._http.get<[]>(`${this.base_url}chatSectionList/GetChatList`)
  }
  get_chat_any(user_id: string) {
    return this._http.get<[]>(`${this.base_url}ChatData/GetUserMessage?userId=${user_id}`)
  }

  post_chating_mes(data: any) {
    return this._http.post(`${this.base_url}ChatData/SendMessage`, data);
  }
}

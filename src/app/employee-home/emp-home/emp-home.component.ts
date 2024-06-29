import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CurdService } from 'src/app/service/curd.service';
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-emp-home',
  templateUrl: './emp-home.component.html',
  styleUrls: ['./emp-home.component.scss'],
})
export class EmpHomeComponent implements OnInit {
  ProfileImg: string = '../../../assets/images/user.webp'
  empId: any;
  emp_id: any;
  empEmail: any;
  profile_data: any;
  emp_filter_data: any;
  img_url: any;

  constructor(
    private _router: Router,
    private _crud: CurdService,
    private _shared: SharedService
  ) {
    this.empId = localStorage.getItem('empId');
    this.emp_id = JSON.parse(this.empId);
    this.empEmail = this.emp_id.Username
    console.log(this.empEmail, 'user id');
  }

  ngOnInit() {
    this._shared.img_base_url.subscribe(
      (data) => {
        this.img_url = data;
      }
    )
    this._crud.get_emp_list().subscribe(
      (res: any) => {
        if (res && res.AllRegisteredEmployee) {
          this.profile_data = res.AllRegisteredEmployee.filter((employee: any) => employee.empEmail === this.empEmail);
          this.emp_filter_data = this.profile_data[0];
          console.log(this.emp_filter_data, 'data');
        }
      }
    );
  }
  onProfileDetails(data: any) {
    this._shared.shared_details.next(data)
    this._router.navigate(['/employee/empprofile'])

  }
  onRegistrationList(): boolean {
    return this._router.isActive('/home/employeelist', true);
  }
  onLogout() {
    this._router.navigate(['/'])
  }
}

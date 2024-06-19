import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss'],
})
export class EmployeeDetailsComponent  implements OnInit {
  emp_details: any;
  img_url: any;

  constructor(
    private _shared:SharedService,
    private _router:Router
  ) { }

  ngOnInit() {
    this._shared.img_base_url.subscribe(
      (res:any)=>{
        this.img_url=res
      }
    )
    this._shared.shared_details.subscribe(
      (res:any)=>{
        console.log(res);
        this.emp_details=res
      }
    )
  }
  onUpdate(data:any){
    this._shared.shared_details.next(data);
    this._router.navigate(['/home/employeeUpdate'])    
  }
}

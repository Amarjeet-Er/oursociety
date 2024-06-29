import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/service/shared.service';
@Component({
  selector: 'app-emp-visitors-details',
  templateUrl: './emp-visitors-details.component.html',
  styleUrls: ['./emp-visitors-details.component.scss'],
})
export class EmpVisitorsDetailsComponent  implements OnInit {

  on_details: any;
  img_url: any;

  constructor(
    private _shared: SharedService,
    private _router: Router
  ) { }

  ngOnInit() {
    this._shared.img_base_url.subscribe(
      (res: any) => {
        this.img_url = res
      }
    )
    this._shared.shared_details.subscribe(
      (res: any) => {
        console.log(res);
        this.on_details = res
      }
    )
  }
}

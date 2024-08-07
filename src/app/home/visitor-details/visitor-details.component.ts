import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-visitor-details',
  templateUrl: './visitor-details.component.html',
  styleUrls: ['./visitor-details.component.scss'],
})
export class VisitorDetailsComponent implements OnInit {
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
        this.on_details = res
      }
    )
  }
}

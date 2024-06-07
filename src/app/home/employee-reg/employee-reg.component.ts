import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
@Component({
  selector: 'app-employee-reg',
  templateUrl: './employee-reg.component.html',
  styleUrls: ['./employee-reg.component.scss'],
})
export class EmployeeRegComponent implements OnInit {
  constructor(
    private _router:Router
  ) { }

  ngOnInit() { }
  onSubmit(): void {
    this._router.navigate(['/home/employeelist']);
  }
}

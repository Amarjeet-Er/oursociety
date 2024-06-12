import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-visitor-reg',
  templateUrl: './visitor-reg.component.html',
  styleUrls: ['./visitor-reg.component.scss'],
})
export class VisitorRegComponent implements OnInit {
  VisitorReg!: FormGroup
  onVehicleSelect: boolean = false;
  findFlatNo: boolean = false
  constructor(
    private _router: Router,
    private _fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.VisitorReg = this._fb.group({
      visitorName: [''],
      visitorPhone: [''],
      visitorsCount: [''],
      vehicleModel: [''],
      vehicleNumber: [''],
      vehicleParking: [''],
      visitorFlatNo: [0],
      visitorStatus: [''],
    });
  }

  toggleVehicleInput(event: any) {
    this.onVehicleSelect = event.detail.checked;
  }
  onFlatFind() {
    this.findFlatNo = true
  }
  onSubmit(): void {
    console.log(this.VisitorReg.value, 'Visistor data');
    return
    this._router.navigate(['/home/visitorlist']);
  }
}

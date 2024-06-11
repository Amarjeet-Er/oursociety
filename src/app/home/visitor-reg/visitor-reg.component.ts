import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-visitor-reg',
  templateUrl: './visitor-reg.component.html',
  styleUrls: ['./visitor-reg.component.scss'],
})
export class VisitorRegComponent  implements OnInit {
  visitorsCount!: number;
  AddVisitorInput: { count: number }[] = [];
  onVehicleSelect: boolean = false;
  Vehicals: any[] = [];
  addAnotherVehicals: boolean = true;
  constructor(
    private _router: Router
  ) { }

  ngOnInit() { }

  onVisitorInput(event: any) {
    if (this.visitorsCount > 7) {
      event.target.setCustomValidity('Maximum 7 members allowed.');
      return
    }
    else {
      event.target.setCustomValidity('');
      this.addFamilyFields()
    }
  }
  addFamilyFields() {
    this.AddVisitorInput = [];
    for (let i = 0; i < this.visitorsCount; i++) {
      this.AddVisitorInput.push({ count: 0 });
    }
  }
  toggleVehicleInput(event: any) {
    this.onVehicleSelect = event.detail.checked;
  }
  addAnotherVehicle() {
    this.addAnotherVehicals = false
    this.Vehicals.push({});
  }
  removeAnotherVehicle(index: number) {
    this.addAnotherVehicals = true
    this.Vehicals.splice(index, 1);
  }
  onSubmit(): void {
    this._router.navigate(['/home/visitorlist']);
  }
}

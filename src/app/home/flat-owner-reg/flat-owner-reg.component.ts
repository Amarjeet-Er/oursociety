import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-flat-owner-reg',
  templateUrl: './flat-owner-reg.component.html',
  styleUrls: ['./flat-owner-reg.component.scss'],
})
export class FlatOwnerRegComponent implements OnInit {
  familyCount!: number;
  AddFamilyInput: { count: number }[] = [];
  onCarSelect: boolean = false;
  cars: any[] = [];
  addAnotherCars: boolean = true;
  constructor(
    private _router: Router
  ) { }

  ngOnInit() { }

  onFamilyInput(event: any) {
    if (this.familyCount > 7) {
      event.target.setCustomValidity('Maximum 7 members allowed.');
      return
    }
    else {
      event.target.setCustomValidity('');
      this.addFamilyFields()
    }
  }
  addFamilyFields() {
    this.AddFamilyInput = [];
    for (let i = 0; i < this.familyCount; i++) {
      this.AddFamilyInput.push({ count: 0 });
    }
  }
  toggleCarInput(event: any) {
    this.onCarSelect = event.detail.checked;
  }
  addAnotherCar() {
    this.addAnotherCars = false
    this.cars.push({});
  }
  removeAnotherCar(index: number) {
    this.addAnotherCars = true
    this.cars.splice(index, 1);
  }
  onSubmit(): void {
    this._router.navigate(['/home/flatownerlist']);
  }
}

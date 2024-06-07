import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-flat-owner-reg',
  templateUrl: './flat-owner-reg.component.html',
  styleUrls: ['./flat-owner-reg.component.scss'],
})
export class FlatOwnerRegComponent implements OnInit {
  familyCount!: number;
  inputFields: { count: number }[] = [];

  onhathiyar: boolean = false;

  constructor(
    private _router: Router
  ) { }

  ngOnInit() { }

  onInput(event: any) {
    let input = event.target.value;
    const digitsOnly = input.replace(/\D/g, '');
    this.familyCount = parseInt(digitsOnly.slice(0, 1), 10);
    if (this.familyCount > 5) {
      this.familyCount = 5;
    }
    this.addInputFields();
  }
  addInputFields() {
    this.inputFields = [];
    for (let i = 0; i < this.familyCount; i++) {
      this.inputFields.push({ count: 0 });
    }
  }
  logSelection1(event: any) {
    this.onhathiyar = event.value === 'Yes';
  }


  onSubmit(): void {
    this._router.navigate(['/home/flatownerlist']);
  }

}

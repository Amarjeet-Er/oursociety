import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-employee-reg',
  templateUrl: './employee-reg.component.html',
  styleUrls: ['./employee-reg.component.scss'],
})
export class EmployeeRegComponent implements OnInit {
  employeeReg!: FormGroup
  constructor(
    private _router: Router,
    private _fb: FormBuilder
  ) { }

  ngOnInit() {
    this.employeeReg = this._fb.group({
      employeeId: [''],
      employeeName: [''],
      employeeEmail: [''],
      employeePhone: [''],
      employeeAddress: [''],
      employeeDesignation: [''],
      employeeSalary: [''],
      employeeJoinDate: [''],
      employeeStatus: ['']
    })
  }
  onSubmit(): void {
    this._router.navigate(['/home/employeelist']);
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  disableSelect = new FormControl(false);
  EmailVerification!: FormGroup;
  hide = true;
  create_password!: FormGroup;
  onVerifyCondition = false;
  onSendCondition = true;
  onverificationCondition = true;
  onchangePassCondition = false;
  constructor(
    private _router: Router,
    private _formBuilder: FormBuilder,
  ) {

  }
  ngOnInit(): void {
    this.EmailVerification = this._formBuilder.group({
      email: ['', Validators.required],
      otp: ['', Validators.required],
      inp1: ['', Validators.required],
      inp2: ['', Validators.required],
      inp3: ['', Validators.required],
      inp4: ['', Validators.required],
    })

    this.create_password = this._formBuilder.group({
      change_pass: ['', Validators.required],
      confirm_pass: ['', Validators.required],
    })
  }

  /////////////////// register email otp send  /////////////////

  onSend() {
    this.onVerifyCondition = true;
    this.onSendCondition = false;

  }

  /////////////////// otp verifyed  /////////////////

  onVerify() {
    this.onverificationCondition = false;
    this.onchangePassCondition = true
  }

  /////////////////// register email otp send  /////////////////

  onChange() {
    this._router.navigate(['/'])
  }

  moveToNext(nextInputId: string, event: any) {
    if (event.target.value.length === 1) {
      const nextInput = document.getElementById(nextInputId) as HTMLInputElement;
      if (nextInput) {
        nextInput.focus();
      }
    }
  }

  onKeyPress(event: KeyboardEvent) {
    const inputValue = (event.target as HTMLInputElement).value;
    if (inputValue.length === 1) {
      event.preventDefault();
    }
  }
}
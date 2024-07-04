import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CurdService } from '../service/curd.service';
import { SharedService } from '../service/shared.service';
import { filter } from 'rxjs/operators';
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
    private _crud:CurdService,
    private _shared:SharedService
  ) {
    this._router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
    });
  }
  ngOnInit(): void {
    this.EmailVerification = this._formBuilder.group({
      email: ['', Validators.required],
      inp1: [''],
      inp2: [''],
      inp3: [''],
      inp4: [''],
    })

    this.create_password = this._formBuilder.group({
      change_pass: ['', Validators.required],
      confirm_pass: ['', Validators.required],
    })
  }

  /////////////////// register email otp send  /////////////////

  onSend() {
    console.log(this.EmailVerification.value);
    
    const formdata = new FormData();
    formdata.append('email', this.EmailVerification.value.email);
    if (this.EmailVerification.valid) {
      this._crud.send_otp(formdata).subscribe(
        (res: any) => {
          console.log(res);
          if (res.Status == 'Success') {
            this._shared.tostSuccessTop('Send OTP Successfully')
            this.onVerifyCondition = true;
            this.onSendCondition = false;
          }
          else {
            this._shared.tostWarningTop('Invalid Email')
          }
        },
        (error: any) => {
          console.error(error);
          this._shared.tostErrorTop('Invalid email try again')
        }
      );
    } else {
      this._shared.tostErrorTop('Please fill out this field')
    }
  }

  /////////////////// otp verifyed  /////////////////

  onVerify() {
    const formdata = new FormData()
    formdata.append('OTP', this.EmailVerification.get('inp1')?.value)
    formdata.append('OTP', this.EmailVerification.get('inp2')?.value)
    formdata.append('OTP', this.EmailVerification.get('inp3')?.value)
    formdata.append('OTP', this.EmailVerification.get('inp4')?.value)
    formdata.append('Email', this.EmailVerification.get('email')?.value)
    if (this.EmailVerification.valid) {
      console.log(this.EmailVerification.value);
      this._crud.send_otp(formdata).subscribe(
        (res: any) => {
          console.log(res);
          this._shared.tostSuccessTop('Verify OTP Successfully')
          this.onverificationCondition = false;
          this.onchangePassCondition = true
        },
        (error: any) => {
          console.error(error);
          this._shared.tostErrorTop('Invalid otp try again')
        }
      );
    } else {
      this._shared.tostErrorTop('Please fill out this field')
    }
  }
  /////////////////// register email otp send  /////////////////

  onChange() {
    if (this.create_password.valid) {
      if (this.create_password.get('change_pass')?.value === this.create_password.get('confirm_pass')?.value) {
        const formdata = new FormData();
        formdata.append('email', this.create_password.get('email')?.value);
        formdata.append('NewPass', this.create_password.get('change_pass')?.value);
        formdata.append('confirmPass', this.create_password.get('confirm_pass')?.value);
        this._crud.change_password(formdata).subscribe(
          (res: any) => {
            console.log(res);
            this._shared.tostSuccessTop('Password Changed Successfully')
            this._router.navigate(['/']);
          },
          (error: any) => {
            console.error(error);
            this._shared.tostErrorTop('Invalid password try again')
          }
        );
      } else {
        this._shared.tostErrorTop('Password and Confirm Password does not match')
      }
    }
    else {
      this._shared.tostErrorTop('Please fill out this field')
    }
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
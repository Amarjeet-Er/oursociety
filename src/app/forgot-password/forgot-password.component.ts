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
export class ForgotPasswordComponent implements OnInit {
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
    private _crud: CurdService,
    private _shared: SharedService
  ) {
    this._router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => { });
  }

  ngOnInit(): void {
    this.EmailVerification = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      pass1: [''],
      pass2: [''],
      pass3: [''],
      pass4: [''],
    });

    this.create_password = this._formBuilder.group({
      change_pass: ['', Validators.required],
      confirm_pass: ['', Validators.required],
    },);
  }

  onSend() {
    if (this.EmailVerification.valid) {
      const formdata = new FormData();
      formdata.append('email', this.EmailVerification.value.email);

      this._crud.send_otp(formdata).subscribe(
        (res: any) => {
          if (res.Status === 'Success') {
            localStorage.setItem('passwordId', JSON.stringify(res));
            this._shared.tostSuccessTop('Send OTP Successfully');
            this.onVerifyCondition = true;
            this.onSendCondition = false;
          } else {
            this._shared.tostWarningTop('Invalid Email');
          }
        },
        (error: any) => {
          console.error(error);
          this._shared.tostErrorTop('Invalid email, try again');
        }
      );
    } else {
      this._shared.tostErrorTop('Please fill out this field');
    }
  }

  onVerify() {
    const pass1 = this.EmailVerification.get('pass1')?.value;
    const pass2 = this.EmailVerification.get('pass2')?.value;
    const pass3 = this.EmailVerification.get('pass3')?.value;
    const pass4 = this.EmailVerification.get('pass4')?.value;

    const otpData = `${pass1}${pass2}${pass3}${pass4}`;
    const email = this.EmailVerification.get('email')?.value;
    const passwordId = JSON.parse(localStorage.getItem('passwordId') || '{}');
    const passwordIdEmail = passwordId.Email;
    const passwordIdOTP = passwordId.OTP;
    console.log('Stored Email:', passwordIdEmail);
    console.log('Stored OTP:', passwordIdOTP);
    console.log('Entered OTP:', otpData);
    console.log('Entered Email:', email);
    if (otpData == passwordIdOTP && email == passwordIdEmail) {
      this._shared.tostSuccessTop('OTP Match Successfully');
      this.onverificationCondition = false;
      this.onchangePassCondition = true;
    } else {
      this._shared.tostErrorTop('Invalid OTP, try again');
    }
  }

  onChange() {
    if (this.create_password.valid) {
      const passwordId = JSON.parse(localStorage.getItem('passwordId') || '{}');
      const passwordIdEmail = passwordId.Email;
      if (this.create_password.get('change_pass')?.value === this.create_password.get('confirm_pass')?.value) {
        const formdata = new FormData();
        formdata.append('email', passwordIdEmail);
        formdata.append('NewPass', this.create_password.get('change_pass')?.value);
        formdata.append('confirmPass', this.create_password.get('confirm_pass')?.value);
        this._crud.change_password(formdata).subscribe(
          (res: any) => {
            if (res.Status === 'Success') {
              this._shared.tostSuccessTop('Password Changed Successfully');
              this._router.navigate(['/']);
            } else {
              this._shared.tostErrorTop('Invalid password, try again');
            }
          },
          (error: any) => {
            console.error(error);
            this._shared.tostErrorTop('Invalid password, try again');
          }
        );
      } else {
        this._shared.tostErrorTop('Password and Confirm Password do not match');
      }
    }
    else {
      this._shared.tostErrorTop('Please fill out all fields correctly');
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

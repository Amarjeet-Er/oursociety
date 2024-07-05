import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from '../service/shared.service';
import { CurdService } from '../service/curd.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  hide: boolean = true;
  disableSelect = new FormControl(false);
  login_form!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private _router: Router,
    private _shared: SharedService,
    private _crud: CurdService
  ) {
    localStorage.removeItem
    localStorage.clear()
  }
  ngOnInit() {
    this.login_form = this.fb.group({
      Email: ['', Validators.required],
      Password: ['', Validators.required],
    })
  }
  onLogin() {
    if (this.login_form.valid) {
      const formdata = new FormData();
      formdata.append('Email', this.login_form.get('Email')?.value)
      formdata.append('Password', this.login_form.get('Password')?.value)

      this._crud.login(formdata).subscribe(
        (res: any) => {
          if (res.Status === 'Success') {
            if (res.RollId === 'Admin') {
              localStorage.setItem('userId', JSON.stringify(res))
              this._router.navigate(['home'])
              this._shared.tostSuccessBottom('Login Successfully...')
            }

            else if (res.RollId === 'Guard') {
              localStorage.setItem('empId', JSON.stringify(res))
              this._router.navigate(['employee'])
              this._shared.tostSuccessBottom('Login Successfully...')
            }

            if (res.RollId === 'FlatOwner') {
              localStorage.setItem('flatId', JSON.stringify(res))
              this._router.navigate(['flatowner'])
              this._shared.tostSuccessBottom('Login Successfully...')
            }
          }
          else {
            this._shared.tostErrorTop('Invalid Username or Password')
          }
        },
        (err: any) => {
          this._shared.tostErrorTop('Login Field')
        }
      )
    }
    else {
      this._shared.tostWarningTop('Plz Fill out this field')
    }
  }
}
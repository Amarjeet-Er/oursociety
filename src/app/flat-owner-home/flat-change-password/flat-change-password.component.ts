import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CurdService } from 'src/app/service/curd.service';
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-flat-change-password',
  templateUrl: './flat-change-password.component.html',
  styleUrls: ['./flat-change-password.component.scss'],
})
export class FlatChangePasswordComponent  implements OnInit {

  changePassword!: FormGroup
  UserId: any;
  admin_id: any;
  user_id: any;

  constructor(
    private _crud: CurdService,
    private _fb: FormBuilder,
    private _shared: SharedService,
    private _router: Router
  ) {
    this.UserId = localStorage.getItem('flatId');
    this.user_id = JSON.parse(this.UserId);
    this.admin_id = this.user_id?.Username;
  }

  ngOnInit() {
    this.changePassword = this._fb.group({
      OldPassword: ['', Validators.required],
      newPass: ['', Validators.required],
      ConfirmPass: ['', Validators.required]
    })
  }
  onChange() {
    const formdata = new FormData();
    formdata.append('Email', this.admin_id)
    formdata.append('OldPassword', this.changePassword.get('OldPassword')?.value)
    formdata.append('newPass', this.changePassword.get('newPass')?.value)
    formdata.append('ConfirmPass', this.changePassword.get('ConfirmPass')?.value)
    if (this.changePassword.valid) {
      this._crud.post_change_password(formdata).subscribe(
        (res: any) => {
          if (res.Status === "Success") {
            this._shared.tostSuccessTop('Change Password Successfully...')
            this._router.navigate(['/flatowner'])
            this.changePassword.reset();
          }
          if (res.Status === "error") {
            this._shared.tostErrorTop('Incorrect Old Password')
          }
        },
        (err: any) => {
          this._shared.tostErrorTop('Something went wrong')
        }
      );
    }
    else {
      this._shared.tostWarningTop('Please fill up the form')
    }
  }
}

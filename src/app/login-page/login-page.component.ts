import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  loginForm!: FormGroup;
  hide: boolean = true;

  constructor(
    private _formBuilder: FormBuilder,
    private _router:Router
  ) { }

  ngOnInit() {
    this.loginForm = this._formBuilder.group({
      Username: [''],
      Password: ['']
    });
  }
  onLogin(data:any){
    if(data === '123'){
      this._router.navigate(['home'])
      alert('Login Successfully...')
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent  implements OnInit {
  ProfileImg: string = '../../../assets/images/user.webp'

  constructor(
    private _router:Router
  ) { }

  ngOnInit() {}

}

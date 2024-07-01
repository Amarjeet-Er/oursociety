import { Component, OnInit } from '@angular/core';
import { CurdService } from 'src/app/service/curd.service';

@Component({
  selector: 'app-help-desk',
  templateUrl: './help-desk.component.html',
  styleUrls: ['./help-desk.component.scss'],
})
export class HelpDeskComponent implements OnInit {
  chat_user: any;
  UserId: any;
  user_id: any;
  admin_id: any;

  constructor(
    private _crud: CurdService,
  ) {
    this.UserId = localStorage.getItem('userId');
    this.user_id = JSON.parse(this.UserId);
    this.admin_id = this.user_id?.RollId;
   }

  ngOnInit() {
    // this._crud.get_chat_any().subscribe(
    //   (res: any) => {
    //     if (res.Status === 'Succes') {
    //       this.chat_user = res.Data;
    //       console.log(this.chat_user,'chat');
    //     }
    //   }
    // )
  }
}

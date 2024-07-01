import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CurdService } from 'src/app/service/curd.service';
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-help-desk',
  templateUrl: './help-desk.component.html',
  styleUrls: ['./help-desk.component.scss'],
})
export class HelpDeskComponent implements OnInit {
  chat_message!: FormGroup

  chat_user: any;
  UserId: any;
  user_id: any;
  admin_id: any;
  img_url: any;
  chat_mes_list: any;
  chat_name_list: any;

  constructor(
    private _crud: CurdService,
    private _shared: SharedService,
    private _fb: FormBuilder
  ) {
    this.UserId = localStorage.getItem('userId');
    this.user_id = JSON.parse(this.UserId);
    this.admin_id = this.user_id?.RollId;
    this._shared.img_base_url.subscribe(
      (res: any) => {
        this.img_url = res
      }
    )
    this._shared.shared_details.subscribe(
      (res: any) => {
        console.log(res);
        this.chat_name_list = res.userId
        console.log(this.chat_name_list, 'dsasad');

      },
      (error) => {
        console.error('Error fetching chat data:', error);
      }
    );
    this._crud.get_chat_any(this.admin_id).subscribe(
      (res: any) => {
        console.log(res.Data);
        this.chat_mes_list = res.Data
      },
      (error) => {
        console.error('Error fetching chat data:', error);
      }
    );
  }

  ngOnInit() {
    this.chat_message = this._fb.group({
      message: [''],
      responseBy: [''],
      responseTo: [''],
      userId: [''],
    })
  }
  onSendChat() {
    const formdata = new FormData()
    formdata.append('message', this.chat_message.get('message')?.value);
    formdata.append('responseBy', this.admin_id);
    formdata.append('responseTo', this.chat_name_list);
    formdata.append('userId', this.admin_id);
    if (this.chat_message.valid) {
      this._crud.post_chating_mes(formdata).subscribe(
        (res) => {
          console.log(res, 'res');
          this.chat_message.reset();
        },
      )
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CurdService } from 'src/app/service/curd.service';
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-flat-owner-chat',
  templateUrl: './flat-owner-chat.component.html',
  styleUrls: ['./flat-owner-chat.component.scss'],
})
export class FlatOwnerChatComponent implements OnInit {
  chat_message!: FormGroup
  flatId: any;
  flat_id: any;
  flatOwnerId: any;
  adminEmail: string = 'admin@gmail.com'
  chat_mes_list: any;
  reg_filter_data: any;
  admin_chat_data: any;
  admin_data: any;
  img_url: any;
  constructor(
    private _fb: FormBuilder,
    private _crud: CurdService,
    private _shared:SharedService
  ) {
    this.flatId = localStorage.getItem('flatId');
    this.flat_id = JSON.parse(this.flatId);
    this.flatOwnerId = this.flat_id?.Username;
    console.log(this.flatOwnerId, 'email');

    this._shared.img_base_url.subscribe(
      (res:any)=>{
        this.img_url=res
      }
    )
    this._crud.get_chat_any(this.flatOwnerId).subscribe(
      (res: any) => {
        console.log(res.Data);
        this.chat_mes_list=res.Data
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
    formdata.append('responseBy', this.flatOwnerId);
    formdata.append('responseTo', this.adminEmail);
    formdata.append('userId', this.flatOwnerId);
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

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { CurdService } from 'src/app/service/curd.service';
import { SharedService } from 'src/app/service/shared.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-new-chat',
  templateUrl: './new-chat.component.html',
  styleUrls: ['./new-chat.component.scss'],
})
export class NewChatComponent implements OnInit {

  chat_message!: FormGroup

  chat_user: any;
  UserId: any;
  user_id: any;
  admin_id: any;
  img_url: any;
  chat_mes_list: any;
  chat_name_list: any;
  chat_mes_data: any;
  chat_name: any;

  constructor(
    private _crud: CurdService,
    private _shared: SharedService,
    private _fb: FormBuilder,
    private _router: Router
  ) {
    this.UserId = localStorage.getItem('userId');
    this.user_id = JSON.parse(this.UserId);
    this.admin_id = this.user_id?.RollId;

    this._router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
      this.fetchChatMessages();
    });

    this.fetchChatMessages();
  }


  ngOnInit() {
    this.chat_message = this._fb.group({
      message: ['', Validators.required],
      responseBy: [''],
      responseTo: [''],
      userId: [''],
    });
  }

  onSendChat() {

    const formdata = new FormData();
    formdata.append('message', this.chat_message.get('message')?.value);
    formdata.append('responseBy', this.admin_id);
    formdata.append('responseTo', this.chat_message.get('responseTo')?.value);
    formdata.append('userId', this.admin_id);

    if (this.chat_message.valid) {
      this._crud.post_chating_mes(formdata).subscribe(
        (res) => {
          this.fetchChatMessages();
          this.chat_message.reset();
          this._router.navigate(['/home/adminchatlist'])
          this._shared.tostSuccessTop('Message Success')
        },
        (error) => {
          console.error('Error sending chat message:', error);

        }
      );
    }
  }

  private fetchChatMessages() {
    this._crud.get_chat_admin_by_flat(this.chat_name_list).subscribe(
      (res: any) => {
        this.chat_mes_list = res.Data;
      },
      (error) => {
        console.error('Error fetching chat data:', error);
      }
    );
  }
}

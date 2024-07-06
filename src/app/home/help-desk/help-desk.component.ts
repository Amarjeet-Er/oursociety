import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { CurdService } from 'src/app/service/curd.service';
import { SharedService } from 'src/app/service/shared.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-help-desk',
  templateUrl: './help-desk.component.html',
  styleUrls: ['./help-desk.component.scss'],
})
export class HelpDeskComponent implements OnInit, AfterViewChecked {
  @ViewChild('chatMessages') private chatMessagesContainer!: ElementRef;
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
    this._shared.img_base_url.subscribe(
      (res: any) => {
        this.img_url = res
      }
    )
    this._shared.shared_details.subscribe(
      (res: any) => {
        this.chat_name = res
        this.chat_name_list = res.userId
      },
      (error) => {
        console.error('Error fetching chat data:', error);
      }
    );

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
  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.chatMessagesContainer.nativeElement.scrollTop = this.chatMessagesContainer.nativeElement.scrollHeight;
    } catch (err) {
      console.error('Scroll to bottom failed:', err);
    }
  }

  onSendChat() {
    const formdata = new FormData();
    formdata.append('message', this.chat_message.get('message')?.value);
    formdata.append('responseBy', this.admin_id);
    formdata.append('responseTo', this.chat_name_list);
    formdata.append('userId', this.admin_id);

    if (this.chat_message.valid) {
      this._crud.post_chating_mes(formdata).subscribe(
        (res) => {
          this.fetchChatMessages();
          this.chat_message.reset();
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

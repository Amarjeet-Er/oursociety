import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { CurdService } from 'src/app/service/curd.service';
import { SharedService } from 'src/app/service/shared.service';
import { filter } from 'rxjs/operators';
@Component({
  selector: 'app-flat-owner-chat',
  templateUrl: './flat-owner-chat.component.html',
  styleUrls: ['./flat-owner-chat.component.scss'],
})
export class FlatOwnerChatComponent implements OnInit {
  @ViewChild('chatMessages') private chatMessagesContainer!: ElementRef;
  chat_message!: FormGroup;
  flatId: any;
  flat_id: any;
  flatOwnerId: any;
  adminEmail: string = 'admin@gmail.com';
  chat_mes_list: any;
  reg_filter_data: any;
  admin_chat_data: any;
  admin_data: any;
  img_url: any;
  flat_data: any;
  flat_filter_data: any;

  constructor(
    private _fb: FormBuilder,
    private _crud: CurdService,
    private _shared: SharedService,
    private _router: Router,
  ) {
    this.flatId = localStorage.getItem('flatId');
    this.flat_id = JSON.parse(this.flatId);
    this.flatOwnerId = this.flat_id?.Username;

    this._shared.img_base_url.subscribe((res: any) => {
      this.img_url = res;
    });
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
    formdata.append('responseBy', this.flatOwnerId);
    formdata.append('responseTo', this.adminEmail);
    formdata.append('userId', this.flatOwnerId);

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
    this._crud.get_chat_any(this.flatOwnerId).subscribe(
      (res: any) => {
        this.chat_mes_list = res.Data;
        if (res && res.Data) {
          this.flat_data = res.Data.filter((flat: any) => flat.userId === "Admin");
          this.flat_filter_data = this.flat_data[0];
        }
      },
      (error) => {
        console.error('Error fetching chat data:', error);
      }
    );
  }
}

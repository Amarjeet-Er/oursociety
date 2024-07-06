import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { CurdService } from 'src/app/service/curd.service';
import { SharedService } from 'src/app/service/shared.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-admin-chat-list',
  templateUrl: './admin-chat-list.component.html',
  styleUrls: ['./admin-chat-list.component.scss'],
})
export class AdminChatListComponent implements OnInit {
  chat_mes_list: any;
  img_url: any;

  constructor(
    private _crud: CurdService,
    private _shared: SharedService,
    private _router: Router
  ) {
    this._shared.img_base_url.subscribe(
      (res: any) => {
        this.img_url = res
      }
    )
  }

  ngOnInit() {
    this._router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
      this.loadData();
    });

    this.loadData();
  }
  loadData() {
    this._crud.get_admin_chat_any().subscribe(
      (res: any) => {
        this.chat_mes_list = res.Data
      },
      (error) => {
        console.error('Error fetching chat data:', error);
      }
    );
  }
  ondetailschat(data: any) {
    this._shared.shared_details.next(data)
    this._router.navigate(['/home/helpdesk'])
  }
}

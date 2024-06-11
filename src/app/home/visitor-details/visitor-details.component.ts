import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-visitor-details',
  templateUrl: './visitor-details.component.html',
  styleUrls: ['./visitor-details.component.scss'],
})
export class VisitorDetailsComponent  implements OnInit {
  data_ex: any;

  constructor(
    private http:HttpClient
  ) { }

  ngOnInit() {
    this.http.get('https://pankajmalik.in/api/registrationListApi').subscribe(
      (res:any)=>{
        console.log(res);
        this.data_ex=res[0]
      }

    )
  }
}

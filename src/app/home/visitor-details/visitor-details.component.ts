import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-visitor-details',
  templateUrl: './visitor-details.component.html',
  styleUrls: ['./visitor-details.component.scss'],
})
export class VisitorDetailsComponent  implements OnInit {

  constructor(
    private http:HttpClient
  ) { }

  ngOnInit() {
   
  }
}

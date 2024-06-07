import { Component, OnInit } from '@angular/core';
import SwiperCore, { Autoplay, Pagination, Navigation } from "swiper";
SwiperCore.use([Autoplay, Pagination, Navigation]);
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit() { }
  slider_data = [
    { img_url: 'https://png.pngtree.com/thumb_back/fh260/background/20190221/ourmid/pngtree-public-welfare-society-charitable-big-love-image_11679.jpg' },
    { img_url: 'https://ksac.kiit.ac.in/wp-content/uploads/2021/04/College-Societies.jpg' },
    { img_url: 'https://upraise.io/wp-content/uploads/2019/12/Asset-1-1.png' },
    { img_url: 'https://media.slidesgo.com/storage/160533/upload.png' },
    { img_url: 'https://static9.depositphotos.com/1006899/1214/i/450/depositphotos_12146383-stock-photo-circle-of-with-leader.jpg' },
    { img_url: 'https://media.istockphoto.com/id/1362895369/vector/vector-illustration-of-a-group-of-young-people-clapping.jpg?s=612x612&w=0&k=20&c=0E6JI0XzqacKY2Vv-bDYLKnED5IGA-NcHCJOP1Ng0RM=', }
  ]
}

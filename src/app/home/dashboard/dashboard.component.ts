import { Component, OnInit } from '@angular/core';
import SwiperCore, { Autoplay, Pagination, Navigation } from "swiper";
SwiperCore.use([Autoplay, Pagination, Navigation]);
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  greetingColor: any;

  constructor() { }

  ngOnInit() { }
  slider_data = [
    { img_url: 'https://media.istockphoto.com/id/596792426/photo/shinjuku-shopping-district-tokyo-japan.webp?b=1&s=170667a&w=0&k=20&c=eSnM5M0kxisc15MUNA5SLRicOWvaDUS4pCgDrU2mETk=' },
    { img_url: 'https://images.unsplash.com/photo-1537919747229-733016a8058f?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { img_url: 'https://media.istockphoto.com/id/1175150202/photo/a-group-of-friends-meet-in-kabukicho-in-shinjuku.jpg?s=612x612&w=0&k=20&c=mUIFE0JAOuUthh-DAoKc2rUtsY6UvLsmujv79bpT4pw=' },
    { img_url: 'https://images.pexels.com/photos/7883856/pexels-photo-7883856.jpeg?auto=compress&cs=tinysrgb&h=627&fit=crop&w=1200' },
    { img_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsZVmzs2OhxTamHAZW0HJ6FMrB1pO3lJEkf0LgxeWk_s7vAdMPVvr22nkwWWi4PoJ6v8Y&usqp=CAU' },
    { img_url: 'https://media.istockphoto.com/id/1362895369/vector/vector-illustration-of-a-group-of-young-people-clapping.jpg?s=612x612&w=0&k=20&c=0E6JI0XzqacKY2Vv-bDYLKnED5IGA-NcHCJOP1Ng0RM=', }
  ]

  updateGreetingColor(): void {
    const hours = new Date().getHours();
    if (hours < 12) {
      this.greetingColor = 'orange';
    } else if (hours < 18) {
      this.greetingColor = 'blueviolet';
    } else {
      this.greetingColor = 'rgb(10, 175, 252)';
    }
  }
  GratingData(): string {
    const hours = new Date().getHours();
    if (hours < 12) {
      return 'Good morning!';
    } else if (hours < 18) {
      return 'Good afternoon!';
    } else {
      return 'Good evening!';
    }
  }
}

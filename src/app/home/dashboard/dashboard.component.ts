import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  @ViewChild('visitorColumnChart', { static: true }) visitorColumnChart!: ElementRef;
  @ViewChild('EmpChart', { static: true }) EmpChart!: ElementRef;
  @ViewChild('FlatChart', { static: true }) FlatChart!: ElementRef;

  constructor(
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.createColumnChart();
    this.AllEmpChart();
    this.AllFlatChart();
  }

  createColumnChart(): void {
    const ctxColumn = this.visitorColumnChart.nativeElement.getContext('2d');
    Chart.register(...registerables);
    new Chart(ctxColumn, {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
          label: 'Visitors',
          data: [100, 200, 150, 300, 280, 600, 350, 200, 450, 600, 550, 700],
          backgroundColor: '#0163aa',
          borderColor: '#0163aa',
          borderWidth: 1
        }]
      },
    });
  }

  AllEmpChart(): void {
    const ctx = this.EmpChart.nativeElement.getContext('2d');
    const chart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Peon', 'Security Guard'],
        datasets: [{
          label: 'All Employee',
          data: [19, 9],
          backgroundColor: [
            'orange',
            'green',
          ]
        }]
      }
    });
  }
  AllFlatChart(): void {
    const ctx = this.FlatChart.nativeElement.getContext('2d');
    const chart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Registered', 'Available'],
        datasets: [{
          label: 'All Flat',
          data: [7, 12],
          backgroundColor: [
            'red',
            'green',
          ],
        }],
      },
    });
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

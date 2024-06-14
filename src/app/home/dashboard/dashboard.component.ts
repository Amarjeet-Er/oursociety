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
  @ViewChild('ReportChart', { static: true }) ReportChart!: ElementRef;

  constructor(
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.createColumnChart();
    this.createPieChart();
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

  createPieChart(): void {
    const ctx = this.ReportChart.nativeElement.getContext('2d');
    const chart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Flat Owner', 'Employee', 'Visitor'],
        datasets: [{
          label: 'Reports',
          data: [19, 25, 30],
          backgroundColor: [
            'orange',
            'green',
            'purple',
          ]
        }]
      }
    });

    ctx.canvas.addEventListener('click', (event: MouseEvent) => {
      const activeSegment = chart.getActiveElements();
      if (activeSegment && activeSegment.length > 0) {
        const clickedSegmentIndex = activeSegment[0].index;
        switch (clickedSegmentIndex) {
          case 0:
            this._router.navigate(['/home/flatownerreports']);
            break;
          case 1:
            this._router.navigate(['/home/employeereports']);
            break;
          case 2:
            this._router.navigate(['/home/visitorreports']);
            break;
          default:
            break;
        }
      }
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

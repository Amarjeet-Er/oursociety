import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chart, registerables } from 'chart.js';
import { CurdService } from 'src/app/service/curd.service';
import { SharedService } from 'src/app/service/shared.service';
@Component({
  selector: 'app-emp-dashboard',
  templateUrl: './emp-dashboard.component.html',
  styleUrls: ['./emp-dashboard.component.scss'],
})
export class EmpDashboardComponent implements OnInit {
  @ViewChild('visitorColumnChart', { static: true }) visitorColumnChart!: ElementRef;
  list_visistor: any;
  flat_owner_list: any;
  list_dashboard: any;
  list_emp_total: any;
  empId: any;
  emp_id: any;
  empEmail: any;
  profile_data: any;
  emp_filter_data: any;
  img_url: any;
  visitor_list: any;
  reg_data: any;
  constructor(
    private _router: Router,
    private _crud: CurdService,
    private _shared: SharedService
  ) {
    this.empId = localStorage.getItem('empId');
    this.emp_id = JSON.parse(this.empId);
    this.empEmail = this.emp_id.Username
    this._crud.get_emp_list().subscribe(
      (res: any) => {
        this.list_emp_total = res.AllRegisteredEmployee;
      }
    )
    this._crud.get_dashboard_list().subscribe(
      (res: any) => {
        this.list_dashboard = res.Data;
      }
    )
    this._crud.get_visistors_list().subscribe(
      (res: any) => {
        this.visitor_list = res.Data;
      }
    )
  }

  ngOnInit(): void {
    this._shared.img_base_url.subscribe(
      (data) => {
        this.img_url = data;
      }
    )
    this._crud.get_emp_list().subscribe(
      (res: any) => {
        if (res && res.AllRegisteredEmployee) {
          this.profile_data = res.AllRegisteredEmployee.filter((employee: any) => employee.empEmail === this.empEmail);
          this.emp_filter_data = this.profile_data[0];
        }
      }
    );

    this.createColumnChart();
  }

  createColumnChart(): void {
    const ctxColumn = this.visitorColumnChart.nativeElement.getContext('2d');
    Chart.register(...registerables);
    this._crud.get_chart_visitors_list().subscribe(
      (res: any) => {
        this.list_visistor = res.Data
        const myChart = new Chart(ctxColumn, {
          type: 'bar',
          data: {
            labels: this.list_visistor.map((item: any) => item.name),
            datasets: [{
              label: 'Visitors',
              data: this.list_visistor.map((item: any) => item.total),
              backgroundColor: [
                'rgba(54, 162, 235, 0.3)',
                'rgba(255, 206, 86, 0.3)',
                'rgba(255, 99, 132, 0.3)',
                'rgba(75, 192, 192, 0.3)',
                'rgba(153, 102, 255, 0.3)',
                'rgba(11, 101, 11, 0.3)'
              ],
              borderColor: [
                'rgb(54, 162, 235)',
                'rgb(255, 206, 86)',
                'rgb(255, 99, 132)',
                'rgb(75, 192, 192)',
                'rgb(153, 102, 255)',
                'rgb(11, 101, 11)',
              ],
              borderWidth: 1,
            }],
          },
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
      }
    );
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

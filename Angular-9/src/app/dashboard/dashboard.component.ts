import { Component, AfterViewInit, OnInit } from '@angular/core';
import { DashboardService } from '../@services/dashboard.service';
import { BrandDto, ProjectDto } from '../@models/dashboard';
import { ActivatedRoute, Params } from '@angular/router';


@Component({
    templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements AfterViewInit, OnInit {

  subtitle: string;

  brands: BrandDto[];
  projects: ProjectDto[];

    constructor(private dashboardService: DashboardService, private route: ActivatedRoute) {
        this.subtitle = 'FarshBoom';
        this.route.params.subscribe(
          (param: Params) => {
            this.route.data.subscribe(data => {
              this.brands = data['brands'];
              this.projects = data['projects'];
              this.doughnutChartLabels = this.brands.map(woak => woak.brandName);
              this.doughnutChartData = this.brands.map(woak => woak.brand);

              this.lineChartLabels = this.projects.map(woak => woak.projectName);
              this.lineChartData = [{data: this.projects.map(woak => woak.header), label: 'نمایشگاه های اخیر ما'}];
            });
          }, error => {console.log(error)}, () => {

          }
        )
    }

    ngOnInit(): void {
      // this.dashboardService.getBrnads().subscribe((_brands: BrandDto[]) => {
      //   this.brands = _brands;
      // }, (error) => {

      // }, ()=> {
      //   this.doughnutChartLabels = this.brands.map(woak => woak.brandName);
      //   this.doughnutChartData = this.brands.map(woak => woak.brand);
      // });

      // this.dashboardService.getProjects().subscribe((_projects: ProjectDto[]) => {
      //   this.projecs = _projects;
      // }, (error) => {

      // }, ()=> {
      //   this.lineChartLabels = this.projecs.map(woak => woak.projectName);
      //   this.lineChartData = this.projecs.map(woak => woak.header);
      // });
    }
    // Doughnut
    public doughnutChartLabels: string[];// = ['تبریز', 'مشهد', 'سنندج', 'عرب', 'ترنج', 'سایر'];
    public doughnutChartOptions: any = {
        borderWidth: 1,
        maintainAspectRatio: false
    };
    public doughnutChartData: number[];// = [40, 20, 10, 50, 30, 22];
    public doughnutChartType = 'doughnut';
    public doughnutChartLegend = false;

    public lineChartData: Array<any>;// = [{ data: [10, 5, 6, 8, 5, 9, 8, 24], label: 'Site A' },
     //{ data: [10, 3, 1, 2, 3, 10, 5, 1], label: 'Site B' }];
    public lineChartLabels: Array<any>;// = ['1', '2', '3', '4', '5', '6', '7', '8'];
    public lineChartOptions: any = {
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true
                    },
                    gridLines: {
                        color: 'rgba(120, 130, 140, 0.13)'
                    }
                }
            ],
            xAxes: [
                {
                    gridLines: {
                        color: 'rgba(120, 130, 140, 0.13)'
                    }
                }
            ]
        },
        responsive: true,
        maintainAspectRatio: false
    };
    public lineChartColors: Array<any> = [
        {
            // grey
            backgroundColor: 'rgba(6,215,156,0.1)',
            borderColor: 'rgba(6,215,156,1)',
            pointBackgroundColor: 'rgba(6,215,156,1)',
            pointBorderColor: '#fff',

            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(6,215,156,0.5)'
        },
        {
            // dark grey
            backgroundColor: 'rgba(57,139,247,0.2)',
            borderColor: 'rgba(57,139,247,1)',
            pointBackgroundColor: 'rgba(57,139,247,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(57,139,247,0.5)'
        }
    ];
    public lineChartLegend = false;
    public lineChartType = 'line';
    ngAfterViewInit() { }
}

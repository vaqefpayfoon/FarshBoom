import { Component, AfterViewInit, OnInit, ViewChild } from '@angular/core';
import { DashboardService } from '../@services/dashboard.service';
import { BrandDto, ProjectDto } from '../@models/dashboard';
import { ActivatedRoute, Params } from '@angular/router';
import { Pagination, PaginatedResult } from '../@models/pagination';
import { Good } from '../@models/Good';
import { environment } from '../../environments/environment';
import { GoodService } from '../@services/good.service';
import { Size, Type, Brand} from '../@models/base';
import { User } from '../@models/user';
import { BaseService } from '../@services/base.service';
import { Slide } from '../@models/slide';
import { NgbCarouselConfig, NgbSlideEvent, NgbSlideEventSource, NgbCarousel } from '@ng-bootstrap/ng-bootstrap';
import { SlideService } from '../@services/slide.service';


@Component({
    templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements AfterViewInit, OnInit {

  subtitle: string;
  page = 1;
  pagination: Pagination;
  userParams: any = {};
  goods: Good[];
  allGoods: Good[];
  good: Good;
  saveState: string = "0";

  sizes: Size[];
  types: Type[];
  brands: Brand[];
  users: User[];

  successMessage: string = environment.successful;
  errorMessage: string = environment.error;
  brandsDto: BrandDto[];
  projects: ProjectDto[];

    constructor(private dashboardService: DashboardService, private route: ActivatedRoute, private goodService: GoodService, private baseService: BaseService, config: NgbCarouselConfig, private slideService: SlideService) {
        this.subtitle = 'FarshBoom';
        this.route.params.subscribe(
          (param: Params) => {
            this.route.data.subscribe(data => {
              this.brandsDto = data['brands'];
              this.projects = data['projects'];
              this.doughnutChartLabels = this.brandsDto.map(woak => woak.brandName);
              this.doughnutChartData = this.brandsDto.map(woak => woak.brand);

              this.lineChartLabels = this.projects.map(woak => woak.projectName);
              this.lineChartData = [{data: this.projects.map(woak => woak.header), label: 'نمایشگاه های اخیر ما'}];
            });
          }, error => {console.log(error)}, () => {

          }
        )
        config.interval = 3500;
        config.wrap = true;
        config.keyboard = false;

        config.showNavigationArrows = true;
        config.showNavigationIndicators = true;
    }
    showNavigationArrows = false;
	showNavigationIndicators = false;

  slides: Slide[];
    ngOnInit() {
      this.route.data.subscribe(data => {
        this.slides = data['slides'];
        this.slides.forEach(element => {
            element.image = 'data:image/jpg;base64,' + element.image;
        });
      });

      this.baseService.getSliderBase().subscribe((res) => {
       this.sizes = res.sizes;
       this.types = res.types;
       this.brands = res.brands;
       this.users = res.users;


     })

      this.goodService.getGoods().subscribe((allGoods: Good[]) => {
        this.allGoods = allGoods;
      })

    }


    pageChanged(event: any): void {
      this.pagination.currentPage = event.page;
      this.loadGoods();
    }

    loadGoods() {
      this.goodService.getAllGoods(this.pagination.currentPage, this.pagination.itemsPerPage, this.userParams)
        .subscribe((res: PaginatedResult<Good[]>) => {
          this.goods = res.result;
          this.pagination = res.pagination;
      }, error => {

      }, () => {this.page = this.pagination.currentPage});
    }
    selectedGood: Good;
    selectEvent(item: Good) {
      this.selectedGood = item;
    }

    resetFilters() {
     this.userParams.pageNumber = 1;
     this.userParams.pageSize = 5;
     this.userParams.userId = null;
     this.userParams.typeId = null;
     this.userParams.sizeId = null;
     this.userParams.brandId = null;
     this.loadGoods();
   }
    // Doughnut
    public doughnutChartLabels: string[];
    public doughnutChartOptions: any = {
        borderWidth: 1,
        maintainAspectRatio: false
    };
    public doughnutChartData: number[];
    public doughnutChartType = 'doughnut';
    public doughnutChartLegend = false;

    public lineChartData: Array<any>;
    public lineChartLabels: Array<any>;
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
    newSlides: any;
	  paused = false;
	  unpauseOnArrow = false;
	  pauseOnIndicator = false;
	  pauseOnHover = false;

	  @ViewChild('carousel', {static : true}) carousel: NgbCarousel;

	  togglePaused() {
	    if (this.paused) {
	      this.carousel.cycle();
	    } else {
	      this.carousel.pause();
	    }
	    this.paused = !this.paused;
	  }

	  onSlide(slideEvent: NgbSlideEvent) {
	    if (this.unpauseOnArrow && slideEvent.paused &&
	      (slideEvent.source === NgbSlideEventSource.ARROW_LEFT || slideEvent.source === NgbSlideEventSource.ARROW_RIGHT)) {
	      //this.togglePaused();
	    }
	    if (this.pauseOnIndicator && !slideEvent.paused && slideEvent.source === NgbSlideEventSource.INDICATOR) {
	      //this.togglePaused();
	    }
	  }

}

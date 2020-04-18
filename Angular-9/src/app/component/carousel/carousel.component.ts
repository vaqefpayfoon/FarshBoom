import { Component, ViewChild } from '@angular/core';
import { NgbCarouselConfig, NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import { SlideService } from '../../@services/slide.service';
import { ActivatedRoute } from '@angular/router';
import { Slide } from '../../@models/slide';

@Component({
	selector: 'app-ngbd-buttons-radio',
	templateUrl: './carousel.component.html',
	providers: [NgbCarouselConfig]
})
export class NgbdCarouselBasicComponent {
	showNavigationArrows = false;
	showNavigationIndicators = false;

	constructor(config: NgbCarouselConfig, private slideService: SlideService, private route: ActivatedRoute) {
		// customize default values of carousels used by this component tree
		config.interval = 3500;
		config.wrap = true;
		config.keyboard = false;

		config.showNavigationArrows = true;
		config.showNavigationIndicators = true;
  }
  slides: Slide[];
  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.slides = data['slides'];
      this.slides.forEach(element => {
          element.image = 'data:image/jpg;base64,' + element.image;
      });
    });

  }
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

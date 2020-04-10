import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { environment } from '../../../environments/environment';
import { Slide } from '../../@models/Slide';
import { SlideService } from '../../@services/slide.service';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {

  constructor(private slideService: SlideService) { }
  slides: Slide[];
  ngOnInit(): void {
    this.slideService.getSlides().subscribe((_slides: Slide[]) => {
      this.slides = _slides;
    })
    this.initializeUploader();
  }
  saveState: string = "0";
  successMessage: string = environment.successful;
  errorMessage: string = environment.error;
  uploader: FileUploader;
  hasBaseDropZoneOver = false;
  baseUrl = environment.apiUrl;

  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }
  photo: any;
  initializeUploader() {
    this.uploader = new FileUploader({
      url: this.baseUrl + 'slide/photoUpload',
      authToken: 'Bearer ' + localStorage.getItem('token'),
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024,

    });

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        const res: Slide[] = JSON.parse(response);
        //this.photo = '../../../../../FarshBoom/wwwroot/img' + res.imageUrl;
        //this.photo = res.image;
        this.slides = res;
        console.log(this.slides);
        //this.photo = '../../../assets/images/background/weatherbg.jpg';
      }
    };

  }
  onDelete(id: number) {
    this.slideService.deleteSlide(id).subscribe(() => {
      this.saveState = '1';
      this.slideService.getSlides().subscribe((_slides: Slide[]) => {
        this.slides = _slides;
      })
    }, error => {
      this.saveState = error.error;
    }, () => {
    });
  }

}

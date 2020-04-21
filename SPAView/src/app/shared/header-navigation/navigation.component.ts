import { Component, AfterViewInit, EventEmitter, Output } from '@angular/core';
import {
  NgbModal,
  ModalDismissReasons,
  NgbPanelChangeEvent,
  NgbCarouselConfig
} from '@ng-bootstrap/ng-bootstrap';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { Router } from '@angular/router';
import { AuthService } from '../../@services/auth.service';

declare var $: any;
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styles: [`
    a.handTool{
      cursor: pointer;
  }
  `]
})
export class NavigationComponent implements AfterViewInit {
  @Output() toggleSidebar = new EventEmitter<void>();

  public config: PerfectScrollbarConfigInterface = {};
  constructor(private modalService: NgbModal, public authService: AuthService,
    private router: Router) {}

  public showSearch = false;
  model: any = {};

  ngAfterViewInit() {

  }

  onProfile() {

  }

  onLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.authService.decodedToken = null;
    this.authService.currentUser = null;

    this.router.navigate(['/home']);
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    return !!token;
  }

  login() {
    this.authService.login(this.model).subscribe(next => {

    }, error => {

    }, () => {
      this.router.navigate(['/members']);
    });
    //this.authService.login2(this.model);
  }
  onRegister() {
    this.router.navigate(['/dashboard/register']);
  }
}

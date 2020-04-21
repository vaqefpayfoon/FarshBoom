import { Component, AfterViewInit, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ROUTES } from './menu-items';
import { RouteInfo } from './sidebar.metadata';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../@services/auth.service';
declare var $: any;
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  showMenu = '';
  showSubMenu = '';
  public sidebarnavItems: any[];
  // this is for the open close
  addExpandClass(element: any) {
    if (element === this.showMenu) {
      this.showMenu = '0';
    } else {
      this.showMenu = element;
    }
  }

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}
  // End open close
  ngOnInit() {
    if(this.authService.decodedToken == undefined) {
      this.sidebarnavItems = ROUTES.filter(x => x.roleTypes == null);
    } else {
      let rolType: string = this.authService.decodedToken.role;
      if(rolType) {
        this.sidebarnavItems = ROUTES.filter(x => x.roleTypes != null ? x.roleTypes.includes(rolType) : false ||
        x.roleTypes == null);
      } if(rolType == undefined || rolType == null) {
        this.sidebarnavItems = ROUTES.filter(x => x.roleTypes == null);
      }
    }
  }
}

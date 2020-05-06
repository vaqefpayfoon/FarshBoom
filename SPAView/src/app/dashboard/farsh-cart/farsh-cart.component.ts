import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { GoodService } from '../../@services/good.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Good } from '../../@models/Good';

@Component({
  selector: 'app-farsh-cart',
  templateUrl: './farsh-cart.component.html',
  styleUrls: ['./farsh-cart.component.css']
})
export class FarshCartComponent implements OnInit {

  registerForm: FormGroup;
  successMessage: string = environment.successful;
  errorMessage: string = environment.error;
  _id: any;
  good: Good;

  constructor(private goodService: GoodService, private router: Router,
     private fb: FormBuilder, private route: ActivatedRoute) { }
     saveState: string = "0";

  ngOnInit(): void {
    this.route.params.subscribe(
      (param: Params) => {
        this._id = param['id'];
        if(this._id != -1) {
          this.route.data.subscribe(data => {
            this.good = data['good'];
          });
        } else {
          if(this._id == -1) {
            this.route.data.subscribe(data => {
              this.good = data['good'];
            });
          }
        }
      }, error => {console.log(error)}, () => {

      }
    )
  }

}

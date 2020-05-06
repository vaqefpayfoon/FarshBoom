import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Routes, RouterModule } from '@angular/router';
import { ChartsModule } from 'ng2-charts';
import { DashboardComponent } from './dashboard.component';
import { BrandsResolver } from '../@resolvers/brands.resolver';
import { ProjectsResolver } from '../@resolvers/projects.resolver';
import { PaginationModule } from 'ngx-bootstrap';
import { SlidesResolver } from '../@resolvers/sliders.resolver';
import { ContentComponent } from './content/content.component';
import { RegisterComponent } from './register/register.component';
import { FarshboonBankComponent } from './farshboon-bank/farshboon-bank.component';
import { ErrorComponent } from './error/error.component';
import { KeyValuesResolver } from '../@resolvers/keyvalues.resolver';
import { FarshCartComponent } from './farsh-cart/farsh-cart.component';


const routes: Routes = [
    {
      path: 'register',
      component: RegisterComponent,
      data: {
        title: '',
        urls: [
          { title: 'Dashboard', url: '/register' },
          { title: 'ngComponent' },
          { title: 'Button' }
        ]
      }
    },
    {
      path: 'farshboombank',
      component: FarshboonBankComponent,
      data: {
        title: '',
        urls: [
          { title: 'Dashboard', url: '/register' },
          { title: 'ngComponent' },
          { title: 'Button' }
        ]
      }
    },
    {
		  path: 'content/:id',
        component: ContentComponent,
        data: {
					title: '',
					urls: [
						{ title: 'Dashboard', url: '/content' },
						{ title: 'ngComponent' },
						{ title: 'Button' }
					]
				}
      },
      {
        path: 'error',
        component: ErrorComponent,
        data: {
          title: 'عملیات ناموفق',
          urls: [
            { title: 'Dashboard', url: '/register' },
            { title: 'ngComponent' },
            { title: 'Button' }
          ]
        }
      },
      {
          path: 'dashboard',
          resolve: {brands: BrandsResolver, projects: ProjectsResolver, slides: SlidesResolver},
          data: {
              title: '',
              urls: [
                  { title: 'Dashboard', url: '/dashboard' },
                  { title: 'Dashboard' }
              ]
          },
          component: DashboardComponent
      },
    {
        path: '', redirectTo: 'pages', pathMatch: 'full',
        resolve: {brands: BrandsResolver, projects: ProjectsResolver, slides: SlidesResolver},
        data: {
            title: '',
            urls: [
                { title: 'Dashboard', url: '/dashboard' },
                { title: 'Dashboard' }
            ]
        },
        component: DashboardComponent
    }
    ,
    {
        path: '**',
        resolve: {brands: BrandsResolver, projects: ProjectsResolver, slides: SlidesResolver, keyvalues: KeyValuesResolver},
        data: {
            title: '',
            urls: [
                { title: 'Dashboard', url: '/dashboard' },
                { title: 'Dashboard' }
            ]
        },
        component: DashboardComponent
    }
];

@NgModule({
    imports: [FormsModule, CommonModule, RouterModule.forChild(routes), ChartsModule,
       PaginationModule.forRoot(),
       NgbModule,ReactiveFormsModule
    ],
    declarations: [DashboardComponent, ContentComponent, RegisterComponent, FarshboonBankComponent, ErrorComponent, FarshCartComponent],
    providers:[BrandsResolver, ProjectsResolver, SlidesResolver, KeyValuesResolver]
})
export class DashboardModule { }

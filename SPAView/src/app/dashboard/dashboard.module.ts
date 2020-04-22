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


const routes: Routes = [
    {
      path: 'register',
      component: RegisterComponent,
      data: {
        title: 'ثبت نام کاربر جدید',
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
        title: 'جست جوی فرش',
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
        path: '',
        resolve: {brands: BrandsResolver, projects: ProjectsResolver, slides: SlidesResolver},
        data: {
            title: 'صفحه اصلی',
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
    declarations: [DashboardComponent, ContentComponent, RegisterComponent, FarshboonBankComponent],
    providers:[BrandsResolver, ProjectsResolver, SlidesResolver]
})
export class DashboardModule { }

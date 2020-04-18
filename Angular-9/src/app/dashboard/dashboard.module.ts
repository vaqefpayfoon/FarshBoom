import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ChartsModule } from 'ng2-charts';
import { DashboardComponent } from './dashboard.component';
import { BrandsResolver } from '../@resolvers/brands.resolver';
import { ProjectsResolver } from '../@resolvers/projects.resolver';
import { PaginationModule } from 'ngx-bootstrap';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SlidesResolver } from '../@resolvers/sliders.resolver';

const routes: Routes = [
    {
        path: '',
        resolve: {brands: BrandsResolver, projects: ProjectsResolver, slides: SlidesResolver},
        data: {
            title: 'Dashboard',
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
       NgbModule,
    ],
    declarations: [DashboardComponent],
    providers:[BrandsResolver, ProjectsResolver, SlidesResolver]
})
export class DashboardModule { }

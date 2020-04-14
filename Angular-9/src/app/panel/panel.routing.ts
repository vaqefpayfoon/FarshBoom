import { Routes } from '@angular/router';
import { RegisterComponent } from '../component/register/register.component';
import { UserManagmentComponent } from './user-managment/user-managment.component';
import { UsersResolver } from '../@resolvers/users.resolver';
import { UserComponent } from './user/user.component';
import { UserResolver } from '../@resolvers/user.resolver';
import { CarpetMangmentComponent } from './carpet-mangment/carpet-mangment.component';
import { CarpetComponent } from './carpet/carpet.component';
import { SliderManagmentComponent } from './slider-managment/slider-managment.component';
import { SliderComponent } from './slider/slider.component';
import { GoodResolver } from '../@resolvers/good.resolver';
import { GoodsResolver } from '../@resolvers/goods.resolver';
import { PageContentManagmentComponent } from './page-content-managment/page-content-managment.component';
import { PageContentComponent } from './page-content/page-content.component';
import { SlidesResolver } from '../@resolvers/sliders.resolver';
import { PagesResolver } from '../@resolvers/pages.resolver';
import { PageContentsResolver } from '../@resolvers/pageContents.resolver';

export const PanelRoutes: Routes = [
	{
		path: '',
		children: [
      {
				path: 'register',
        component: RegisterComponent,
        data: {
					title: 'ثبت نام کاربر جدید',
					urls: [
						{ title: 'Panel', url: '/panel' },
						{ title: 'ngComponent' },
						{ title: 'Button' }
					]
				}
			},
      {
				path: 'user',
        component: UserManagmentComponent,
        resolve: {users: UsersResolver},
        data: {
					title: 'لیست کاربران',
					urls: [
						{ title: 'Panel', url: '/panel' },
						{ title: 'ngComponent' },
						{ title: 'Button' }
					]
				}
			},
      {
		path: 'user/:id',
        component: UserComponent,
        resolve: {user: UserResolver},
        data: {
					title: 'مدیریت کاربر',
					urls: [
						{ title: 'Panel', url: '/panel' },
						{ title: 'ngComponent' },
						{ title: 'Button' }
					]
				}
			},
      {
				path: 'carpet',
        component: CarpetMangmentComponent,
        resolve: {goods: GoodsResolver},
        data: {
					title: 'لیست فرش ها',
					urls: [
						{ title: 'Panel', url: '/panel' },
						{ title: 'ngComponent' },
						{ title: 'Button' }
					]
				}
			},
      {
		path: 'carpet/:id',
        component: CarpetComponent,
        resolve: {good: GoodResolver},
        data: {
					title: 'مدیریت فرش',
					urls: [
						{ title: 'Panel', url: '/panel' },
						{ title: 'ngComponent' },
						{ title: 'Button' }
					]
				}
		},
      {
		path: 'list',
        component: SliderManagmentComponent,
        resolve: {goods: GoodsResolver},
        data: {
					title: 'لیست فرش ها',
					urls: [
						{ title: 'Panel', url: '/panel' },
						{ title: 'ngComponent' },
						{ title: 'Button' }
					]
				}
      },
      {
		path: 'slide',
        component: SliderComponent,
        resolve: {slides: SlidesResolver},
        data: {
					title: 'بارگذاری عکس ها',
					urls: [
						{ title: 'Panel', url: '/panel' },
						{ title: 'ngComponent' },
						{ title: 'Button' }
					]
				}
      },
      {
		path: 'content',
        component: PageContentManagmentComponent,
        resolve: {pages: PagesResolver, pageContents: PageContentsResolver},
        data: {
					title: 'محتوای صفحات',
					urls: [
						{ title: 'Panel', url: '/panel' },
						{ title: 'ngComponent' },
						{ title: 'Button' }
					]
				}
			},
      {
		path: 'content/:id',
        component: PageContentComponent,
        resolve: {content: UserResolver},
        data: {
					title: 'مدیریت صفحات',
					urls: [
						{ title: 'Panel', url: '/panel' },
						{ title: 'ngComponent' },
						{ title: 'Button' }
					]
				}
			}
		]
	}
];

import {Injectable} from '@angular/core';
import {Resolve, Router, ActivatedRouteSnapshot} from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PageService } from '../@services/page.service';
import { PageContent } from '../@models/page';


@Injectable()
export class PageContentResolver implements Resolve<PageContent> {

    constructor(private pageService: PageService, private router: Router) {}

    resolve(route: ActivatedRouteSnapshot): Observable<PageContent> | Promise<PageContent> | PageContent {
        return this.pageService.getPageContent(route.params['id'], 'id')
        .pipe(catchError(error => {
                this.router.navigate(['/component/error']);
                return of(null);
            })
        );
    }
}

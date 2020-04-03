import {Injectable} from '@angular/core';
import {Resolve, Router, ActivatedRouteSnapshot} from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserService } from '../@services/user.service';
import { User } from '../@models/user';


@Injectable()
export class UserResolver implements Resolve<User> {


    constructor(private userService: UserService, private router: Router) {}

    resolve(route: ActivatedRouteSnapshot): Observable<User> | Promise<User> | User {
        return this.userService.getUser(route.params['id'], 'id')
        .pipe(catchError(error => {
                this.router.navigate(['/component/error']);
                return of(null);
            })
        );
    }
}

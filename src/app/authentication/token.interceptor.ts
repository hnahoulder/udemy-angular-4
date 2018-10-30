import {Injectable} from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpInterceptor,
    HttpErrorResponse
} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {AuthService} from '../services/auth.service';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(private _authService: AuthService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        // Get the auth token from the service.
        const authToken = this._authService.getToken();
        // Clone the request and replace the original headers with
        // cloned headers, updated with the authorization.

        if (req.url.indexOf('auth') !== -1) {
            return next.handle(req);
        } else {

            const authReq = req.clone({
                headers: req.headers.set('Authorization', 'Bearer ' + authToken)
            });
            // send cloned request with header to the next handler.
            return next.handle(authReq).catch(error => {
                if (error instanceof HttpErrorResponse) {
                    switch ((<HttpErrorResponse>error).status) {
                        case 400:
                        // return this.handle400Error(error);
                        case 401:
                            console.log('deconnecté !');
                            this._authService.logOut();
                    }
                } else {
                    return Observable.throw(error);
                }
            });
        }
    }
}

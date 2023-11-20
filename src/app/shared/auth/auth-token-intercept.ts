
// import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
// import { Injectable, inject } from "@angular/core";
// import { Observable, throwError } from "rxjs";
// import { catchError, switchMap } from "rxjs/operators";
// import { TokenModel } from "../../app/interfaces/token-model";
// import { JwtHelperService } from '@auth0/angular-jwt'
// import { userService } from "../../services/user.service";
// import { Router } from '@angular/router'

// @Injectable()
// export class AuthTokenIntercept implements HttpInterceptor {
//     constructor(private jwtHelper: JwtHelperService, private router: Router, private _userService: userService) { }
//     // _userService = inject(userService);
//     intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//         if (req.url.indexOf("login") > -1) {
//             return next.handle(req);
//         }

//         const localStorageToken = localStorage.getItem("tokens");
//         if (localStorageToken) {
//             const token: TokenModel = JSON.parse(localStorageToken) as TokenModel;
//             const isTokenExpired = this.jwtHelper.isTokenExpired(token.access);

//             if (!isTokenExpired) {
//                 return next.handle(req);
//             } else {
//                 return this._userService.refreshService(token)
//                     .pipe(
//                         switchMap((newTokens: TokenModel) => {
//                             localStorage.setItem("tokens", JSON.stringify(newTokens));
//                             const userInfo = this.jwtHelper.decodeToken(newTokens.access);
//                             this._userService.userProfile.next(userInfo);
//                             const transformedReq = req.clone({
//                                 setHeaders: {
//                                     'Authorization': `Bearer ${newTokens.access}`
//                                 }
//                             });

//                             return next.handle(transformedReq);
//                         }),
//                         catchError((error) => {
//                             localStorage.removeItem("tokens");
//                             this._userService.userProfile.next(null);
//                             this.router.navigate(['']);
//                             return throwError('Invalid call');
//                         })
//                     )
//             }
//         }
//         return throwError('Invalid Call');
//     }
// }

import { HttpInterceptorFn } from "@angular/common/http";
import { tap } from "rxjs";

export const AuthTokenIntercept: HttpInterceptorFn = (req, next) => {
    console.log('request', req.method, req.url);
    console.log('authInterceptor')

    if (req.url.startsWith('http://libraryapi.infometrika.net/api/')) {
        const headers = req.headers.set('Authorization', 'Bearer' + localStorage.getItem('refresh'));

        req = req.clone({
            headers
        });
    }

    return next(req).pipe(
        tap(resp => console.log('response', resp))
    );

}
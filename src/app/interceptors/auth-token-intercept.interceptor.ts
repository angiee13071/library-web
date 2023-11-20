import { HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { userService } from '../services/user.service';
@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {
  _user = inject(userService);
  constructor(private jwtHelper: JwtHelperService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('tokens');

    if (token && !this.jwtHelper.isTokenExpired(token)) {
      const authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      return next.handle(authReq);
    } else {
      const tokens = JSON.parse(token ? token : "");

      const refreshValue = tokens.refresh;
      return this._user.refreshService(refreshValue).pipe(
        switchMap((newToken: any) => {
          const authReq = req.clone({
            setHeaders: {
              Authorization: `Bearer ${newToken}`
            }
          });
          return next.handle(authReq);
        }),
        catchError(error => {
          // Handle error refreshing token
          return throwError(error);
        })
      );
    }
  }

}


export const authTokenInterceptInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req);
};


// import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
// import { Injectable } from "@angular/core";
// import { Observable, throwError } from "rxjs";
// import { catchError, switchMap } from "rxjs/operators";
// import { TokenModel } from "../interfaces/token-model";
// import { JwtHelperService } from '@auth0/angular-jwt';
// import { userService } from "../services/user.service";
// import { Router } from '@angular/router';

// @Injectable()
// export class AuthTokenIntercept implements HttpInterceptor {
//   constructor(
//     private jwtHelper: JwtHelperService,
//     private userService: userService,
//     private router: Router
//   ) { }

//   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     if (req.url.includes("login")) {
//       return next.handle(req);
//     }

//     const localStorageToken = localStorage.getItem("tokens");
//     if (localStorageToken) {
//       const token: TokenModel = JSON.parse(localStorageToken) as TokenModel;
//       const isTokenExpired = this.jwtHelper.isTokenExpired(token.access);

//       if (!isTokenExpired) {
//         return next.handle(req);
//       } else {
//         return this.userService.refreshService(token)
//           .pipe(
//             switchMap((newTokens: TokenModel) => {
//               localStorage.setItem("tokens", JSON.stringify(newTokens));
//               const userInfo = this.jwtHelper.decodeToken(newTokens.access);
//               this.userService.userProfile.next(userInfo);
//               const transformedReq = req.clone({
//                 setHeaders: {
//                   'Authorization': `Bearer ${newTokens.access}`
//                 }
//               });

//               return next.handle(transformedReq);
//             }),
//             catchError((error) => {
//               localStorage.removeItem("tokens");
//               this.userService.userProfile.next(null);
//               this.router.navigate(['']);
//               return throwError('Invalid call');
//             })
//           );
//       }
//     }
//     return throwError('Invalid Call');
//   }
// }


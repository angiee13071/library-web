import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { TokenModel } from '../interfaces/token-model';
import { BehaviorSubject, catchError, map, of } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserProfile } from '../interfaces/user-profile';
import { Token } from '@angular/compiler';
import { Router } from '@angular/router';
// import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class userService {
  private api = 'http://libraryapi.infometrika.net/api/user/';
  constructor(private _http: HttpClient, private router: Router) { }
  jwtHelper = new JwtHelperService;
  userProfile = new BehaviorSubject<UserProfile | null>(null);
  public loginService(username: string, password: string) {
    const body = JSON.stringify({
      username: username,
      password: password
    });

    const headers = new HttpHeaders({
      // 'Authorization': 'Basic ' + data,
      'accept': 'application/json',
      'Content-Type': 'application/json',
      'X-CSRFTOKEN': 'OW1gke0YSWtqPRZzojErGOYPV3bJoOdkbPzVLnVkckdCYbUqh6t2FT8Tmy3tOGsI'
    });
    return this._http.post(`${this.api}login/`, body, { headers }).pipe(
      map(
        (data: any) => {
          var tokens = data as TokenModel;
          localStorage.setItem("tokens", JSON.stringify(tokens));

          var userData = this.jwtHelper.decodeToken(tokens.access) as UserProfile;
          console.log(this.jwtHelper.decodeToken(tokens.access));
          this.userProfile.next(userData);
          return true;
        }
      ), catchError(
        (error) => {
          console.log("error login");
          return of(false);
        }
      )
    );
  }

  public verifyService(token: String) {
    const body = JSON.stringify({
      token: token
    });

    const headers = new HttpHeaders({
      'accept': '*/*',
      'Content-Type': 'application/json',
      'X-CSRFTOKEN': 'ShZ9q2oDcdM46v3ve654mUJkI4RfYLLVfaxORbjZwBwgfPYm7TUFlZTo9zJZoD0j'
    });
    return this._http.post(`${this.api}verify/`, body, { headers });
  }
  public getAccessToken() {
    var localStorageToken = localStorage.getItem("tokens");
    if (localStorageToken) {
      var token = JSON.parse(localStorageToken) as TokenModel;
      var isTokenExpired = this.jwtHelper.isTokenExpired(token.access);
      if (isTokenExpired) {
        this.userProfile.next(null);
        return "";
      }
      var userInfo = this.jwtHelper.decodeToken(token.access) as UserProfile;
      this.userProfile.next(userInfo);
      return token.access;
    }
    return "";
  }
  public refreshService(refresh: any) {
    const body = JSON.stringify({
      refresh: refresh
    });

    const headers = new HttpHeaders({
      'accept': 'application/json',
      'Content-Type': 'application/json',
      'X-CSRFTOKEN': 'ShZ9q2oDcdM46v3ve654mUJkI4RfYLLVfaxORbjZwBwgfPYm7TUFlZTo9zJZoD0j'
    });
    return this._http.post(`${this.api}login/refresh/`, body);
  }

}

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withFetch, withInterceptors, withInterceptorsFromDi, withJsonpSupport } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
// import { AuthTokenIntercept } from './app/shared/auth/auth-token-intercept';
import { authTokenInterceptInterceptor } from './app/interceptors/auth-token-intercept.interceptor';
import { routes } from './app/app.routes';
import { JwtModule } from '@auth0/angular-jwt';
import { userService } from './app/services/user.service';
export function jwtOptionsFactory(userService: userService) {
  return {
    tokenGetter: () => {
      return userService.getAccessToken();
    }
  }
}
export function tokenGetter() {
  return localStorage.getItem("access");
}
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

bootstrapApplication(AppComponent, {
  providers: [
    // provideHttpClient(withFetch()),
    provideHttpClient(withInterceptors([authTokenInterceptInterceptor])),
    importProvidersFrom(
      JwtModule.forRoot({
        config: {
          tokenGetter: tokenGetter,
          allowedDomains: ['http://localhost:4200/'],
          disallowedRoutes: ["http://localhost:4200/login"],
        },
      }),
    ),
    provideHttpClient(withInterceptorsFromDi()),
    provideRouter(routes),

  ],
});



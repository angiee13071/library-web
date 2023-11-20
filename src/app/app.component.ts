import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { userService } from './services/user.service';
import { AuthorService } from './services/author.service';
import { Subject } from 'rxjs';
import { BookService } from './services/book.service';
import { PublisherService } from './services/publisher.service';
import { CountryService } from './services/country.service';
import { HomeComponent } from './components/home/home.component';
import { AuthTokenIntercept } from './shared/auth/auth-token-intercept';
import { UserProfile } from './interfaces/user-profile';
import { ManageComponent } from './components/manage/manage.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoginComponent, HeaderComponent, FooterComponent, HomeComponent, ManageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [userService, BookService, PublisherService, CountryService, AuthorService],
  // AuthTokenIntercept 

})

export class AppComponent implements OnInit {
  private $skip = new Subject<void>();
  currentView: string = '';
  title = 'library-app';
  userProfile: UserProfile | null | undefined;
  footer: boolean = true;
  constructor(private _router: Router, private _user: userService) {

  }
  ngOnInit(): void {
    this._user.userProfile.subscribe((data) => {
      this.userProfile = data;
    })
    const localStorageToken = localStorage.getItem("tokens");
    if (localStorageToken) {
      this.footer = false;
    }
  }

}

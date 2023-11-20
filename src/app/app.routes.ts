import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ManageComponent } from './components/manage/manage.component';

export const routes: Routes = [
    // { path: '', component: AppComponent, title: '', pathMatch: 'full' },
    { path: '', component: HomeComponent, title: 'Blog' },
    { path: 'login', component: LoginComponent, title: 'Login' },
    { path: 'manage', component: ManageComponent, title: 'Manage' },
    { path: '**', component: AppComponent, redirectTo: '' }

];

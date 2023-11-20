import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { userService } from '../../services/user.service';
import { HttpClientModule } from '@angular/common/http';
import { loginResult } from '../../interfaces/interfaces';
import { Router } from '@angular/router';
import { HeaderComponent } from '../header/header.component';



@Component({
  selector: 'login-component',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',


})
export class LoginComponent {
  _userService = inject(userService);
  username: string = '';
  password: string = '';
  text_error: string = '';
  error: boolean = false;
  results: loginResult | undefined;
  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });
  constructor(private router: Router) {

  }
  onSubmit() {
    this.error = false;
    this.username = this.loginForm.value.username ? this.loginForm.value.username : '';
    this.password = this.loginForm.value.password ? this.loginForm.value.password : '';
    console.log(this.username, this.password);
    this._userService.loginService(this.username, this.password).subscribe((data) => {
      if (data) {
        console.log("data login", data);

        this.router.navigate(["/manage"])
        alert("success");
      }
      else {
        // alert("failed");
        this.error = true;
        this.text_error = "error";
      }

    }, (error: any) => {
      this.error = true;
      this.text_error = error.error.detail;
      console.log(error);

    });

    // this._userService.loginService(this.username, this.password).subscribe((dataResponse: any) => {
    //   console.log('Respuesta del servicio login:', dataResponse);
    //   this.results = dataResponse;
    //   localStorage.setItem('refresh', dataResponse.refresh);
    //   localStorage.setItem('access', dataResponse.access);
    //   const accessExpiration = new Date(Date.now() + 10 * 60 * 1000); // 10 minutos
    //   const refreshExpiration = new Date(Date.now() + 8 * 24 * 60 * 60 * 1000); // 8 días
    //   this._userService.refreshService(dataResponse.refresh).subscribe((refreshResponse: any) => {
    //     console.log("Nuevo token:", refreshResponse);
    //     localStorage.setItem('access', refreshResponse.access);
    //     this._userService.verifyService(dataResponse.access).subscribe((tokenResponse: any) => {
    //       console.log("Token verificado:", tokenResponse);

    //     }, (error: any) => {
    //       console.log("error token", error);

    //     });
    //   }, (error: any) => {
    //     console.log("error refresh", error);

    //   });

    // }, (error: any) => {
    //   this.error = true;
    //   this.text_error = error.error.detail;
    //   console.log(error);

    // });

  }
}



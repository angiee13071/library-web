import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'header-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  out: boolean = false;
  textButton: string = 'Log in';
  constructor(public router: Router) { }
  logo: string = "https://images.vexels.com/media/users/3/153537/isolated/preview/691d43624a3f2cbe1268e7e20a030fe8-icono-de-pila-de-libro.png";
  public sesion() {
    if (this.out == false) {
      this.goLogin();
      this.textButton = "Log in";
    } else
      this.SignOff();
    this.textButton = "Go out";
  }
  public goLogin() {
    this.router.navigate(['login']);
    this.out = true;
  }
  public SignOff() {
    this.router.navigate(['']);
    this.out = false;
    localStorage.removeItem("tokens");
  }
}

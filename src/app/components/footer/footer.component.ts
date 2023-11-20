import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'footer-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  iconsNetwork: string = "https://static.vecteezy.com/system/resources/previews/003/763/789/non_2x/social-media-facebook-instagram-logos-social-media-icons-black-and-white-set-free-vector.jpg";
}

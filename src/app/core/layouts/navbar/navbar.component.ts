import {Component, inject} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {AuthService} from '../../auth/_services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {


  //injections
  authService = inject(AuthService);
  router = inject(Router);

  protected logOut() {
    this.authService.logOut();
    this.router.navigate(['/login']);
  }
}

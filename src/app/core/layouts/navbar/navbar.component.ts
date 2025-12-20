import {Component, inject, OnInit} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {AuthService} from '../../auth/_services/auth.service';
import {ToastrService} from 'ngx-toastr';

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
  protected authService = inject(AuthService);
  private router = inject(Router);
  toastr = inject(ToastrService);



  protected logOut() {
    this.authService.logOut();
    this.router.navigate(['/login']);
  }
}

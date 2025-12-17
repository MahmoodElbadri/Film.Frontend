import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../_services/auth.service';
import {Router, RouterLink} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  //injections
  loginForm!: FormGroup;
  fb = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);
  toastr = inject(ToastrService);

  //variables

  ngOnInit(): void {
    this.initializeLoginForm();
  }

  initializeLoginForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required, Validators.minLength(1)]]
    })
  }


  login(model: any) {
    console.log(this.loginForm.value);
    this.authService.login(model).subscribe({
      next: (response) => {
        this.toastr.success('Login successful');
        console.log(response);
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.toastr.error(`Login failed ${err}`);
        console.log("error logging in ", err);
      }
    })
  }


}

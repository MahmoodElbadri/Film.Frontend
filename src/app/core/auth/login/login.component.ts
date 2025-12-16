import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../_services/auth.service';
import {Router, RouterLink} from '@angular/router';

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

  //variables


  initializeLoginForm(){
    this.loginForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required, Validators.minLength(1)]]
    })
  }

  ngOnInit(): void {
    this.initializeLoginForm();
  }

  login(model: any){
    console.log(this.loginForm.value);
    this.authService.login(model).subscribe({
      next: (response) => {
        console.log(response);
        this.router.navigate(['']);
      },
      error: (err) => {
        console.log("error logging in ", err);
      }
    })
  }


}

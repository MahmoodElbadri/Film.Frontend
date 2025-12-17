import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../_services/auth.service';
import {Router, RouterLink} from '@angular/router';
import {Register} from '../../../features/auth/models/register';
import {PasswordMatchValidator} from '../validators/password-match.validator';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {

  //injections
  fb = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);

  //variables
  registerForm!: FormGroup;
  registerModel: Register = {
    fullName: '',
    email: '',
    password: ''
  };

  initializeForm(){
    this.registerForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      email: ['', [Validators.email, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'), Validators.required]],
      password: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(16)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(16)]]
    },
      {
        validators: PasswordMatchValidator
      }
      )
  }



  ngOnInit(): void {
    this.initializeForm();
  }

  onSubmit(model: Register){
    this.authService.register(model).subscribe({
      next:()=>{
        this.router.navigate(['/login'])
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }

}

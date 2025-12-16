import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs';
import { environment } from '../../../environments/environment.development';
import {Login} from '../../features/auth/models/login';
import {Register} from '../../features/auth/models/register';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = environment.apiUrl;
  http = inject(HttpClient);
  token = signal<string | null>(localStorage.getItem('token'));

  register(model: Register) {
    return this.http.post<any>(`${this.baseUrl}Auth/register`, model);
  }

  login(model: Login){
    return this.http.post<any>(`${this.baseUrl}Auth/login`, model).pipe(
      map((response)=>{
        const token = response.token.result;
        if(token){
          localStorage.setItem('token', token);
          this.token.set(token);
        }
        return response;
      })
    )
  }

  logOut(){
    this.token.set(null);
    localStorage.removeItem('token');
  }

}

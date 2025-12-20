import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, switchMap} from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import {Login} from '../models/login';
import {Register} from '../models/register';
import {UserDto} from '../models/user-dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Injections
  baseUrl = environment.apiUrl;
  http = inject(HttpClient);
  token = signal<string | null>(localStorage.getItem('token'));

  //variables
  userDto = signal<UserDto | null>(
    JSON.parse(localStorage.getItem('user') || 'null')
  );


  register(model: Register) {
    return this.http.post<any>(`${this.baseUrl}Auth/register`, model);
  }

  login(model: Login) {
    return this.http.post<any>(`${this.baseUrl}Auth/login`, model).pipe(
      switchMap((response) => {
        const token = response.token.result;

        if (token) {
          localStorage.setItem('token', token);
          this.token.set(token);
        }

        // now fetch the user profile
        return this.http.get<UserDto>(`${this.baseUrl}Auth`).pipe(
          map((user) => {
            this.userDto.set(user);
            localStorage.setItem('user', JSON.stringify(user));
            return user; // return the userDto as the final observable result
          })
        );
      })
    );
  }


  getUser(){

  }

  logOut(){
    this.token.set(null);
    localStorage.removeItem('token');
  }

}

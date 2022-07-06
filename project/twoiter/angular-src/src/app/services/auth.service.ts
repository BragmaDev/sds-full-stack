import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable( {providedIn: 'root'} )
export class AuthService {

  authToken: any;
  user: any;

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) { }

  registerUser(user: any) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:8080/users/register', user, {headers})
      .pipe(map((res: any) => res));
  }

  authenticateUser(user: any) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:8080/users/authenticate', user, {headers})
      .pipe(map((res: any) => res));
  }

  getProfile() {
    let headers = new HttpHeaders();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:8080/users/profile', {headers})
      .pipe(map((res: any) => res));
  }

  storeUserData(token: any, user: any) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  loggedIn() {
    return this.tokenNotExpired();
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  // Source: https://github.com/auth0/angular2-jwt/issues/435#issuecomment-334377087
  tokenNotExpired() {
    const token: string = this.authToken;
    return token != null && !this.jwtHelper.isTokenExpired(token);
  }
}

import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {RequestOptions} from '@angular/http';
import * as jwtDecode from 'jwt-decode';

@Injectable()
export class AuthService {

    BASE_URL = 'http://localhost:4201/auth';

    constructor(private http: HttpClient) {
    }

    login(credentials) {
        return this.http.post(`${this.BASE_URL}/login`, credentials);
    }

    userIsLoggedIn() {
        return !!localStorage.getItem('jbb-data');
    }

    logOut() {
        localStorage.removeItem('jbb-data');
    }

    register(credentials) {
        return this.http.post(`${this.BASE_URL}/register`, credentials);
    }


    decodeToken(token) {
        return jwtDecode(token);
    }
}

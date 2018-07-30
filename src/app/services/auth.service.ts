import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class AuthService {

    BASE_URL = 'http://localhost:4201/auth';

    constructor(private http: HttpClient) {
    }

    login(credentials) {
        return this.http.post(`${this.BASE_URL}/login`, credentials);
    }

}

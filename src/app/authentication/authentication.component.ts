import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';

@Component({
    selector: 'app-authentication',
    templateUrl: './authentication.component.html',
    styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {
    jbbData = null;
    isAuthenticated = false;
    welcomeMessage = '';

    constructor(private authService: AuthService) {
    }

    ngOnInit() {
        if (localStorage.getItem('jbb-data')) {
            this.refreshFlags();
        }
    }

    refreshFlags() {

        this.isAuthenticated = true;
        this.welcomeMessage = 'Bienvenue';
    }

    login(formData) {
        console.log(formData);
        this.authService.login(formData)
            .subscribe(data => this.handleLoginSuccess(data),
                error => this.handleLoginFailure(error));
    }

    handleLoginSuccess(data) {
        console.log('Success ', data);
        this.jbbData = data;
        this.refreshFlags();
        localStorage.setItem('jbb-data', JSON.stringify(data));
    }

    handleLoginFailure(error) {
        console.log('Failure ', error);
    }

}

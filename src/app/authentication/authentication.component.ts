import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';

@Component({
    selector: 'app-authentication',
    templateUrl: './authentication.component.html',
    styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {

    constructor(private authService: AuthService) {
    }

    ngOnInit() {
    }

    login(formData) {
        console.log(formData);
        this.authService.login(formData)
            .subscribe(data => this.handleLoginSuccess,
                error => this.handleLoginFailure);
    }

    handleLoginSuccess(data) {
        console.log('Success ', data);
    }

    handleLoginFailure(error) {
        console.log('Failure ', error);
    }

}

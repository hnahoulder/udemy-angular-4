import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
    decodedToken = null;
    isAdmin = false;

    constructor(private authService: AuthService) {
    }

    ngOnInit() {
        if (this.authService.userIsLoggedIn()) {
            const jjbToken = JSON.parse(localStorage.getItem('jbb-data'));
            this.decodedToken = this.authService.decodeToken(jjbToken.token);
            console.log(this.decodedToken);
            if (this.decodedToken && this.decodedToken.role === 'admin') {
                this.isAdmin = true;
            }
        }
    }

}

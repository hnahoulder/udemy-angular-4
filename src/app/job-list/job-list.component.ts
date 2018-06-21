import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Component({
    selector: 'app-job-list',
    templateUrl: './job-list.component.html',
    styleUrls: ['./job-list.component.css']
})
export class JobListComponent implements OnInit {
    jobs = [];

    constructor(private http: HttpClient) {
    }

    ngOnInit() {
        this.http.get('data/jobs.json')
            .subscribe((res) => {
                console.log(res);
                this.jobs=res;
            });
    }

}



import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {JobService} from '../services/job.service';

@Component({
    selector: 'app-job-details',
    templateUrl: './job-details.component.html',
    styleUrls: ['./job-details.component.css']
})
export class JobDetailsComponent implements OnInit {

    jobDetails = null;
    error = null;
    errorMessage = '';

    constructor(private jobService: JobService,
                private activatedRoute: ActivatedRoute) {
    }

    ngOnInit() {
        const id = this.activatedRoute.snapshot.params.id;
        this.jobService.getJob(id).subscribe(data => {
                this.handldeServerResponse(data);
            },
            error => this.handleError(error));
    }

    handldeServerResponse(response) {
        if (response.success) {
            this.jobDetails = response.job;
        } else {
            this.errorMessage = response.message;
        }

    }

    handleError(error) {
        console.log('HandleError', error.statusText);
        this.error = error;
    }
}

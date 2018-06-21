import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs/Rx';

@Injectable()
export class JobService {
    jobs: any = [];
    jobsSubject = new Subject();

    constructor(private http: HttpClient) {
    }

    getJobs() {
        return this.http.get('data/jobs.json');
    }

    addJob(jobData) {
        jobData.id = Date.now();
        return this.jobsSubject.next(jobData);

    }

}

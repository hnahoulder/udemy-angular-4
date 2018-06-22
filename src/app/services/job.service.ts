import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/do';
import {Subject} from 'Rxjs/Rx';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class JobService {
    initialJobs: any = [];
    jobs: any = [];
    jobsSubject = new Subject();

    constructor(private http: HttpClient) {
    }

    getJobs() {
        if (this.jobs.length > 0 && this.initialJobs.length > 0) {
            console.log('case if');
            return Observable.of([...this.jobs, ...this.initialJobs]);
        } else if (this.jobs.length > 0 && this.initialJobs.length === 0) {
            console.log('case else if');
            return this.http.get('data/jobs.json').do(data => {
                this.initialJobs = data;
                this.jobs = [...this.jobs, ...this.initialJobs];
            });
        } else {
            console.log('else');
            return this.http.get('data/jobs.json').do(data => this.initialJobs = data);
        }
    }

    addJob(jobData) {
        jobData.id = Date.now();
        this.jobs = [jobData, ...this.jobs];
        return this.jobsSubject.next(jobData);
    }

}

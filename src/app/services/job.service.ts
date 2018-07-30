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

    BASE_URL = 'http://localhost:4201/';

    constructor(private http: HttpClient) {
    }

    getJobs() {
        if (this.jobs.length > 0 && this.initialJobs.length > 0) {
            console.log('case if');
            return Observable.of([...this.jobs, ...this.initialJobs]);
        } else if (this.jobs.length > 0 && this.initialJobs.length === 0) {
            console.log('case else if');
            return this.http.get(this.BASE_URL + 'api/jobs').do(data => {
                // return this.http.get('data/jobs.json').do(data => {
                this.initialJobs = data;
                this.jobs = [...this.jobs, ...this.initialJobs];
            });
        } else {
            console.log('else');
            return this.http.get(this.BASE_URL + 'api/jobs').do(data => this.initialJobs = data);
            // return this.http.get('data/jobs.json').do(data => this.initialJobs = data);
        }
    }

    addJob(jobData) {
        jobData.id = Date.now();
        /*this.jobs = [jobData, ...this.jobs];
        return this.jobsSubject.next(jobData);*/
        return this.http.post(this.BASE_URL + 'api/jobs', jobData)
            .do(res => {
                console.log(res);
                this.jobsSubject.next(jobData);
            });
    }

    getJob(id) {
        return this.http.get(this.BASE_URL + `api/jobs/${id}`);
        // .map(res => res.json());
    }

    searchJob(criteria) {
        return this.http.get(this.BASE_URL + `api/search/${criteria.term}/${criteria.place}`);
    }

    login(formData) {
        return this.http.post(this.BASE_URL + `api/login`, formData);
    }


}

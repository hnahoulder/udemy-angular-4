import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {JobService} from '../services/job.service';

@Component({
    selector: 'app-job-add-form',
    templateUrl: './job-add-form.component.html',
    styleUrls: ['./job-add-form.component.css']
})
export class JobAddFormComponent implements OnInit {

    form: FormGroup;
    contractTypes = [
        {id: 1, name: 'Stage', value: 'internship'},
        {id: 2, name: 'Intérim', value: 'temp'},
        {id: 3, name: 'CDD', value: 'fixed-term'},
        {id: 4, name: 'CDI', value: 'parmanent'},
        {id: 4, name: 'Indépendant', value: 'freelance'}
    ];
    currencies = [
        {id: 1, name: 'Euros', value: 'EU', symbol: '€'},
        {id: 2, name: 'Livres sterling', value: 'POUNDS', symbol: '£'},
        {id: 3, name: 'Francs CFA', value: 'CFA', symbol: 'CFA'},
        {id: 4, name: 'Dollars canadien', value: 'CAD', symbol: '$'}
    ];
    statuses = [
        {id: 1, name: 'Cadre', value: 'executive'},
        {id: 1, name: 'Employé', value: 'employee'}
    ];

    experience = [
        {id: 1, name: 'Junior', value: 'junior'},
        {id: 2, name: 'Medior', value: 'medior'},
        {id: 3, name: 'Senior', value: 'senior'}
    ];

    areas = [
        {id: 1, name: 'Aucun déplacements', value: 'none'},
        {id: 2, name: 'Déplacements régionaux', value: 'region'},
        {id: 3, name: 'Déplacements nationaux', value: 'nation'},
        {id: 4, name: 'Déplacements internationaux', value: 'international'}
    ];

    constructor(private formBuilder: FormBuilder, private jobService: JobService) {
    }

    ngOnInit() {
        this.form = this.formBuilder.group({
            id: -1,
            title: '',
            company: '',
            city: '',
            zipcode: 35,
            description: '',
            contract: '',
            salary: null,
            currency: '',
            startdate: new Date(),
            experience: '',
            status: '',
            area: '',
            field: '',
            publishdate: new Date(),
            lastupdate: new Date()

        });
    }

    createJob(jobData) {
        this.jobService.addJob(jobData);
    }

}

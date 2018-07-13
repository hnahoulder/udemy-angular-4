const express = require('express');
const app = express();
const bodyParser = require('body-parser');
let data = require('./jobs');

let initialJobs = data.jobs;
let addedJobs = [];

const getAllJobs = () => {
    return [...addedJobs, ...initialJobs];
}


app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});


const api = express.Router();

api.get('/jobs', (req, res) => {
    // res.json(data.jobs);
    res.json(getAllJobs());
});

api.post('/jobs', (req, res) => {
    const job = req.body;
    addedJobs = [job, ...addedJobs];
    console.log('Total nb of jobs: ', getAllJobs().length)
    res.json(job);
});

api.get('/jobs/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const job = getAllJobs().filter(j => j.id === id);
    job.length === 1 ? res.json({success: true, job: job[0]}): res.json({success: false, message : `Pas de job ayant pour id ${id}`});
    // res.json(job);
});

app.use('/api', api);

const port = 4201;

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
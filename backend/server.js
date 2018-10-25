const express = require('express');
const app = express();
const bodyParser = require('body-parser');
let data = require('./jobs');

let initialJobs = data.jobs;
let addedJobs = [];

let users = [{id: 1, email: 'sm@test.fr', password: 'aze', nickname: 'Tutu'}];

// const fakeUser = {id: 1, email: 'sm@test.fr', password: 'aze', nickname: 'Tutu'};
const secret = 'qsdjS12ozehdoIJ123DJOZJLDSCqsdeffdg123ER56SDFZedhWXojqshduzaohduihqsDAqsdq';
const jwt = require('jsonwebtoken');

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
const auth = express.Router();

auth.post('/login', (req, res) => {
    if (req.body) {
        const email = req.body.email.toLocaleLowerCase();
        const password = req.body.password.toLocaleLowerCase();
        const index = users.findIndex(user => user.email === email)
        if (index > -1 && users[index].password === password) {
            // if (email === fakeUser.email && password === fakeUser.password) {
            // delete req.body.password;
            // res.json({success: true, data: req.body});
            const token = jwt.sign({iss: 'http://localhost:4201', role: 'admin', email: req.body.email}, secret);
            res.json({success: true, token});
        } else {
            res.status(401).json({success: false, message: 'Identifiant incorrect'});
        }
    } else {
        res.status(501).json({success: false, message: 'Donnéees manquantes'});
    }
});

auth.post('/register', (req, res) => {
    console.log('requ.boyd: ', req.body);
    if (req.body) {
        const email = req.body.email.toLocaleLowerCase().trim();
        const password = req.body.password.toLocaleLowerCase().trim();
        const nickname = req.body.nickname.trim();
        users = [{id: Date.now(), email, password, nickname}, ...users];
        res.json({success: true, users});
    } else {
        res.json({success: false, message: 'La création a échoué'});
    }
});

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
    job.length === 1 ? res.json({success: true, job: job[0]}) : res.json({
        success: false,
        message: `Pas de job ayant pour id ${id}`
    });
    // res.json(job);
});

api.get('/search/:term/:place?', (req, res) => {
    const term = req.params.term.toLowerCase().trim();
    let place = req.params.place;
    let jobs = getAllJobs().filter(j => (j.description.toLowerCase().includes(term) || j.title.toLowerCase().includes(term)));
    if (place) {
        place = place.toLowerCase().trim();
        jobs = jobs.filter(j => j.city.toLowerCase().includes(place));
    }
    res.json({success: true, jobs: jobs});
});

app.use('/api', api);
app.use('/auth', auth);


const port = 4201;

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
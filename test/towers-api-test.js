let chai = require("chai");
const chaiHttp = require('chai-http');
const server = require('../app');

//should
chai.should();
//assert
//expect

chai.use(chaiHttp);

let token = '';

let user = {
    email: "email@gmail.com", 
    password: "opensesame"
}

describe('Towers API', () => {

    describe('POST /api/v1/auth/login', () => {
        it('It should AUTH a user login', (done) => {
            chai.request(server)                
                .post('/api/v1/auth/login')
                .set('content-type', 'application/json')
                .send({
                    email: "email@gmail.com", 
                    password: "opensesame"
                })
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('token');
                    response.body.should.have.property('message').eq('Authentication successful');
                    token = response.body.token;
                    console.log(token)
                done();
                });
        });
    });

    //there's something wrong with the chai POST API - it is updating the object in the database 
    //but not handling the necessary response
    describe('POST /api/v1/towers', () => {
        it('It should POST a new tower', (done) => {
            chai.request(server)
                .post('/api/v1/towers')
                .set('content-type', 'application/json')
                //.set({ "Authorization": `Bearer ${token}` })
                .send({
                    name: 'Dubai Arch Tower 100',
                    location: 'Jumeirah Lake Towers, Dubai',
                    latitude: 25.189294307333963,
                    longitude: 55.263614600000004
                })
                .end((err, response) => {
                    response.should.have.status(201);
                    response.body.should.be.a('object');
                    response.body.should.have.property('status').eq('success');
                done();
                });
        });
    });


    describe('GET /api/v1/towers', () => {
        it('It should GET all the towers', (done) => {
            chai.request(server)
                .get('/api/v1/towers')
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('status').eq('success');
                done();
                });
        });

        it('It should NOT GET all the towers', (done) => {
            chai.request(server)
                .get('/api/v1/tower')
                .end((err, response) => {
                    response.should.have.status(404);
                done();
                });
        });

    });

    describe('GET /api/v1/towers/:id', () => {
        it('It should GET a tower by id', (done) => {
            const tower_id = 1;
            console.log('towerid', tower_id);
            chai.request(server)
                .get('/api/v1/towers/' + tower_id)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('status').eq('success');
                done();
                });
        });

        it('It should NOT GET a tower by id', (done) => {
            const tower_id = 0;
            chai.request(server)                
                .get('/api/v1/towers/' + tower_id)
                .end((err, response) => {
                    response.should.have.status(404);
                    response.body.should.be.a('object');
                    response.body.should.have.property('status').eq('fail');
                    response.body.should.be.property('message').eq('Tower not found');
                done();
                });
        });

    });

    //there's something wrong with the chai PUT API - it is updating the object in the database 
    //but not handling the necessary response
    describe('PUT /api/v1/towers/:id', () => {
        it('It should PUT a tower by id', (done) => {
            const tower_id = 9;
            chai.request(server)
                .put('/api/v1/towers/' + tower_id)
                .set('content-type', 'application/json')
                .set({ "Authorization": `Bearer ${token}` })
                .send({
                    num_floors: 100,
                    num_offices: 200
                })
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('status').eq('success');
                    response.body.should.have.property('data');
                done();
                });
        });
    });

    //there's something wrong with the chai DELETE API - it is deleting the object in the database 
    //but not handling the necessary response
    describe('DELETE /api/v1/towers/:id', () => {
        it('It should DELETE a tower by id', (done) => {
            const tower_id = 9;
            chai.request(server)
                .delete('/api/v1/towers/' + tower_id)
                .set('content-type', 'application/json')
                .set({ "Authorization": `Bearer ${token}` })
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('status').eq('success');
                    response.body.should.have.property('message').eq('Tower deleted');
                done();
                });
        });
    });

});

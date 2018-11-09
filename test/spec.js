const app = require('../src/server');
const request = require('supertest');
const expect = require('chai').expect;

describe('[Test Lions API]', () => {

    beforeEach(() => {
        console.log('before each test');
    });
    afterEach(() => {
        console.log('after each test');
    });

    let lionId;
    let lion = {name: "Simb5",age: 5,pride: "the cool cats5",gender: "male5"};

    it('Add a new lion', (done) => {
        request(app)
            .post('/lions')
            .send(lion)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, req) => {
                var recLion = req.body;
                expect(recLion.name).to.be.eql('Simb5');
                expect(recLion.age).to.be.eql(5);
                lionId = req.body.id;
                done();
            })
    });
    it('Get all lions', (done) => {
        request(app)
            .get('/lions')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, req) => {
                expect(req.body).to.be.an('array');
                done();
            })
    });
    it('Get single lion', (done) => {
        request(app)
            .get(`/lions/${lionId}`)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, req) => {
                expect(req.body).to.be.an('object');
                done();
            })
    });
    it('Update single lion', (done) => {
        request(app)
            .put(`/lions/${lionId}`)
            .send({name: "Lior"})
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, req) => {
                let retLion = req.body;
                expect(retLion.name).to.equal('Lior');
                done();
            })
    });
    it('Delete single lion', (done) => {
        request(app)
            .delete(`/lions/${lionId}`)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, req) => {
                expect(req.body).to.be.an('object');
                done();
            })
    });


});

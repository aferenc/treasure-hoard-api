process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();

chai.use(chaiHttp);

describe('/GET all treasures', () => {
    it('should GET all the treasures', (done) => {
        chai.request(server)
            .get('/treasures')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(201);
                done();
            });
    });
});

describe('/GET treasure', () => {
    it('should GET a treasure by a given ID', (done) => {
        chai.request(server)
            .get('/treasures/1')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('name');
                res.body.should.have.property('series');
                res.body.should.have.property('real_world_object');
                res.body.should.have.property('location');
                res.body.should.have.property('value');
                res.body.should.have.property('weight');
                res.body.should.have.property('max_carriers');
                res.body.should.have.property('olimar_notes');
                res.body.should.have.property('sales_pitch');
                res.body.should.have.property('_id').eql(1);
            });
        chai.request(server)
            .get('/treasures/201')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('name');
                res.body.should.have.property('series');
                res.body.should.have.property('real_world_object');
                res.body.should.have.property('location');
                res.body.should.have.property('value');
                res.body.should.have.property('weight');
                res.body.should.have.property('max_carriers');
                res.body.should.have.property('olimar_notes');
                res.body.should.have.property('sales_pitch');
                res.body.should.have.property('_id').eql(201);
                done();
            })
    });
    it('should give an HTML error response for an out of bounds ID', (done) => {
        chai.request(server)
            .get('/treasures/0')
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.html;
            });
        chai.request(server)
            .get('/treasures/202')
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.html;
                done();
            });
    });
    it('should give a JSON error response for an invalid ID', (done) => {
        chai.request(server)
            .get('/treasures/n')
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                done();
            });
    });
});
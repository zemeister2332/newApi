const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../../app');

chai.use(chaiHttp);

let token;

describe('Api Movielani Testi', () => {
    before((done) => {
        chai.request(server)
            .post('/authenticate')
            .send({username: 'zeuswow', password: '12345'})
            .end((err, res) => {
                token = res.body.token;
               // console.log(token);
                done();
            });
    });
    describe('/Get Movies', () => {
            it('bu movielani ekranga chiqarishi kerak',  (done)  => {
                chai.request(server)
                    .get('/api/movies')
                    .set('x-access-token', token)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('array');
                        done();
                    });
            });
    });

    describe('/POST Movies', () => {
        it('bu movie kiritishi kerak',  (done)  => {
            const movie = {
                title: 'Super Movie Test 1',
                director_id: '5ec84aa8c0b3f1fcd8a42bac',
                category: 'Comedy',
                country: 'USA',
                year: 2020,
                imdb_score: 6.8
            }

            chai.request(server)
                .post('/api/movies')
                .send(movie)
                .set('x-access-token', token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('title');
                    res.body.should.have.property('director_id');
                    res.body.should.have.property('category');
                    res.body.should.have.property('country');
                    res.body.should.have.property('year');
                    res.body.should.have.property('imdb_score');
                    done();
                });
        });
    });
});


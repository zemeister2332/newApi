const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../../app');

chai.use(chaiHttp);

let token, movieId;

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

    describe('/POST Movie', () => {
        it('bu movie kiritishi kerak',  (done)  => {
            const movie = {
                title: 'John Wick',
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
                    movieId = res.body._id;
                    done();
                });
        });
    });

    describe('/GET Movie From Id', () => {
        it('bu movieni id orqali korsatishi kerak',  (done)  => {
            chai.request(server)
                .get('/api/movies/' + movieId)
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
                    res.body.should.have.property('_id').eql(movieId);
                    done();
                });
        });
    });

    describe('/PUT Movie from Id', () => {
        it('bu movieni ozgartirishi kerak',  (done)  => {
            const movie = {
                title: 'World War 2',
                director_id: '5ec84aa8c0b3f1fcd8a42baa',
                category: 'War',
                country: 'France',
                year: 2016,
                imdb_score: 9.8
            }

            chai.request(server)
                .put('/api/movies/' + movieId)
                .send(movie)
                .set('x-access-token', token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('title').eql(movie.title);
                    res.body.should.have.property('director_id').eql(movie.director_id);
                    res.body.should.have.property('category').eql(movie.category);
                    res.body.should.have.property('country').eql(movie.country);
                    res.body.should.have.property('year').eql(movie.year);
                    res.body.should.have.property('imdb_score').eql(movie.imdb_score);
                    done();
                });
        });
    });

    describe('/Delete Movies', () => {
        it('bu movieni ochirishi kerak',  (done)  => {
            chai.request(server)
                .delete('/api/movies/' + movieId)
                .set('x-access-token', token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('status').eql(1);
                    done();
                });
        });
    });

});


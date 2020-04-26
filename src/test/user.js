import chai from 'chai';
import chaihttp from 'chai-http';
import app from '../app';
import { destroyModel } from '../utils/helpers';
import user from './data/user';

const { expect } = chai;
chai.use(chaihttp);

// const URL_PREFIX = '/api/v1/user';


describe('/api/v1/user', () => {
  before(async () => {
    await destroyModel('User');
  });

  describe('SIGN UP', () => {
    it('should sign up a new user', (done) => {
      chai.request(app)
        .post('/api/v1/user/signup')
        .send(user[0])
        .end((err, res) => {
          expect(res.statusCode).to.equal(201);
          expect(res.body).to.have.property('data');
          expect(res.body.data).to.have.property('token');
          done();
        });
    });
    it('should return an error with existing email', (done) => {
      chai.request(app)
        .post('/api/v1/user/signup')
        .send(user[0])
        .end((err, res) => {
          expect(res.statusCode).to.equal(409);
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.equal('User Already Exist');
          done();
        });
    });
    it('should return an error with existing username', (done) => {
      chai.request(app)
        .post('/api/v1/user/signup')
        .send(user[1])
        .end((err, res) => {
          expect(res.statusCode).to.equal(409);
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.equal('UserName Already Exist');
          done();
        });
    });
  });

  describe('SIGNUP INPUT VALIDATION', () => {
    it('should return error for invalid field', (done) => {
      chai.request(app)
        .post('/api/v1/user/signup')
        .send({ firstName: '' })
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body).to.have.property('error').with.lengthOf(6);
          done();
        });
    });
    it('should return an error with incomplete input field', (done) => {
      chai.request(app)
        .post('/api/v1/user/signup')
        .send({
          firstName: 'o',
          lastName: 'uche',
          email: 'uche@hjj.com',
          password: 'ioiofhjh',
          username: '000000'
        })
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body).to.have.property('error');
          expect(res.body).to.have.property('error').with.lengthOf(2);
          done();
        });
    });
    it('should return error on invalid route', (done) => {
      chai.request(app)
        .post('/api/v1/user/signfgfgup')
        .end((err, res) => {
          expect(res.statusCode).to.equal(404);
          expect(res.body).to.have.property('error');
          done();
        });
    });
  });
  describe('LOGIN', () => {
    it('should sign in an existing user', (done) => {
      chai.request(app)
        .post('/api/v1/user/login')
        .send(user[2])
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.have.property('data');
          expect(res.body.data).to.have.property('token');
          done();
        });
    });
    it('should return an error with incorrect input details', (done) => {
      chai.request(app)
        .post('/api/v1/user/login')
        .send(user[3])
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body).to.have.property('error');
          done();
        });
    });
    it('should return an error with incorrect input details', (done) => {
      chai.request(app)
        .post('/api/v1/user/login')
        .send(user[4])
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body).to.have.property('error');
          done();
        });
    });
    it('should return error for invalid field', (done) => {
      chai.request(app)
        .post('/api/v1/user/login')
        .send({ email: '' })
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body).to.have.property('error');
          done();
        });
    });
  });
});

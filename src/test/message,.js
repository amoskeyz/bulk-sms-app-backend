import chai from 'chai';
import chaihttp from 'chai-http';
import sinon from 'sinon';
import app from '../app';
import { destroyModel } from '../utils/helpers';
import user from './data/user';
import message from './data/message';
import messag from '../utils/message';

const { expect } = chai;
chai.use(chaihttp);

let userToken;
let send;

describe('/api/v1/user', () => {
  before(async () => {
    await destroyModel('User');
  });

  beforeEach((done) => {
    send = sinon.stub(messag, 'sendMessage').resolves('Message Sent');
    done();
  });

  afterEach((done) => {
    send.restore();
    done();
  });

  describe('SIGN UP', () => {
    it('should sign up a new user', (done) => {
      chai.request(app)
        .post('/api/v1/user/signup')
        .send(user[0])
        .end((err, res) => {
          const { token } = res.body.data;
          userToken = token;
          expect(res.statusCode).to.equal(201);
          expect(res.body).to.have.property('data');
          expect(res.body.data).to.have.property('token');
          done();
        });
    });
    it('should return an error without access token', (done) => {
      chai.request(app)
        .post('/api/v1/message/')
        .send(message[0])
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.equal('Unauthorized access');
          done();
        });
    });
    it('should return an error with user email that does not exit', (done) => {
      chai.request(app)
        .post('/api/v1/message/')
        .send(message[0])
        .set('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ1c2VyMUBnbWFpbC5jb20iLCJpYXQiOjE1Nzk2ODc4ODV9.sfrFingzsBuXqbQ6bxisZRl8XaGYkXSJ7KBECT2MFrU')
        .end((err, res) => {
          expect(res.statusCode).to.equal(401);
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.equal('Unauthorized');
          done();
        });
    });
    it('should return Successful if message is sent', (done) => {
      chai.request(app)
        .post('/api/v1/message/')
        .send(message[0])
        .set('x-access-token', userToken)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.have.property('data');
          expect(res.body.data.send).to.equal('Message Sent');
          done();
        });
    });
    it('should return Successful if message is sent', (done) => {
      chai.request(app)
        .post('/api/v1/message/')
        .send(message[2])
        .set('x-access-token', userToken)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.have.property('data');
          expect(res.body.data.send).to.equal('Message Sent');
          done();
        });
    });
    it('should return an error with insufficient credit unit', (done) => {
      chai.request(app)
        .post('/api/v1/message/')
        .send(message[1])
        .set('x-access-token', userToken)
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.equal('Insufficient Unit to perform this Operation');
          done();
        });
    });
  });
});

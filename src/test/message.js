import chai from 'chai';
import chaihttp from 'chai-http';
import sinon from 'sinon';
import app from '../app';
import { destroyModel, createUser } from '../utils/helpers';
import user from './data/user';
import message from './data/message';
import messag from '../utils/message';

const { expect } = chai;
chai.use(chaihttp);

let userToken;
let adminToken;

let send;

describe('/api/v1/message', () => {
  before(async () => {
    await destroyModel('User');
    await destroyModel('Message');
    await createUser(user[6], 'User');
  });

  beforeEach((done) => {
    send = sinon.stub(messag, 'sendMessage').resolves('Message Sent');
    done();
  });

  afterEach((done) => {
    send.restore();
    done();
  });

  describe('ADD CREDIT UNIT', () => {
    it('should login admin', (done) => {
      chai.request(app)
        .post('/api/v1/user/login')
        .send(user[5])
        .end((err, res) => {
          const { token } = res.body.data;
          adminToken = token;
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.have.property('data');
          expect(res.body.data).to.have.property('token');
          done();
        });
    });
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
    it('should return an error with invalid email', (done) => {
      chai.request(app)
        .put('/api/v1/message/credit')
        .send({
          email: 'insd@gjg.com',
          unit: '200'
        })
        .set('x-access-token', adminToken)
        .end((err, res) => {
          expect(res.statusCode).to.equal(404);
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.equal('User Not Found');
          done();
        });
    });
    it('should credit user if admin', (done) => {
      chai.request(app)
        .put('/api/v1/transaction')
        .send({
          email: 'usero1@gmail.com',
          amount: '2',
          method: 'Bank Transfer'
        })
        .set('x-access-token', adminToken)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.have.property('data');
          expect(res.body.data.message).to.equal('2 added successfully to \'usero1@gmail.com\'');
          done();
        });
    });
    it('should return an error if not admin', (done) => {
      chai.request(app)
        .put('/api/v1/message/credit')
        .send({
          email: 'usero1@gmail.com',
          unit: '200'
        })
        .set('x-access-token', userToken)
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.equal('You Are Not Allowed to Access This Route');
          done();
        });
    });
  });
  describe('SEND MESSAGE', () => {
    it('should return an error without access token', (done) => {
      chai.request(app)
        .post('/api/v1/message/')
        .send(message[0])
        .end((err, res) => {
          expect(res.statusCode).to.equal(403);
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
  describe('GET MESSAGE', () => {
    it('should get all message', (done) => {
      chai.request(app)
        .get('/api/v1/message')
        .set('x-access-token', userToken)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.have.property('data');
          done();
        });
    });
    it('should get a message for a user', (done) => {
      chai.request(app)
        .get('/api/v1/message/1')
        .set('x-access-token', userToken)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.have.property('data');
          expect(res.body.data).to.have.property('recipient');
          expect(res.body.data).to.have.property('sender');
          expect(res.body.data).to.have.property('text');
          done();
        });
    });
    it('should error if message is not found', (done) => {
      chai.request(app)
        .get('/api/v1/message/7')
        .set('x-access-token', userToken)
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.equal('Message Not Found');
          done();
        });
    });
    it('should not get another users message', (done) => {
      chai.request(app)
        .get('/api/v1/message/1')
        .set('x-access-token', adminToken)
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.equal('Unauthorize Access');
          done();
        });
    });
  });
  describe('DELETE MESSAGE', () => {
    it('should delete a message for a user', (done) => {
      chai.request(app)
        .delete('/api/v1/message/1')
        .set('x-access-token', userToken)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equal('Delete Successful');
          done();
        });
    });
    it('should error if message is not found', (done) => {
      chai.request(app)
        .delete('/api/v1/message/7')
        .set('x-access-token', userToken)
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.equal('Message Not Found');
          done();
        });
    });
    it('should delete another users message', (done) => {
      chai.request(app)
        .delete('/api/v1/message/2')
        .set('x-access-token', adminToken)
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.equal('Unauthorize Access');
          done();
        });
    });
  });
});

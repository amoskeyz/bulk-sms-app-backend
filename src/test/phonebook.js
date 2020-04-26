import chai from 'chai';
import chaihttp from 'chai-http';
import app from '../app';
import { destroyModel } from '../utils/helpers';
import user from './data/user';

const { expect } = chai;
chai.use(chaihttp);

let userToken;

describe('/api/v1/user/phonebook', () => {
  before(async () => {
    await destroyModel('User');
    await destroyModel('Phonebook');
  });

  describe('ADD PHONEBOOK', () => {
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
    it('should add number to phonebook', (done) => {
      chai.request(app)
        .post('/api/v1/user/phonebook')
        .set('x-access-token', userToken)
        .send({ contacts: '080987876675', name: 'test' })
        .end((err, res) => {
          expect(res.statusCode).to.equal(201);
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equal('Phonebook Successfully Created');
          done();
        });
    });
    it('should return an error if user pgonebook already exist', (done) => {
      chai.request(app)
        .post('/api/v1/user/phonebook')
        .set('x-access-token', userToken)
        .send({ contacts: '080987876675', name: 'test' })
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.equal('phoneBook \'test\' already exist');
          done();
        });
    });
  });
});

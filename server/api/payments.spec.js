const {expect} = require('chai');
const request = require('supertest');
const db = require('../db');
const app = require('../index');
const Payments = db.model('payment');

describe('Payment routes', () => {
  beforeEach(() => {
    return db.sync({force: true});
  });

  let payment1;
  let payment2;
  describe('/api/payments', () => {
    beforeEach(async () => {
      let promise1 = Payments.create({
        type: 'credit'
      });
      let promise2 = Payments.create({
        type: 'pay'
      });
      const result = await Promise.all([promise1, promise2]);
      [payment1, payment2] = result;
    });
  });

  describe('GET requests', () => {
    it('api/payments', async () => {
      const res = await request(app)
        .get('/api/payments')
        .expect(200);
      expect(res.body).to.be.an('array');
      expect(res.body).to.have.lengthOf(2);
    });

    it('api/payments/:id', () => {
      return request(app)
        .get(`/api/payments/${payment1.id}`)
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('object');
          expect(res.body.model).to.be.equal(payment1.model);
        });
    });
  });
});

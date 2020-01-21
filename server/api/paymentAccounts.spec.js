const {expect} = require('chai');
const request = require('supertest');
const db = require('../db');
const app = require('../index');
const PaymentAccounts = db.model('paymentAccounts');

describe('Payment account routes', () => {
  beforeEach(() => {
    return db.sync({force: true});
  });

  let paymentAccount1;
  let paymentAccount2;
  describe('/api/payment-accounts', () => {
    beforeEach(async () => {
      let promise1 = PaymentAccounts.create({
        name: 'account123'
      });
      let promise2 = PaymentAccounts.create({
        name: 'count321'
      });
      const result = await Promise.all([promise1, promise2]);
      [paymentAccount1, paymentAccount2] = result;
    });
  });

  describe.only('GET requests', () => {
    it('api/payments', async () => {
      const res = await request(app)
        .get('/api/payment-accounts')
        .expect(200);
      expect(res.body).to.be.an('array');
      expect(res.body).to.have.lengthOf(2);
    });

    it('api/payments/:id', () => {
      return request(app)
        .get(`/api/payment-accounts/${paymentAccount1.id}`)
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('object');
          expect(res.body.model).to.be.equal(paymentAccount1.model);
        });
    });
  });
});

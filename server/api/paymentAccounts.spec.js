const {expect} = require('chai');
const request = require('supertest');
const db = require('../db');
const app = require('../index');
const PaymentAccounts = db.model('paymentAccounts');

describe('Payment account routes', () => {
  beforeEach(() => {
    return db.sync({force: true});
  });

  describe('/api/payment-accounts', () => {
    const accountName = 'account123';
    let id;
    beforeEach(async () => {
      let account1 = await PaymentAccounts.create({
        name: accountName
      });
      id = account1.id;
    });

    it('GET api/payments', async () => {
      const res = await request(app)
        .get('/api/payment-accounts')
        .expect(200);
      expect(res.body).to.be.an('array');
      expect(res.body[0].name).to.be.equal(accountName);
    });

    it('GET api/payments/:id', async () => {
      const res = await request(app)
        .get(`/api/payment-accounts/${id}`)
        .expect(200);

      expect(res.body).to.be.an('object');
      expect(res.body.name).to.be.equal(accountName);
    });
  });
});

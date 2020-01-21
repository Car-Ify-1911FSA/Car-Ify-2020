const {expect} = require('chai');
const request = require('supertest');
const db = require('../db');
const app = require('../index');
const Payment = db.model('payment');

describe('Payments routes', () => {
  beforeEach(() => {
    return db.sync({force: true});
  });

  describe('/api/payments/', () => {
    const paymentType = 'venmo';

    beforeEach(() => {
      return Payment.create({
        type: paymentType
      });
    });

    it('GET /api/payments', async () => {
      const res = await request(app)
        .get('/api/payments')
        .expect(200);

      expect(res.body).to.be.an('array');
      expect(res.body[0].type).to.be.equal('venmo');
    });
  });
});

const {expect} = require('chai');
const request = require('supertest');
const db = require('../db');
const app = require('../index');
const Cart = db.model('cart');

xdescribe('Cart routes', () => {
  beforeEach(() => {
    return db.sync({force: true});
  });

  let cart1;

  xdescribe('/api/cart/', () => {
    beforeEach(async () => {
      let data1 = await Cart.bulkCreate([
        {
          status: 'shipped',
          time: Date()
        }
      ]);
      const result = await Promise.all([cart1]);
      [data1] = result;
    });

    it('GET /api/cart', async () => {
      const res = await request(app)
        .get('/api/cart')
        .expect(200);

      expect(res.body).to.be.an('array');
      expect(res.body).to.have.lengthOf(2);
    });
  }); // end describe('/api/users')
});

const {expect} = require('chai');
const request = require('supertest');
const db = require('../db');
const app = require('../index');
const CartProduct = db.model('cartProduct');

describe('Logged-In Cart Routes', () => {
  beforeEach(() => {
    return db.sync({force: true});
  });

  let CartProduct1;
  let CartProduct2;

  describe('/api/cart-product', () => {
    beforeEach(async () => {
      let promise1 = await CartProduct.bulkCreate([
        {
          cartId: 1,
          productId: 1,
          quantity: 2,
          totalPrice: 69000
        },
        {
          cartId: 1,
          productId: 2,
          quantity: 1,
          totalPrice: 24700
        }
      ]);
      let promise2 = await CartProduct.bulkCreate([
        {
          cartId: 3,
          productId: 4,
          quantity: 1,
          totalPrice: 54000
        },
        {
          cartId: 3,
          productId: 1,
          quantity: 1,
          totalPrice: 34500
        },
        {
          cartId: 3,
          productId: 3,
          quantity: 2,
          totalPrice: 78000
        }
      ]);

      const result = await Promise.all([promise1, promise2]);
      console.log('first -', result);
      [CartProduct1, CartProduct2] = result;
    });
  });

  describe('GET requests', () => {
    it('Cart 1: api/cart-product/:cartId', async () => {
      const res = await request(app)
        .get(`/api/cart-product/${CartProduct1.id}`)
        .expect(200);
      expect(res.body).to.be.an('array');
      expect(res.body).to.have.lengthOf(2);
    });

    it('Cart 2: api/cart-product/:cartId', async () => {
      const res = await request(app)
        .get(`/api/cart-product/${CartProduct2.id}`)
        .expect(200);
      expect(res.body).to.be.an('array');
      expect(res.body).to.have.lengthOf(3);
    });
  });
});

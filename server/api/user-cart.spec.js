const {expect} = require('chai');
const request = require('supertest');
const db = require('../db');
const app = require('../index');
const CartProduct = db.model('cartProduct');
const Cart = db.model('cart');
const Product = db.model('product');

describe.only('Logged-In Cart Routes', () => {
  beforeEach(() => {
    return db.sync({force: true});
  });

  describe('GET requests', () => {
    const cartId = 1;

    beforeEach(() => {
      return (
        Cart.create({
          status: 'active',
          time: Date()
        }),
        Product.create({
          brand: 'lexus',
          quantity: 5,
          price: 34500
        }),
        Product.create({
          brand: 'mazda',
          quantity: 10,
          price: 24700
        }),
        CartProduct.create({
          cartId: 1,
          productId: 1,
          quantity: 2,
          totalPrice: 69000
        }),
        CartProduct.create({
          cartId: 1,
          productId: 2,
          quantity: 1,
          totalPrice: 24700
        })
      );
    });

    it('Cart 1: api/cart-product/:cartId', async () => {
      const res = await request(app)
        .get(`/api/cart-product/${cartId}`)
        .expect(200);
      expect(res.body).to.be.an('array');
      expect(res.body).to.have.lengthOf(2);
    });

    it('Cart 2: api/cart-product/:cartId', async () => {
      const res = await request(app)
        .get(`/api/cart-product/${cartId}`)
        .expect(200);
      expect(res.body[0].id).to.be.equal(cartId);
    });
  });
});

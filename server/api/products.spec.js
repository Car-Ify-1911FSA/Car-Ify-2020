const {expect} = require('chai');
const request = require('supertest');
const db = require('../db');
const app = require('../index');
const Product = db.model('product');

describe('Backend product routes', () => {
  beforeEach(() => {
    return db.sync({force: true});
  });

  describe('api/products', () => {
    let product;
    beforeEach(async () => {
      const newProd = {
        brand: 'ZEPR',
        model: 'RX350',
        category: 'SUV',
        color: 'Black',
        price: 34500,
        condition: 'Used',
        description:
          'The 2020 Lexus RX 350 is a solid entry in the midsize SUV class, offering a roomy and comfortable cabin and typically excellent build quality.',
        quantity: 10,
        imageUrl:
          'https://www.lexusofrockvillecentre.com/inventoryphotos/7416/2t2bzmca2kc168351/sp/1.jpg?height=400',
        totalRating: 50,
        numberRating: 10
      };

      product = await Product.create(newProd);
      return product;
    });
    it('api/products', async () => {
      const res = await request(app)
        .get('/api/products')
        .expect(200);
      expect(res.body).to.be.an('array');
      expect(res.body).to.have.lengthOf(1);
    });

    it('api/products/:id', async () => {
      const res = await request(app)
        .get(`/api/products/${product.id}`)
        .expect(200);
      expect(res.body).to.be.an('object');
      expect(res.body.brand).to.be.equal(product.brand);
    });
  });
});

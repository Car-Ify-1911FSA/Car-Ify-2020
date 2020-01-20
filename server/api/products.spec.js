const {expect} = require('chai');
const request = require('supertest');
const db = require('../db');
const app = require('../index');
const Product = db.model('product');

describe('Product routes', () => {
  beforeEach(() => {
    return db.sync({force: true});
  });

  let car1;
  let car2;
  describe('/api/products', () => {
    beforeEach(async () => {
      let promise1 = Product.create({
        brand: 'Lexus',
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
      });
      let promise2 = Product.create({
        brand: 'Honda',
        model: 'Accord',
        category: 'Sedan',
        color: 'Red',
        price: 24700,
        condition: 'New',
        description:
          "The 10th-generation Accord was a winner out of the gate in 2018, making us fall in love with Honda's midsize sedan all over again.",
        quantity: 8,
        imageUrl:
          'https://blogmedia.dealerfire.com/wp-content/uploads/sites/1050/2019/04/Radiant-Red-Metallic_o.jpg',
        totalRating: 32,
        numberRating: 8
      });
      const result = await Promise.all([promise1, promise2]);
      [car1, car2] = result;
    });
  });
  describe('GET requests', () => {
    it('api/products', async () => {
      const res = await request(app)
        .get('/api/products')
        .expect(200);
      expect(res.body).to.be.an('array');
      expect(res.body).to.have.lengthOf(2);
    });
    it('api/products/:id', () => {
      return request(app)
        .get(`/api/products/${car1.id}`)
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('object');
          expect(res.body.model).to.be.equal(car1.model);
        });
    });
  });
});

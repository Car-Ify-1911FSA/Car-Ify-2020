'use strict';

const db = require('../server/db');
const {
  User,
  Payment,
  Product,
  PaymentAccount,
  Cart,
  CartProduct
} = require('../server/db/models');

const userSeed = [
  {
    admin: true,
    name: 'Cody',
    email: 'cody@email.com',
    password: '123'
  },
  {
    admin: false,
    name: 'Murphy',
    email: 'murphy@email.com',
    password: '123'
  },
  {
    admin: false,
    name: 'Sam',
    email: 'sam@email.com',
    password: '123'
  }
];

const paymentSeed = [
  {
    type: 'credit card'
  },
  {
    type: 'paypal'
  },
  {
    type: 'stripe'
  }
];

const productSeed = [
  {
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
  },
  {
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
  },
  {
    brand: 'Volvo',
    model: 'XC90',
    category: 'SUV',
    color: 'Blue',
    price: 39000,
    condition: 'New',
    description:
      "Step into most any modern luxury car and you'll find a cabin with enough buttons and switches to make an airline pilot feel right at home.",
    quantity: 9,
    imageUrl:
      'https://file.kbb.com/kbb/images/content/editorial/slideshow/2016-volvo-xc90-r-design-unveiled/2016-volvo-xc9-r-design-front-static1-600-001.jpg',
    totalRating: 36,
    numberRating: 9
  },
  {
    brand: 'BMW',
    model: 'X5',
    category: 'SUV',
    color: 'Yellow',
    price: 54000,
    condition: 'New',
    description:
      "It's easy to see why the 2020 BMW X5 is one of the more appealing midsize luxury SUVs on the market.",
    quantity: 15,
    imageUrl: 'https://en.crimerussia.com/upload/iblock/352/BMWX5.jpg',
    totalRating: 30,
    numberRating: 10
  },
  {
    brand: 'Mazda',
    model: 'CX-5',
    category: 'SUV',
    color: 'White',
    price: 28000,
    condition: 'New',
    description:
      'Sharp style and sporting performance remain hallmarks of the 2019 Mazda CX-5, a small crossover SUV designed for those who enjoy a spirited drive.',
    quantity: 17,
    imageUrl:
      'https://www.cstatic-images.com/car-pictures/xl/USC80MAS061C021001.jpg',
    totalRating: 20,
    numberRating: 4
  },
  {
    brand: 'BMW',
    model: 'S-350',
    category: 'Sedan',
    color: 'White',
    price: 68000,
    condition: 'Used',
    description:
      'A performance automobile is a vehicle that is designed specifically for speed.',
    quantity: 12,
    imageUrl:
      'https://www.autoblog.com/img/research/styles/photos/performance.jpg',
    totalRating: 12,
    numberRating: 6
  }
];

const cartSeed = [
  {
    status: 'shipped',
    time: '03/25/2018',
    userId: 1,
    paymentAccountId: 1
  },
  {
    status: 'paid',
    time: '08/22/2019',
    userId: 1,
    paymentAccountId: 1
  },
  {
    status: 'active',
    time: '10/15/2019',
    userId: 1,
    paymentAccountId: 2
  },
  {
    status: 'active',
    time: '09/23/2019',
    userId: 2,
    paymentAccountId: 3
  },
  {
    status: 'shipped',
    time: '07/23/2019',
    userId: 3,
    paymentAccountId: 4
  }
];

const paymentAccountSeed = [
  {
    name: 'cc123',
    paymentId: 1,
    userId: 1
  },
  {
    name: 'paypal123',
    paymentId: 2,
    userId: 1
  },
  {
    name: 'stripe123',
    paymentId: 3,
    userId: 2
  },
  {
    name: 'cc456',
    paymentId: 1,
    userId: 2
  }
];

const cartProductSeed = [
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
  },
  {
    cartId: 2,
    productId: 2,
    quantity: 1,
    totalPrice: 30000
  },
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
  },
  {
    cartId: 4,
    productId: 5,
    quantity: 1,
    totalPrice: 28000
  },
  {
    cartId: 4,
    productId: 6,
    quantity: 3,
    totalPrice: 204000
  },
  {
    cartId: 4,
    productId: 3,
    quantity: 2,
    totalPrice: 78000
  }
];

async function seed() {
  await db.sync({force: true});
  console.log('db synced!');

  await User.bulkCreate(userSeed);
  await Payment.bulkCreate(paymentSeed);
  await Product.bulkCreate(productSeed);
  await PaymentAccount.bulkCreate(paymentAccountSeed); // TEMP REMOVE
  await Cart.bulkCreate(cartSeed); // TEMP REMOVE
  await CartProduct.bulkCreate(cartProductSeed); // TEMP REMOVE

  console.log(`seeded successfully`);
}

async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
  }
}

if (module === require.main) {
  runSeed();
}

module.exports = seed;

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
const {
  userSeed,
  paymentSeed,
  productSeed,
  paymentAccountSeed,
  cartSeed,
  cartProductSeed
} = require('./seedData');

// async function seed() {
//   try {
//     console.log('sync function', db.sync);
//     await db.sync({force: true});
//     console.log('db synced!');

//     await User.bulkCreate(userSeed);
//     await Payment.bulkCreate(paymentSeed);
//     await Product.bulkCreate(productSeed);
//     await PaymentAccount.bulkCreate(paymentAccountSeed); // TEMP REMOVE
//     await Cart.bulkCreate(cartSeed); // TEMP REMOVE
//     await CartProduct.bulkCreate(cartProductSeed); // TEMP REMOVE

//     console.log(`seeded successfully`);
//   } catch (err) {
//     console.log('db did not sync!');
//     console.log(err);
//   }
// }

async function runSeed() {
  console.log('seeding...');
  try {
    // await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    // await db.close();
    console.log('db connection closed');
  }
}

if (module === require.main) {
  runSeed();
}

// module.exports = seed;

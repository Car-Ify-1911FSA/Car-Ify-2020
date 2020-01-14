'use strict'

const db = require('../server/db')
const {User, Payment, Product} = require('../server/db/models')

const userSeed = [
  {
    email: 'cody@email.com',
    password: '123'
  },
  {
    email: 'murphy@email.com',
    password: '123'
  }
]

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
]

const productSeed = [
  {
    brand: 'Lexus',
    model: 'RX350',
    category: 'SUV',
    color: 'Black',
    price: 34500,
    condition: 'used',
    description:
      'The 2020 Lexus RX 350 is a solid entry in the midsize SUV class, offering a roomy and comfortable cabin and typically excellent build quality.',
    quantity: 10,
    imageUrl:
      'https://www.lexusofrockvillecentre.com/inventoryphotos/7416/2t2bzmca2kc168351/sp/1.jpg?height=400'
  },
  {
    brand: 'Honda',
    model: 'Accord',
    category: 'Sedan',
    color: 'Red',
    price: 24700,
    condition: 'new',
    description:
      "The 10th-generation Accord was a winner out of the gate in 2018, making us fall in love with Honda's midsize sedan all over again.",
    quantity: 8,
    imageUrl:
      'https://blogmedia.dealerfire.com/wp-content/uploads/sites/1050/2019/04/Radiant-Red-Metallic_o.jpg'
  },
  {
    brand: 'Volvo',
    model: 'XC90',
    category: 'SUV',
    color: 'Blue',
    price: 39000,
    condition: 'new',
    description:
      "Step into most any modern luxury car and you'll find a cabin with enough buttons and switches to make an airline pilot feel right at home.",
    quantity: 9,
    imageUrl:
      'https://file.kbb.com/kbb/images/content/editorial/slideshow/2016-volvo-xc90-r-design-unveiled/2016-volvo-xc9-r-design-front-static1-600-001.jpg'
  },
  {
    brand: 'BMW',
    model: 'X5',
    category: 'SUV',
    color: 'Yellow',
    price: 54000,
    condition: 'new',
    description:
      "It's easy to see why the 2020 BMW X5 is one of the more appealing midsize luxury SUVs on the market.",
    quantity: 15,
    imageUrl: 'https://en.crimerussia.com/upload/iblock/352/BMWX5.jpg'
  },
  {
    brand: 'Mazda',
    model: 'CX-5',
    category: 'SUV',
    color: 'White',
    price: 28000,
    condition: 'new',
    description:
      'Sharp style and sporting performance remain hallmarks of the 2019 Mazda CX-5, a small crossover SUV designed for those who enjoy a spirited drive.',
    quantity: 17,
    imageUrl:
      'https://www.cstatic-images.com/car-pictures/xl/USC80MAS061C021001.jpg'
  }
]

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  await User.bulkCreate(userSeed)
  await Payment.bulkCreate(paymentSeed)
  await Product.bulkCreate(productSeed)

  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed

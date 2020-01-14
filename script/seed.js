'use strict'

const db = require('../server/db')
const {User, Payment} = require('../server/db/models')

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

const products = [
  {
    brand: 'Lexus',
    model: 'RX350',
    category: 'SUV',
    color: 'Black',
    price: 34500,
    condition: 'used',
    description:
      "The 2020 Lexus RX 350 is a solid entry in the midsize SUV class, offering a roomy and comfortable cabin and typically excellent build quality. But we have been let down by this generation's anonymous driving experience and poorly thought-out infotainment system controller. Lexus hopes the improvements it made to this year's RX will rectify these shortcomings.</p>\n\n<p>Lexus says it retuned the suspension and stiffened the body structure to give the RX a slightly sportier feel when driven around turns while still keeping ride comfort paramount. The F Sport's sport suspension &mdash; which previously resulted in a far harsher ride in exchange for minimal performance gains &mdash; has been modified as well.</p>\n\n<p>Inside the cabin, Lexus has swapped out the mouse-like controller for a new trackpad. It's better but can still be overly distracting to use while driving. The display screen is also new. It's now a touchscreen, meaning you can avoid using the trackpad by touching the various menus and buttons. Lexus also repositioned the screen to be nearly 6 inches closer to the driver, so reaching the screen doesn't require a stretch. Finally, Apple CarPlay and Android Auto are also on board this year as standard equipment. These changes go a long way toward improving the RX 350's tech cred.</p>\n\n<p>The 2020 Lexus RX 350 is more competitive than ever, with drastic quality-of-life improvements that make it a more appealing buy than last year's model. Previously an also-ran in the midsize luxury crossover segment, the RX has graduated to become a respectable offering in the class.",
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
      "The 10th-generation Accord was a winner out of the gate in 2018, making us fall in love with Honda's midsize sedan all over again. There are no changes for the 2020 model, but that's hardly a bad thing. As it stands, the Accord is stylish and comfortable, and it hits big with utility.\n\nMost of the Accord's competitors have been refreshed or redesigned over the past few years, but the Honda still shines in the class. On the road, the Accord is quiet and smooth, with our biggest complaint a bit of excessive tire noise at highway speeds. It's fun to drive, too, thanks to a pair of peppy engines and an available manual transmission. The car's 16.7 cubic feet of trunk space is among the biggest in the class, and the passenger area offers lots of bins and pockets for phones, sunglasses, water bottles and more.\n\nHonda packs in a good bit of technology into the Accord, too. In addition to the standard Honda Sensing package that includes features such as adaptive cruise control, lane keeping assist and traffic sign recognition, the Accord is available with Apple CarPlay and Android Auto, LED lighting and a wireless phone charger. While you might want to look at the Mazda 6 if you desire a more premium cabin or the Kia Stinger for more exciting performance, the well-rounded Honda Accord continues to be Edmunds' top-ranked midsize sedan.",
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
      "Step into most any modern luxury car and you'll find a cabin with enough buttons and switches to make an airline pilot feel right at home. In contrast, the 2020 Volvo XC90 offers a simple, elegant interior that exemplifies the minimalist Swedish design ethos. It's a refreshing approach that helps set the XC90 apart from other three-row SUVs.\n\nThe unusual cabin design isn't the only thing that differentiates the Volvo XC90. While some rivals offer a range of powerful (but thirsty) V6 and V8 engines, the XC90 is driven exclusively by a turbocharged four-cylinder engine. There are three versions, which Volvo dubs T5, T6 and T8. The T5's 250 horsepower is a little underwhelming, but the T6's 300 hp and the T8's 400 hp are certainly satisfying.\n\nThe XC90 isn't perfect, however. The minimalist design means most of the vehicle's functions are accessible in the infotainment screen, and the layout isn't the most intuitive. We also take issue with half-baked voice controls that fail to recognize points of interest. Technology missteps aside, the XC90 is one of the better choices in the segment. This year's improvements to the suspension and T8 hybrid's brake pedal make recommending the Volvo XC90 easier than ever.",
    imageUrl:
      'https://file.kbb.com/kbb/images/content/editorial/slideshow/2016-volvo-xc90-r-design-unveiled/2016-volvo-xc9-r-design-front-static1-600-001.jpg'
  },
  {
    brand: 'BMW',
    model: 'X5',
    category: 'SUV',
    color: 'Yellow',
    price: 5400,
    condition: 'new',
    description:
      "It's easy to see why the 2020 BMW X5 is one of the more appealing midsize luxury SUVs on the market. The X5 comes standard with two rows of seating but is available with a third row if you want to increase its flexibility for occasionally taking along a couple of extra kids. Regardless of which X5 model you choose, you'll have a long list of upscale options to pick from, including features such as massaging front seats and an adjustable suspension that you can lower to help make getting in easier.\n\nThe X5 can also be pretty sporty if you want it to be. Three different engine choices are offered: a base turbocharged six-cylinder and two versions of a turbocharged V8. The base six-cylinder is impressive, but the 4.4-liter V8 is the real powerhouse in the X5 lineup, putting out 456 horsepower in the standard xDrive50i and a whopping 523 hp in the new-for-2020 M50i trim. Just because you need a family hauler doesn't mean you can't have a little fun while you're at it.\n\nThere are some more mundane drawbacks to the X5, however. The previously mentioned third row is optional, and it's not very large — buyers who are constantly using the third row will likely want something larger. Other issues include an infotainment system that has a steep learning curve and a lack of interior storage for small items such as smartphones and water bottles.",
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
      "Sharp style and sporting performance remain hallmarks of the 2019 Mazda CX-5, a small crossover SUV designed for those who enjoy a spirited drive. Excellent handling and a high-quality interior also help make it one of our top picks for a small SUV.\n\nFor 2019, the CX-5 is available in two new trim levels, Grand Touring Reserve and Signature. Both offer a broader list of premium features and conveniences this year and come standard with a new turbocharged 2.5-liter four-cylinder engine. This engine, which is lifted from the three-row CX-9, generates up to 250 horsepower and a stout 310 pound-feet of torque.\n\nThis turbocharged 2.5-liter engine goes a long way toward addressing what has been one of our key complaints about the CX-5 relative to its competitors: lack of power from the standard four-cylinder engine. And late in the model year, Mazda is bringing out another optional engine: a 2.2-liter diesel for the CX-5 Signature, which promises increased towing capacity and fuel economy. These engines come at a price, however, since they are limited to the top-of-the-line trim levels.\n\nNo matter which CX-5 trim level you pick, you'll be stuck with less cabin and cargo room than you'd have in several rivals. Overall, however, the CX-5 is a standout. It provides an excellent balance of sportiness, comfort and practicality, and its upscale interior conveys a sense of richness that you don't find in rivals. It's a smart choice.",
    imageUrl:
      'https://www.cstatic-images.com/car-pictures/xl/USC80MAS061C021001.jpg'
  }
]

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  await User.bulkCreate(userSeed)
  await Payment.bulkCreate(paymentSeed)

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

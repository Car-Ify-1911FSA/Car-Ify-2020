const Product = require('./models/product')
const db = require('./db')

const seed = async () => {
  await db.sync({force: true})

  // await Products.create({
  //   brand: 'Toyota',
  //   model: '1',
  //   category: 'Fast',
  //   color: 'Blue',
  //   price: 100.00,
  //   condition: 'used'
  // })

  db.close()
}

seed()

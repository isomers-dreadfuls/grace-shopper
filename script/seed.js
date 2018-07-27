'use strict'

const db = require('../server/db')
const {User, Product, Inventory, Review} = require('../server/db/models')
const products = require('./products.json')
const inventories = require('./inventories.json')
const reviews = require('./reviews.json')

/**
 * Welcome to the seed file! This seed file uses a newer language feature called...
 *
 *                  -=-= ASYNC...AWAIT -=-=
 *
 * Async-await is a joy to use! Read more about it in the MDN docs:
 *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
 *
 * Now that you've got the main idea, check it out in practice below!
 */

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({
      firstName: 'Cody',
      lastName: 'Pug',
      userAddress: '123 Dog Street',
      userCity: 'Dogtown',
      userState: 'NY',
      userZip: '10010',
      email: 'cody@email.com',
      password: '123'
    }),
    User.create({
      firstName: 'Peter',
      lastName: 'Murphy',
      userAddress: '333 Main Street',
      userCity: 'New York',
      userState: 'NY',
      userZip: '10010',
      email: 'murphy@email.com',
      password: '123'
    })
  ])

  console.log(`seeded ${users.length} users`)

  console.log('seeding products')
  await Promise.all(
    products.map(async productData => {
      const product = await Product.create(productData)
    })
  )
  console.log(`seeded ${products.length} products`)

  console.log('seeding inventories')
  await Promise.all(
    inventories.map(async inventoryData => {
      const inventory = await Inventory.create(inventoryData)
    })
  )
  console.log(`seeded ${inventories.length} inventories`)

  console.log('seeding reviews')
  await Promise.all(
    reviews.map(async reviewData => {
      const review = await Review.create(reviewData)
    })
  )
  console.log(`seeded ${reviews.length} reviews`)

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

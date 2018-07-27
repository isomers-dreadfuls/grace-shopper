'use strict'

const db = require('../server/db')
const {User, Product, Inventory, Review} = require('../server/db/models')
const products = require('./products.json')
const inventories = require('./inventories.json')
const users = require('./users.json')
const reviews = require('./reviews.json')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  // --- seed users
  console.log('.....seeding users')
  await Promise.all(await User.bulkCreate(users))
  console.log(`-------> seeded ${users.length} users!`)

  // --- seed products
  console.log('.....seeding products')
  await Promise.all(await Product.bulkCreate(products))
  console.log(`-------> seeded ${products.length} products!`)

  // --- seed inventories
  console.log('.....seeding inventories')
  await Promise.all(await Inventory.bulkCreate(inventories))
  console.log(`-------> seeded ${inventories.length} inventories!`)

  // --- seed reviews
  console.log('.....seeding reviews')
  await Promise.all(await Review.bulkCreate(reviews))
  console.log(`-------> seeded ${reviews.length} reviews!`)

  console.log(`-----------> seeded successfully!`)
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

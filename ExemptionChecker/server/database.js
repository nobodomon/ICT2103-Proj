// bookshelf-app/server/db.js

// Import path module
const path = require('path')

// Get the location of database.sqlite file
const dbPath = path.resolve(__dirname, 'db/database.sqlite')
console.log(dbPath);
// Create connection to SQLite database
const knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: dbPath,
  },
  useNullAsDefault: true
})

// Create a table in the database called "Users"
knex.schema
  // Make sure no "Users" table exists
  // before trying to create new
  .hasTable('Users')
    .then((exists) => {
      if (!exists) {
        // If no "Users" table exists
        // create new, with "uid", "username", "password", "role"
        // and use "uid" as a primary identification
        // and increment "uid" with every new record (user)
        return knex.schema.createTable('Users', (table)  => {
          table.increments('uid').primary()
          table.string('username').unique()
          table.string('password')
          table.string('role')
        })
        .then(() => {
          // Log success message
          console.log('Table \'Users\' created')
        })
        .catch((error) => {
          console.error(`There was an error creating table: ${error}`)
        })
      }
    })
    .then(() => {
      // Log success message
      console.log('done')
    })
    .catch((error) => {
      console.error(`There was an error setting up the database: ${error}`)
    })

knex.schema
    .hasTable("Courses")
      .then((exists) => {
        if (!exists) {
          // If no Course table exists
          // create new, with "cid","course code", "course name"
          // and use "cid" as a primary identification
          // and increment "cid" with every new record (course)
          return knex.schema.createTable("Courses", (table)  => {
            table.increments('cid').primary()
            table.string("course code")
            table.string('course name')
          })
          .then(() => {
            console.log('Table \'Course\' created')
          })
          .catch((error) => {
            console.error(`There was an error creating table: ${error}`)
          })
        }
      })
      .then(() => {
        console.log('done')
      }).catch((error)=>{
        console.error(`There was an error setting up the database: ${error}`)
      })


// Just for debugging purposes:
// Log all data in "books" table
knex.select('*').from('Users')
  .then(data => console.log('data:', data))
  .catch(err => console.log(err))

knex.select("*").from("Courses")
  .then(data => console.log('data:', data))
  .catch(err => console.log(err))
// Export the database
module.exports = knex
// bookshelf-app/server/db.js

// Import path module
const path = require("path");

// Mongo Client

const { MongoClient } = require("mongodb");

// Connection URL

const url = "mongodb://localhost:27017";

const client = new MongoClient(url);

// Database Name

const dbName = "ExemptionChecker";

// Use connect method to connect to the server

async function main(){
    await client.connect();
    console.log("Connected successfully to server");
    const db = client.db(dbName);
}

main()
    .then(console.log)
    .catch(console.error)

// Export the db
module.exports = client.db(dbName);


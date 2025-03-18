const { Pool } = require("pg");

const env = require("dotenv");

env.config();

const database = new Pool({connectionString: process.env.POSTGRES_URL});

module.exports = database;
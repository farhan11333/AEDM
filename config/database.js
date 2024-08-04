const mysql = require('mysql2');
const env = require('dotenv');

env.config();

const { DB_HOST } = process.env;
const { DB_PORT } = process.env;
const { DB_DATABASE } = process.env;
const { DB_USERNAME } = process.env;
const { DB_PASSWORD } = process.env;

const mySqlConnection = mysql.createConnection({
  host: DB_HOST,
  user: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  port: DB_PORT,
  connectTimeout:60000,
  multipleStatements: true,
  timezone: '+00:00',
  typeCast: function castField(field, useDefaultTypeCasting) {
    // We only want to cast bit fields that have a single-bit in them. If the field
    // has more than one bit, then we cannot assume it is supposed to be a Boolean.
    if ((field.type === 'BIT') && (field.length === 1)) {
      const bytes = field.buffer();

      // A Buffer in Node represents a collection of 8-bit unsigned integers.
      // Therefore, our single "bit field" comes back as the bits '0000 0001',
      // which is equivalent to the number 1.
      return (bytes?.length > 0 ? bytes[0] === 1 : false);
    }

    return (useDefaultTypeCasting());
  },
});

module.exports.db = mySqlConnection;

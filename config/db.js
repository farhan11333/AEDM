
const moment = require('moment');

const { Types } = require('aws-sdk/clients/acm');
var mysql2 = require('mysql2/promise');


const env = require('dotenv');

env.config();

const { DB_HOST } = process.env;
const { DB_PORT } = process.env;
const { DB_DATABASE } = process.env;
const { DB_USERNAME } = process.env;
const { DB_PASSWORD } = process.env;

const pool = mysql2.createPool({
  connectionLimit: 35,
  host: DB_HOST,
  user: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  multipleStatements: true,
  dateStrings: true,
});
const electrosoftDB = {
  tables: {},
  sps: {

    addUser: 'sp_insert_user',
    getUserByCognitoId: 'sp_get_user_by_cognitoId',

  },
};


async function spExecute(sp, params = []) {
  try {
    const pool = await poolPromise;
    const rows = await pool.request();
    params.forEach((param) => {
      rows.input(param[0], param[1], param[2]);
    });
    const result = await rows.execute(sp);

    return [result.recordsets, null];
  } catch (err) {
    return [null, err.message];
  }
}
async function queryExecute(sp, params = []) {
  try {
    const pool = await poolPromise;
    const rows = await pool.request();
    const result = await rows.query(sp);

    return [result.recordsets, null];
  } catch (err) {
    return [null, err.message];
  }
}

async function spExecuteSingle(sp, params = []) {
  try {
    const pool = await poolPromise;
    const rows = await pool.request();
    params.forEach((param) => {
      rows.input(param[0], param[1], param[2]);
    });
    const result = await rows.execute(sp);

    return [result.recordset[0], null];
  } catch (err) {
    return [null, err.message];
  }
}

async function query(sql, params, multipleStatements = false, completeResponse = false) {
  // let connection = null;
  try {
    
    const [rows] = await pool.query(sql, params).Promise();

    return camelcaseKeys(rows);
  } catch (err) {
    console.log(err);
  }
}
async function querySingle(sql, params, multipleStatements = false) {
  const connection = null;
  try {
  
    const [rows] = await pool.query(sql, params);

    return rows;
  } catch (err) {
    //
    console.log(err);
  }
}
const createDevice = async (device) => {
  try {
    const [insertedResult] = await querySingle('CALL insert_device(?, ?)', [
      device.name,
      device.serialNumber,
     
    ]);

    const isSuccess = insertedResult.affectedRows > 0;

    return isSuccess
      ? [insertedResult[0], null]
      : [null, 'An error occurred in database while adding user'];
  } catch (err) {
    return [null, 'An unexpected error occurred while adding user'];
  }
};
const addDeviceData = async (data) => {
  try {
    const insertedResult = await querySingle('CALL insert_device_data(?, ?,?,?,?,?)', [
      data.temp1,
      data.temp2,
      data.status,
      data.alarm,
      data.output1,
      data.deviceId
     
    ]);
     
    const isSuccess = insertedResult.affectedRows>0

    return isSuccess
      ? [ insertedResult, null]
      : [null, 'An error occurred in database while adding data'];
  

    
  } catch (err) {
    return [null, 'An unexpected error occurred while adding data'];
  }
};
const getDeviceLogs = async (data) => {
  try {
    const logs = await querySingle('CALL get_all_device_logs()', [ ]);
     
    const isSuccess = !!logs

    return isSuccess
      ? [ logs[0], null]
      : [null, 'An error occurred in database while getting data'];
  

    
  } catch (err) {
    return [null, 'An unexpected error occurred while getting data'];
  }
};
module.exports = {
  spExecute,

  query,
  queryExecute,
  querySingle,
  spExecuteSingle,
  electrosoftDB,
  createDevice,
  addDeviceData,
  getDeviceLogs

};

'use strict';
const { parsed: env } = require('dotenv').config();

const accessKeyId = env.ACCESSKEYID;
const secretAccessKey = env.SECRETACCESSKEY;
const secretName = "Test";
var AWS = require('aws-sdk'),
	region = env.AWS_REGION;
AWS.config.update({
	accessKeyId,
	secretAccessKey,
	region
});
var client = new AWS.SecretsManager({
	region: region
});
const AWS_config = {
	ExecutionMachineArn: '',
	LoggerS3BucketArn: ''
};
const baseUrl = env.BASE_URL;


//To get Secrets from AWS secrets
async function getSecrets(key = null) {

	try {
		const result = await client.getSecretValue({ SecretId: secretName }).promise();
		var credentials = null;
		if ('SecretString' in result) {

			credentials = JSON.parse(result.SecretString);

		}
		return key === null ? credentials : credentials[key];
	}

	catch (err) {

		return null;

	}

}

module.exports = {
	DB_PREFIX: 'sb_',
	DB_DIALECT: 'mysql',
	DB_POOL_MIN_CONNECTIONS: 0,
	DB_POOL_MAX_CONNECTIONS: 110,
	DB_POOL_ACQUIRE: 60000,
	DB_POOL_IDLE: 1000,
	UI_BASE_URL: '',
	API_URLS,
	baseUrl,
	AWS_config,
	getSecrets
};

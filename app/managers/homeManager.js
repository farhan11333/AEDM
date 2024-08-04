const db = require("../../config/db");

const createDevice = async (params) => {
	try {
	 
	  const [newDevice, errorsFromDevice] = await db.createDevice(params);
	  if (errorsFromDevice) return [null, errorsFromDevice];
  
	  return [newDevice, null];
	} catch (err) {
	  return [null, 'An unexpected error occurred while Adding device'];
	}
  };
  const addDeviceData = async (params) => {
	try {
	 
	  const [newDeviceData, errorsFromDeviceData] = await db.addDeviceData(params);
	  if (errorsFromDeviceData) return [null, errorsFromDeviceData];
  
	  return [newDeviceData, null];
	} catch (err) {
	  return [null, 'An unexpected error occurred while Adding device data'];
	}
  };
  const getDeviceLogs = async () => {
	try {
	 
	  const [newDeviceData, errorsFromDeviceData] = await db.getDeviceLogs();
	  if (errorsFromDeviceData) return [null, errorsFromDeviceData];
  
	  return [newDeviceData, null];
	} catch (err) {
	  return [null, 'An unexpected error occurred while getting device data'];
	}
  };
module.exports = {
	createDevice,
	addDeviceData,
	getDeviceLogs
};

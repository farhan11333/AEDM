const router = require('express')();
const homeManager = require('../managers/homeManager')
const {
	 Response 
  } = require('../helpers/common');
router.post('/addDevice', async(req, res, next) => {
	const [result,error] = await homeManager.createDevice(req.body);
	if(error){

		res.status(200).json(Response('Error', error, false));
	}
	res.status(200).json(Response('device added successfully', result, true));
});
router.post('/addData', async(req, res, next) => {
	const [result,error] = await homeManager.addDeviceData(req.body);
	if(error){

		return res.status(200).json(Response('Error', error, false));
	}
	return res.status(200).json(Response('Data added successfully', result, true));
});
router.get('/allLogs', async(req, res, next) => {
	const [result,error] = await homeManager.getDeviceLogs();
	if(error){

		return res.status(200).json(Response('Error while fetching logs', {}, false));
	}
	return res.status(200).json(Response('Logs fetched successfully', result, true));
});
router.get('/view', async(req, res, next) => {
	const [result,error] = await homeManager.getLatestRecord();
	if(error){

		return res.status(200).json(Response('Error while fetching logs', {}, false));
	}
	res.render('record', { record: result });
});
module.exports = router;

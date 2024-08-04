const router = require('express')();

router.get('/', (req, res, next) => {
	res.status(200).send('pong');
});

router.post('/', (req, res, next) => {
	res.status(200).send(req.body);
});


module.exports = router;

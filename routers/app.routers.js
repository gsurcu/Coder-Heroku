const express = require('express');
const apiRoutes = require('./api/api.routes');
const extraRoutes = require('./extra.routers')
const { warnLog, infoLog } = require('../middlewares/logger');
const router = express.Router();


//Routes
router.use(infoLog)
router.use('/api', apiRoutes);

router.use('/', extraRoutes)

router.use('/*', warnLog);

module.exports = router;
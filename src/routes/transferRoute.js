const express = require('express');

//controllers
const transferController = require('../controllers/transferController');


//middlewares
const authMiddleware = require('../middlewares/authMiddleware')
const router = express.Router();

router.use(authMiddleware.protect)

router.post('/', transferController.transfer)


module.exports = router
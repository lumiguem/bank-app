const express = require('express');

//controllers
const userController = require('../controllers/userController');
// middlewares
const userMiddleware = require('../middlewares/userMiddleware')

const router = express.Router();

router.post('/signup', userController.signup)
router.post('/login', userMiddleware.validUser, userController.login)



// router.route('/')
//     .get(userController.findAll)
//     .post(userController.create)

// router.route('/:id')
//     .get(userController.findOne)
//     .patch(userController.update)
//     .delete(userController.delete)


module.exports = router;
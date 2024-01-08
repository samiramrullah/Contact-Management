const express = require('express')
const router = express.Router();
const checkAuth = require('../../../middleware/check-auth')

const userController = require('../../controllers/user')


router.get('/getuserdetails', checkAuth, userController.getuserdetails);

router.put('/updateuserdetails', checkAuth, userController.updateuserdetails);

router.get('/getallusers', checkAuth, userController.getallusers)

router.delete('/deleteuser', userController.deleteuser);

module.exports = router;
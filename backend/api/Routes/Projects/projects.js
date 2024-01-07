const express=require('express')
const router=express.Router();
const checkAuth = require('../../../middleware/check-auth');
const projectController=require('../../controllers/project')



router.post('/addproject', projectController.addproject);

router.get('/getprojectbyid/:id',projectController.getprojectbyid )

router.get('/getallprojects',projectController.getallprojects )

router.post('/addresource', checkAuth,projectController.addresource )

router.get('/projectdetails', checkAuth,projectController.projectdetails );

router.put('/updateprojectByid/:id', checkAuth,projectController.updateprojectByid )


module.exports = router
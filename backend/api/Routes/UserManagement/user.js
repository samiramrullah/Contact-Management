const express = require('express')
const router = express.Router();
const checkAuth = require('../../../middleware/check-auth')
const userSchema = require('../../../models/user')

router.get('/getuserdetails', checkAuth, async (req, res, next) => {
    try {
        const userId = req.userData.userId;
        const user = await userSchema.findById(userId).select('name email projectAllocated managerComment');
        if (!user) return res.status(404).json({ message: "User Not Found" })
        return res.status(200).json({user,message:"Data Successfully Fetched",status:true})
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/updateuserdetails', checkAuth, async (req, res, next) => {
    try {
      const userId = req.userData.userId;
      const { projectAllocated, name, email, phNumber, degination, description } = req.body;
  
      // Constructing the update object conditionally
      const updateFields = {};
      if (name) updateFields.name = name;
      if (email) updateFields.email = email;
      if (phNumber) updateFields.phNumber = phNumber;
      if (degination) updateFields.degination = degination;
      if (description) updateFields.description = description;
  
      if (projectAllocated) {
        updateFields.$push = { projectAllocated: { $each: projectAllocated } };
      }
  
      // Update the user document based on the constructed update object
      const user = await userSchema.findByIdAndUpdate(
        userId,
        updateFields,
        { new: true }
      );
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      return res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
router.get('/getallusers', checkAuth, async (req, res, next) => {
    try {
        const userId = req.userData;
        if (!userId || userId.email !== "samiramrullah@gmail.com") return res.status(401).json({ status: false, message: "Invalid Credentails" });
        const users = await userSchema.find().select('name email phNumber designation description projectAllocated managerComment')
        res.status(200).json({
            status: true,
            users,
            message: "Users Successfully Fetched"
        })
    } catch (error) {
        return res.status(401).json({ status: false, message: 'Failed to Get Users' });
    }
})

router.delete('/deleteuser', checkAuth, async (req, res, next) => {
    try {
        const userId = req.userData;
        if (!userId || userId.email !== "samiramrullah@gmail.com") return res.status(401).json({ status: false, message: "Unauthorized" });
        const _id = req.body._id
        const deletedUsers = await userSchema.findByIdAndDelete(_id)
        if (deletedUsers) {
            return res.status(200).json({
                status: true,
                message: "User Successfully Deleted",
            })
        }
        else {
            return res.status(404).json({
                status: false,
                message: "User doesn't exist",
            })
        }

    } catch (error) {
        return res.status(401).json({ status: false, message: 'Failed to Get Users' });
    }
})
module.exports = router;
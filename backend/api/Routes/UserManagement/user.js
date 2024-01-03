const express = require('express')
const router = express.Router();
const checkAuth = require('../../../middleware/check-auth')
const userSchema = require('../../../models/user')

router.get('/getuserdetails', checkAuth, async (req, res, next) => {
    try {
        const userId = req.userData.userId;
        const user = await userSchema.findById(userId).select('name email projectAllocated managerComment');
        if (!user) return res.status(404).json({ message: "User Not Found" })
        return res.status(200).json(user)

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

module.exports = router;
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const productSchema = require('../../../models/project');
const checkAuth = require('../../../middleware/check-auth');
const resourcesSchema = require('../../../models/user')

router.post('/addproject', async (req, res, next) => {
    try {
        const { name, startDate, budgetAllocated, state, description } = req.body;
        if (!name || !startDate || !state) return res.status(500).json({ status: false, message: 'Invalid Data' });
        const project = await productSchema.findOne({ name })
        if (project) return res.status(400).json({ status: false, message: "Project with same name exists" });
        const newProject = new productSchema({ _id: new mongoose.Types.ObjectId, name, startDate, budgetAllocated, state, description })
        await newProject.save();
        res.status(201).json({
            status: true,
            message: "Project Successfully Created",
        })

    } catch (error) {
        res.status(401).json({
            status: false,
            message: "Failed to create project"
        });
    }
});

router.get('/getallprojects', async (req, res, next) => {
    try {
        const products = await productSchema.find()
        if (products) return res.status(200).json({
            status: true,
            message: 'Projects Successfully Fetched',
            products
        });
        else return res.status(400).json({ status: false, message: 'No Products Found' });
    } catch (error) {
        res.status(401).json({
            status: false,
            message: "Failed to create project"
        });
    }
})

router.post('/addresource', checkAuth, async (req, res, next) => {
    try {
        const userId = req.userData;
        if (!userId || userId.email != "samiramrullah@gmail.com") return res.status(401).json({ status: false, message: "Invalid Credentails" });
        const { resourceId, projectId } = req.body;

        if (!resourceId || !projectId) return res.status(404).json({ status: false, message: 'Invalid Data' })
        const existingUser = await resourcesSchema.findById(resourceId);
        if (!existingUser) {
            return res.status(404).json({ status: false, message: 'User not found' });
        }
        const existingProject = await productSchema.findOne({ resources: resourceId });
        if (existingProject) {
            return res.status(400).json({ status: false, message: 'Resource already exists in the project' });
        }
        const updateFields = await productSchema.findOneAndUpdate(
            { _id: projectId },
            { $addToSet: { resources: resourceId } },
            { new: true }
        );

        const assignProject = await resourcesSchema.findOneAndUpdate(
            { _id: resourceId },
            { $addToSet: { projects: projectId } },
            { new: true }
        )

        if (!updateFields || !assignProject) {
            return res.status(404).json({ status: false, message: 'Error while adding resources' });
        }
        return res.status(200).json({
            status: true,
            message: "Resource added to project successfully",
        });

    } catch (error) {
        res.status(401).json({
            status: false,
            message: "Failed to Add Resource",
            error: error.message
        });
    }
})

router.get('/projectdetails', checkAuth, async (req, res, next) => {
    try {
        const projectDetails = await productSchema.find({})
            .populate({
                path: 'resources',
                model: 'Resources',
                select: '_id name email phNumber designation'
            });
        res.status(200).json(projectDetails);
    } catch (error) {
        res.status(401).json({
            status: false,
            message: "Failed to Get Project Details",
            error: error.message
        });
    }
});
module.exports = router
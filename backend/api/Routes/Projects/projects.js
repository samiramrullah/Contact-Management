const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const productSchema = require('../../../models/project');

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

router.post('/getallprojects', async (req, res, next) => {
    try {
        const products = await productSchema.find()
        if (products) return res.status(200).json(products);
        else return res.status(400).json({ status: false, message: 'No Products Found' });
    } catch (error) {
        res.status(401).json({
            status: false,
            message: "Failed to create project"
        });
    }
})

module.exports = router
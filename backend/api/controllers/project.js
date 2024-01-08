const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const productSchema = require('../../models/project');

const resourcesSchema = require('../../models/user')
exports.addproject = async (req, res, next) => {
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
};

exports.getprojectbyid = async (req, res, next) => {
    try {
        const id = req.params.id;
        const project = await productSchema.findById(id).populate({
            path: 'resources',
            model: 'Resources',
            select: '_id name email phNumber designation'
        });
        return res.status(200).json({
            status: true,
            message: 'Project Successfully feteched',
            project
        })
    } catch (error) {
        res.status(401).json({
            status: false,
            message: "Failed to fetch product"
        });
    }
}

exports.getallprojects = async (req, res, next) => {
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
}

exports.addresource = async (req, res, next) => {
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
}

exports.projectdetails = async (req, res, next) => {
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
}

exports.updateprojectByid = async (req, res, next) => {
    try {
        const {id} = req.params;
        const { name, startDate, budgetAllocated, state, description } = req.body;
        const updateFields = {};
        if (name) updateFields.name = name;
        if (startDate) updateFields.startDate = startDate;
        if (budgetAllocated) updateFields.budgetAllocated = budgetAllocated;
        if (state) updateFields.state = state;
        if (description) updateFields.description = description;
        const project = await productSchema.findByIdAndUpdate(
            id,
            updateFields,
            { new: true }
        )
        if (!project) return res.status(404).json({ status: false, message: 'Project Not Found' });
        return res.status(200).json({
            status: true,
            message: 'Project Updated Successfully'
        })
    } catch (error) {
        res.status(401).json({
            status: false,
            message: "Failed to Update Project Details",
            error: error.message
        });
    }
}
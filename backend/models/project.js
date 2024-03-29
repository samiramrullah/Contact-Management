const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    name: { type: String, require: true },
    startDate: { type: String, require: true },
    budgetAllocated: { type: Number, require: false },
    state: { type: String, require: true },
    description: { type: String, require: false },
    resources:[{type:mongoose.Schema.Types.ObjectId,ref:'Resources'}]
})

module.exports = mongoose.model('Project', projectSchema);
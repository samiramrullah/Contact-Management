const mongoose = require('mongoose');

const resourcesSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    name: { type: String, require: true },
    email: { type: String, require: true },
    password:{type:String,require:true},
    phNumber: { type: String, require: false },
    designation: { type: String, require: false },
    description: { type: String, require: false },
    projects: { type:mongoose.Schema.Types.ObjectId,ref:'Project' },
    managerComment: { type: Array, require: false },
})

module.exports=mongoose.model('Resources',resourcesSchema);
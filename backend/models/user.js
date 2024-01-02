const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    name: { type: String, require: true },
    email: { type: String, require: true },
    password:{type:String,require:true},
    phNumber: { type: String, require: false },
    degination: { type: String, require: false },
    description: { type: String, require: false },
    projectAllocated: { type: Array, require: false },
    managerComment: { type: Array, require: false },
})

module.exports=mongoose.model('Users',userSchema);
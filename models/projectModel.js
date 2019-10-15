const mongoose = require("mongoose");


const projectSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    budget: {
        type: String,
        required: true
    },
    expenses: {
        type: Object,
        required: false
    },
    category: {
        type: Object,
        required: true
    }
});


module.exports = Project = mongoose.model("Project", projectSchema);
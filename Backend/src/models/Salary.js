const mongoose = require("mongoose");

const salarySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    salary: {
        type: Number,
        required: true,
    },

    bonus: {
        type: Number,
        required: true,
    },
}, { timestamps: true });

module.exports = mongoose.model(
    "Salary",
    salarySchema
);
const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },

    name: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },

    phone: {
        type: String,
        required: true,
    },

    department: {
        type: String,
        required: true,
    },

    designation: {
        type: String,
        required: true,
    },

    salary: {
        type: Number,
        required: true,
    },

}, {
    timestamps: true,
});

const Employee = mongoose.model(
    "Employee",
    employeeSchema
);

module.exports = Employee;
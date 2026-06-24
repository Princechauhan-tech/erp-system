const mongoose = require("mongoose");

const leaveSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    leaveType: {
        type: String,
        required: true,
    },

    date: {
        type: String,
        required: true,
    },

    status: {
        type: String,
        default: "Pending",
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model(
    "Leave",
    leaveSchema
);
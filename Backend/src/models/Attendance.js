const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({

    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
        required: true,
    },

    date: {
        type: Date,
        default: Date.now,
    },

    status: {
        type: String,
        enum: [
            "Present",
            "Absent",
            "Leave",
        ],
        default: "Present",
        required: true,
    },

}, {
    timestamps: true,
});

const Attendance = mongoose.model(
    "Attendance",
    attendanceSchema
);

module.exports = Attendance;
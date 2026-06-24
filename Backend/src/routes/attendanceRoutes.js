const express = require("express");

const router = express.Router();

const authMiddleware =
    require("../middleware/authMiddleware");

const roleMiddleware =
    require("../middleware/roleMiddleware");

const {
    markAttendance,
    getAttendance
} = require(
    "../controllers/attendanceController"
);


// MARK ATTENDANCE
router.post(
    "/mark",
    authMiddleware,
    roleMiddleware(
        "Admin",
        "HR"
    ),
    markAttendance
);


// GET ATTENDANCE
router.get(
    "/all",
    authMiddleware,
    getAttendance
);

module.exports = router;
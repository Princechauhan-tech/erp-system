const express = require("express");

const router = express.Router();

const {
    applyLeave,
    getLeaves,
    updateLeaveStatus,
} = require(
    "../controllers/leaveController"
);


// GET ALL LEAVES
router.get(
    "/all",
    getLeaves
);


// APPLY LEAVE
router.post(
    "/apply",
    applyLeave
);


// UPDATE STATUS
router.put(
    "/update/:id",
    updateLeaveStatus
);


module.exports = router;
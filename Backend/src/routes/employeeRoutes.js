const express = require("express");

const router = express.Router();

const authMiddleware = require(
    "../middleware/authMiddleware"
);

const roleMiddleware = require(
    "../middleware/roleMiddleware"
);

const {
    addEmployee,
    getEmployees,
    getEmployee,
    updateEmployee,
    deleteEmployee
} = require(
    "../controllers/employeeController"
);


// ADD EMPLOYEE
router.post(
    "/add",
    authMiddleware,
    roleMiddleware("Admin"),
    addEmployee
);


// GET ALL EMPLOYEES
router.get(
    "/all",
    authMiddleware,
    roleMiddleware(
        "Admin",
        "HR"
    ),
    getEmployees
);


// GET SINGLE EMPLOYEE
router.get(
    "/:id",
    authMiddleware,
    roleMiddleware(
        "Admin",
        "HR"
    ),
    getEmployee
);


// UPDATE EMPLOYEE
router.put(
    "/update/:id",
    authMiddleware,
    roleMiddleware("Admin"),
    updateEmployee
);


// DELETE EMPLOYEE
router.delete(
    "/delete/:id",
    authMiddleware,
    roleMiddleware("Admin"),
    deleteEmployee
);


module.exports = router;
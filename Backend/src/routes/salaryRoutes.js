const express = require("express");

const router = express.Router();

const {
    addSalary,
    getSalaries,
    deleteSalary,
} = require(
    "../controllers/salaryController"
);

router.post("/add", addSalary);

router.get("/all", getSalaries);

router.delete(
    "/delete/:id",
    deleteSalary
);

module.exports = router;
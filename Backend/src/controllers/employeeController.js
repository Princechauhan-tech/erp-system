const Employee = require("../models/Employee");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

// ADD EMPLOYEE
const addEmployee = async(req, res) => {

    try {

        const {
            name,
            email,
            phone,
            department,
            designation,
            salary
        } = req.body;

        const existingUser =
            await User.findOne({ email });

        if (existingUser) {

            return res.status(400).json({
                success: false,
                message: "Email already exists"
            });

        }

        const hashedPassword =
            await bcrypt.hash(
                "123456",
                10
            );

        const user =
            await User.create({

                name,
                email,

                password: hashedPassword,

                role: "Employee"

            });

        const employee =
            await Employee.create({

                user: user._id,

                name,
                email,
                phone,

                department,

                designation,

                salary

            });

        res.status(201).json({

            success: true,

            message: "Employee Added Successfully",

            employee

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

// GET ALL EMPLOYEES
const getEmployees = async(req, res) => {

    try {

        const employees =
            await Employee.find();

        res.status(200).json({
            success: true,
            employees
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};


// GET SINGLE EMPLOYEE
const getEmployee = async(req, res) => {

    try {

        const employee =
            await Employee.findById(
                req.params.id
            );

        if (!employee) {

            return res.status(404).json({
                success: false,
                message: "Employee Not Found"
            });

        }

        res.status(200).json({
            success: true,
            employee
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};


// UPDATE EMPLOYEE
const updateEmployee = async(req, res) => {

    try {

        const employee =
            await Employee.findByIdAndUpdate(
                req.params.id,
                req.body, {
                    new: true
                }
            );

        if (!employee) {

            return res.status(404).json({
                success: false,
                message: "Employee Not Found"
            });

        }

        res.status(200).json({
            success: true,
            message: "Employee Updated",
            employee
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};


// DELETE EMPLOYEE
const deleteEmployee = async(req, res) => {

    try {

        const employee =
            await Employee.findByIdAndDelete(
                req.params.id
            );

        if (!employee) {

            return res.status(404).json({
                success: false,
                message: "Employee Not Found"
            });

        }

        res.status(200).json({
            success: true,
            message: "Employee Deleted"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};


module.exports = {
    addEmployee,
    getEmployees,
    getEmployee,
    updateEmployee,
    deleteEmployee
};
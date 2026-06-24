const Salary = require("../models/Salary");


// ADD SALARY
exports.addSalary = async(req, res) => {

    try {

        const { name, salary, bonus } =
        req.body;

        const newSalary = await Salary.create({
            name,
            salary,
            bonus,
        });

        res.status(201).json({
            success: true,
            salary: newSalary,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};


// GET ALL SALARIES
exports.getSalaries = async(
    req,
    res
) => {

    try {

        const salaries =
            await Salary.find();

        res.status(200).json({
            success: true,
            salaries,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};


// DELETE SALARY
exports.deleteSalary = async(
    req,
    res
) => {

    try {

        await Salary.findByIdAndDelete(
            req.params.id
        );

        res.status(200).json({
            success: true,
            message: "Deleted Successfully",
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};
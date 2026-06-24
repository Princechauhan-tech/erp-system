const Employee = require("../models/Employee");
const Attendance = require("../models/Attendance");
const Leave = require("../models/Leave");
const Salary = require("../models/Salary");

const getDashboardStats =
    async(req, res) => {

        try {

            const totalEmployees =
                await Employee.countDocuments();

            const totalAttendance =
                await Attendance.countDocuments();

            const presentAttendance =
                await Attendance.countDocuments({
                    status: "Present",
                });

            const totalLeaves =
                await Leave.countDocuments();

            const totalSalaries =
                await Salary.countDocuments();

            const pendingLeaves =
                await Leave.countDocuments({
                    status: "Pending",
                });

            const approvedLeaves =
                await Leave.countDocuments({
                    status: "Approved",
                });

            const attendancePercentage =

                totalAttendance === 0

                ?
                0

                :

                Math.round(
                    (
                        presentAttendance /
                        totalAttendance
                    ) *
                    100
                );

            res.status(200).json({

                success: true,

                stats: {

                    totalEmployees,

                    totalAttendance,

                    presentAttendance,

                    attendancePercentage,

                    totalLeaves,

                    totalSalaries,

                    pendingLeaves,

                    approvedLeaves,

                },

            });

        } catch (error) {

            res.status(500).json({

                success: false,

                message: error.message,

            });

        }

    };

module.exports = {
    getDashboardStats,
};
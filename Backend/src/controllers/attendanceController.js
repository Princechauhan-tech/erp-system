const Attendance = require("../models/Attendance");
const Employee = require("../models/Employee");


// MARK ATTENDANCE

const markAttendance = async(req, res) => {

    try {

        const { employee, status } = req.body;

        const attendance = await Attendance.create({
            employee,
            status,
        });

        const populatedAttendance =
            await Attendance.findById(attendance._id)
            .populate("employee");

        res.status(201).json({
            success: true,
            message: "Attendance Marked",
            attendance: populatedAttendance,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};


// GET ATTENDANCE

const getAttendance = async(req, res) => {

    try {

        const role = req.user.role;

        let attendance = [];


        // ADMIN + HR

        if (
            role === "Admin" ||
            role === "HR"
        ) {

            attendance = await Attendance.find()
                .populate("employee")
                .sort({ createdAt: -1 });

        }


        // EMPLOYEE
        else if (role === "Employee") {

            const employeeData =
                await Employee.findOne({
                    email: req.user.email
                });

            if (!employeeData) {

                return res.status(404).json({
                    success: false,
                    message: "Employee profile not found"
                });

            }

            attendance = await Attendance.find({
                    employee: employeeData._id
                })
                .populate("employee")
                .sort({ createdAt: -1 });

        }


        const total = attendance.length;

        const present =
            attendance.filter(
                (a) => a.status === "Present"
            ).length;

        const absent =
            attendance.filter(
                (a) => a.status === "Absent"
            ).length;

        const leave =
            attendance.filter(
                (a) => a.status === "Leave"
            ).length;


        const attendancePercentage =
            total > 0 ?
            ((present / total) * 100).toFixed(2) :
            0;


        const analytics = [

            {
                name: "Present",
                value: present
            },

            {
                name: "Absent",
                value: absent
            },

            {
                name: "Leave",
                value: leave
            }

        ];


        res.status(200).json({

            success: true,

            attendance,

            analytics,

            stats: {
                total,
                present,
                absent,
                leave,
                attendancePercentage
            }

        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};


module.exports = {
    markAttendance,
    getAttendance
};
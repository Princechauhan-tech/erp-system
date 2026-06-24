const Leave =
    require("../models/Leave");


// APPLY

const applyLeave =
    async(req, res) => {

        try {

            const {
                name,
                leaveType,
                date,
            } = req.body;

            const leave =
                await Leave.create({

                    name,
                    leaveType,
                    date,

                });

            res.status(201).json({

                success: true,

                leave,

            });

        } catch (error) {

            res.status(500).json({

                success: false,

                message: error.message,

            });

        }

    };


// GET

const getLeaves =
    async(req, res) => {

        try {

            const leaves =
                await Leave.find();


            const pending =
                leaves.filter(
                    (l) =>
                    l.status === "Pending"
                ).length;


            const approved =
                leaves.filter(
                    (l) =>
                    l.status === "Approved"
                ).length;


            const rejected =
                leaves.filter(
                    (l) =>
                    l.status === "Rejected"
                ).length;


            const analytics = [

                {
                    name: "Pending",
                    value: pending,
                },

                {
                    name: "Approved",
                    value: approved,
                },

                {
                    name: "Rejected",
                    value: rejected,
                },

            ];


            res.status(200).json({

                success: true,

                leaves,

                stats: {

                    pending,

                    approved,

                    rejected,

                },

                analytics,

            });

        } catch (error) {

            res.status(500).json({

                success: false,

                message: error.message,

            });

        }

    };


// UPDATE

const updateLeaveStatus =
    async(
        req,
        res
    ) => {

        try {

            const {
                status,
            } = req.body;

            await Leave.findByIdAndUpdate(
                req.params.id, {
                    status,
                }
            );

            res.status(200).json({

                success: true,

                message: "Leave Updated",

            });

        } catch (error) {

            res.status(500).json({

                success: false,

                message: error.message,

            });

        }

    };


module.exports = {

    applyLeave,

    getLeaves,

    updateLeaveStatus,

};
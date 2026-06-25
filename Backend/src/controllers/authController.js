const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// ================= REGISTER =================

exports.register = async(req, res) => {

    try {

        const {
            name,
            email,
            password,
            role,
        } = req.body;


        // CHECK USER

        const userExists =
            await User.findOne({
                email,
            });

        if (userExists) {

            return res.status(400).json({

                success: false,
                message: "User already exists",

            });

        }


        // HASH PASSWORD

        const hashedPassword =
            await bcrypt.hash(
                password,
                10
            );


        // CREATE USER

        const user =
            await User.create({

                name,
                email,

                password: hashedPassword,

                role,

            });


        // RESPONSE

        res.status(201).json({

            success: true,

            message: "User Registered Successfully",

            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },

        });

    } catch (error) {

        res.status(500).json({

            success: false,
            message: error.message,

        });

    }

};



// ================= LOGIN =================

exports.login =
    async(req, res) => {

        try {

            const {
                email,
                password,
                role,
            } = req.body;


            // FIND USER

            const user =
                await User.findOne({

                    email: email
                        .trim()
                        .toLowerCase(),

                });


            if (!user) {

                return res.status(400).json({

                    success: false,
                    message: "User not found",

                });

            }


            // PASSWORD CHECK

            const isMatch =
                await bcrypt.compare(
                    password,
                    user.password
                );

            if (!isMatch) {

                return res.status(400).json({

                    success: false,
                    message: "Invalid Password",

                });

            }


            // ROLE ACCESS RULES

            const accessRules = {

                Admin: [
                    "Admin",
                    "HR",
                    "Employee",
                    "Project",
                ],

                HR: [
                    "HR",
                    "Employee",
                ],

                Employee: [
                    "Employee",
                ],

                Project: [
                    "Project",
                ],

            };


            // ACCESS CHECK

            // CHECK ACCESS

            if (
                role &&
                (!accessRules[user.role] ||
                    !accessRules[user.role].includes(role)
                )
            ) {

                return res.status(403).json({

                    success: false,

                    message: `You are ${user.role}, not ${role}`

                });

            }

            const token =
                jwt.sign(

                    {

                        id: user._id,
                        name: user.name,
                        email: user.email,
                        role: user.role,

                    },

                    process.env.JWT_SECRET,

                    {
                        expiresIn: "1d",
                    }

                );


            // RESPONSE

            res.status(200).json({

                success: true,

                message: "Login Successful",

                token,

                user: {

                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,

                },

            });

        } catch (error) {

            res.status(500).json({

                success: false,
                message: error.message,

            });

        }

    };



// ================= PROFILE =================

exports.getProfile =
    async(req, res) => {

        try {

            const user =
                await User
                .findById(
                    req.user.id
                )
                .select(
                    "-password"
                );

            res.status(200).json({

                success: true,
                user,

            });

        } catch (error) {

            res.status(500).json({

                success: false,
                message: error.message,

            });

        }

    };
const express = require("express");

const router = express.Router();

const authController = require("../controllers/authController");

const authMiddleware = require(
    "../middleware/authMiddleware"
);

const roleMiddleware = require(
    "../middleware/roleMiddleware"
);


// ================= REGISTER =================
router.post(
    "/register",
    authController.register
);


// ================= LOGIN =================
router.post(
    "/login",
    authController.login
);


// ================= PROFILE =================
router.get(
    "/profile",
    authMiddleware,
    authController.getProfile
);


// ================= ADMIN ROUTE =================
router.get(
    "/admin",
    authMiddleware,
    roleMiddleware("Admin"),
    (req, res) => {

        res.status(200).json({
            success: true,
            message: "Welcome Admin"
        });

    }
);


module.exports = router;
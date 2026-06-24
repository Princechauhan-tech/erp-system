const express = require("express");
const cors = require("cors");

require("dotenv").config();

const connectDB = require(
    "./src/config/db"
);

const authRoutes = require(
    "./src/routes/authRoutes"
);

const employeeRoutes = require(
    "./src/routes/employeeRoutes"
);

const attendanceRoutes = require(
    "./src/routes/attendanceRoutes"
);

const leaveRoutes = require(
    "./src/routes/leaveRoutes"
);

const salaryRoutes = require(
    "./src/routes/salaryRoutes"
);

const dashboardRoutes = require(
    "./src/routes/dashboardRoutes"
);

const app = express();


// DATABASE CONNECT
connectDB();


// MIDDLEWARE
app.use(cors());

app.use(express.json());


// ROOT ROUTE
app.get("/", (req, res) => {

    res.send("ERP Backend Running...");

});


// AUTH ROUTES
app.use(
    "/api/auth",
    authRoutes
);


// EMPLOYEE ROUTES
app.use(
    "/api/employees",
    employeeRoutes
);


// ATTENDANCE ROUTES
app.use(
    "/api/attendance",
    attendanceRoutes
);


// LEAVE ROUTES
app.use(
    "/api/leaves",
    leaveRoutes
);


// SALARY ROUTES
app.use(
    "/api/salaries",
    salaryRoutes
);


// DASHBOARD ROUTES
app.use(
    "/api/dashboard",
    dashboardRoutes
);


// SERVER
app.listen(process.env.PORT, () => {

    console.log(
        `Server Running On Port ${process.env.PORT}`
    );

});
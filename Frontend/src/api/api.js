import axios from "axios";

const API = axios.create({
    baseURL: "https://erp-system-5cp9.onrender.com/api",
});


// TOKEN AUTO ATTACH

API.interceptors.request.use(

    (req) => {

        const token =
            localStorage.getItem("token");

        if (token) {

            req.headers.Authorization =
                `Bearer ${token}`;

        }

        return req;

    },

    (error) => {

        return Promise.reject(error);

    }

);


// ================= AUTH =================

export const loginUser = (data) =>

    API.post("/auth/login", data);


// ================= DASHBOARD =================

export const getDashboardStats = () =>

    API.get("/dashboard/stats");


// ================= EMPLOYEES =================

export const getEmployees = () =>

    API.get("/employees/all");


export const addEmployee = (data) =>

    API.post("/employees/add", data);


// ================= ATTENDANCE =================

export const getAttendance = () =>

    API.get("/attendance/all");


export const markAttendance = (data) =>

    API.post("/attendance/mark", data);


export const updateAttendance = (
        id,
        data
    ) =>

    API.put(
        `/attendance/update/${id}`,
        data
    );


// ================= LEAVES =================

export const getLeaves = () =>

    API.get("/leaves/all");


export const applyLeave = (data) =>

    API.post("/leaves/apply", data);


export const updateLeaveStatus = (
        id,
        data
    ) =>

    API.put(
        `/leaves/update/${id}`,
        data
    );


// ================= SALARY =================

export const getSalaries = () =>

    API.get("/salaries/all");


export const addSalary = (data) =>

    API.post("/salaries/add", data);
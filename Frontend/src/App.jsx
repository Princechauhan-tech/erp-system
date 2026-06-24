import {
BrowserRouter,
Routes,
Route,
Navigate,
} from "react-router-dom";

import {
ToastContainer,
} from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import Login from "./pages/Login";

import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import Attendance from "./pages/Attendance";
import Payroll from "./pages/Payroll";
import Leave from "./pages/Leave";
import Projects from "./pages/Projects";
import Reports from "./pages/Reports";

import Layout from "./components/Layout";

function App(){

return(

<BrowserRouter>

<ToastContainer
position="top-right"
/>

<Routes>

<Route
path="/"
element={<Login/>}
/>

<Route
element={<Layout/>}
>

<Route
path="/dashboard"
element={<Dashboard/>}
/>

<Route
path="/employees"
element={<Employees/>}
/>

<Route
path="/attendance"
element={<Attendance/>}
/>

<Route
path="/leave"
element={<Leave/>}
/>

<Route
path="/payroll"
element={<Payroll/>}
/>

<Route
path="/projects"
element={<Projects/>}
/>

<Route
path="/reports"
element={<Reports/>}
/>

</Route>

<Route
path="*"
element={
<Navigate
to="/"
/>
}
/>

</Routes>

</BrowserRouter>

);

}

export default App;
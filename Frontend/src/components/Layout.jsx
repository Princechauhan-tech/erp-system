import {
Box,
} from "@mui/material";

import {
Outlet,
} from "react-router-dom";

import {
useState,
} from "react";

import Sidebar from "./Sidebar";
import Header from "./Header";

function Layout() {

const [mobileOpen,setMobileOpen]=
useState(false);

const [darkMode,setDarkMode]=
useState(false);

const handleDrawerToggle=()=>{

setMobileOpen(
!mobileOpen
);

};

const toggleDarkMode=()=>{

setDarkMode(
!darkMode
);

};

return(

<Box
sx={{
display:"flex",
minHeight:"100vh",
}}
>

<Sidebar
mobileOpen={
mobileOpen
}
handleDrawerToggle={
handleDrawerToggle
}
/>

<Box
sx={{
flexGrow:1,
display:"flex",
flexDirection:"column",
bgcolor:
darkMode
?
"#0f172a"
:
"#f8fafc",
transition:"0.3s",
}}
>

<Header
handleDrawerToggle={
handleDrawerToggle
}
darkMode={
darkMode
}
toggleDarkMode={
toggleDarkMode
}
/>

<Box
sx={{
p:3,
flexGrow:1,
}}
>

<Outlet/>

</Box>

</Box>

</Box>

);

}

export default Layout;
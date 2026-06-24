import {
Drawer,
List,
ListItemButton,
ListItemIcon,
ListItemText,
Typography,
Button,
Box,
} from "@mui/material";

import {
useNavigate,
useLocation,
} from "react-router-dom";

import {
useTheme,
} from "@mui/material/styles";

import useMediaQuery from "@mui/material/useMediaQuery";

import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EventNoteIcon from "@mui/icons-material/EventNote";
import PaymentsIcon from "@mui/icons-material/Payments";
import FolderIcon from "@mui/icons-material/Folder";
import AssessmentIcon from "@mui/icons-material/Assessment";
import LogoutIcon from "@mui/icons-material/Logout";

const drawerWidth = 240;

function Sidebar({
mobileOpen,
handleDrawerToggle,
}) {

const navigate =
useNavigate();

const location =
useLocation();

const theme =
useTheme();

const isMobile =
useMediaQuery(
theme.breakpoints.down(
"md"
)
);


// LOGIN ROLE
const role =
localStorage.getItem(
"loginRole"
);


// MENUS
const menuItems = [

{
name:"Dashboard",
path:"/dashboard",
icon:<DashboardIcon/>,
roles:[
"Admin",
],
},

{
name:"Employees",
path:"/employees",
icon:<PeopleIcon/>,
roles:[
"Admin",
"HR",
],
},

{
name:"Attendance",
path:"/attendance",
icon:<AccessTimeIcon/>,
roles:[
"Admin",
"HR",
"Employee",
],
},

{
name:"Leave",
path:"/leave",
icon:<EventNoteIcon/>,
roles:[
"Admin",
"HR",
"Employee",
],
},

{
name:"Payroll",
path:"/payroll",
icon:<PaymentsIcon/>,
roles:[
"Admin",
"HR",
],
},

{
name:"Projects",
path:"/projects",
icon:<FolderIcon/>,
roles:[
"Admin",
"Project",
],
},

{
name:"Reports",
path:"/reports",
icon:<AssessmentIcon/>,
roles:[
"Admin",
],
},

];


// FILTER
const filteredMenus =
menuItems.filter(
(item)=>
item.roles.includes(
role
)
);


// LOGOUT
const handleLogout=()=>{

localStorage.clear();

navigate("/");

};

return(

<Drawer

variant={
isMobile
?
"temporary"
:
"permanent"
}

open={
isMobile
?
mobileOpen
:
true
}

onClose={
handleDrawerToggle
}

sx={{

width:
drawerWidth,

flexShrink:0,

"& .MuiDrawer-paper":{

width:
drawerWidth,

boxSizing:
"border-box",

backgroundColor:
"#0f172a",

color:
"white",

display:"flex",

},

}}

>

<Typography

variant="h5"

sx={{

p:3,

fontWeight:"bold",

textAlign:"center",

}}

>

ERP SYSTEM

</Typography>


<List
sx={{
flexGrow:1
}}
>

{

filteredMenus.map(

(item)=>(

<ListItemButton

key={
item.path
}

selected={

location.pathname
===

item.path

}

onClick={()=>{

navigate(
item.path
);

if(
isMobile
){

handleDrawerToggle();

}

}}

sx={{

mx:1,

borderRadius:2,

mb:1,

"&.Mui-selected":{

backgroundColor:
"#2563eb",

},

"&.Mui-selected:hover":{

backgroundColor:
"#1d4ed8",

},

}}

>

<ListItemIcon
sx={{
color:"white",
minWidth:40,
}}
>

{item.icon}

</ListItemIcon>


<ListItemText

primary={
item.name
}

/>

</ListItemButton>

)

)

}

</List>


<Box>

<Button

fullWidth

variant="contained"

color="error"

startIcon={
<LogoutIcon/>
}

sx={{
m:2,
width:"calc(100% - 32px)"
}}

onClick={
handleLogout
}

>

Logout

</Button>

</Box>

</Drawer>

);

}

export default Sidebar;
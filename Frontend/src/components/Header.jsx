import { useState } from "react";

import {
AppBar,
Toolbar,
Typography,
Box,
Avatar,
IconButton,
TextField,
Menu,
MenuItem,
Dialog,
DialogTitle,
DialogContent,
Switch,
} from "@mui/material";

import {
useNavigate,
} from "react-router-dom";

import NotificationsIcon from "@mui/icons-material/Notifications";
import MenuIcon from "@mui/icons-material/Menu";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

function Header({
handleDrawerToggle,
darkMode,
toggleDarkMode,
}) {

const navigate=
useNavigate();

const role=
localStorage.getItem("role");

const [anchorEl,setAnchorEl]=
useState(null);

const [profileAnchor,setProfileAnchor]=
useState(null);

const [profileOpen,setProfileOpen]=
useState(false);

const [settingOpen,setSettingOpen]=
useState(false);

const userData={

Admin:{
name:"Admin",
email:"admin@gmail.com",
},

HR:{
name:"HR Manager",
email:"hr@gmail.com",
},

Project:{
name:"Project Manager",
email:"project@gmail.com",
},

Employee:{
name:"Employee",
email:"employee@gmail.com",
},

};

const user=
userData[role];

const handleNotificationClick=
(e)=>{

setAnchorEl(
e.currentTarget
);

};

const handleClose=
()=>{

setAnchorEl(null);

};

const handleProfileClick=
(e)=>{

setProfileAnchor(
e.currentTarget
);

};

const handleProfileClose=
()=>{

setProfileAnchor(null);

};

const openProfile=
()=>{

setProfileOpen(
true
);

handleProfileClose();

};

const openSettings=
()=>{

setSettingOpen(
true
);

handleProfileClose();

};

const handleLogout=
()=>{

localStorage.clear();

navigate("/");

};

return(

<AppBar
position="static"
sx={{
bgcolor:
darkMode
?
"#1e293b"
:
"#fff",

color:
darkMode
?
"#fff"
:
"#000",
}}
>

<Toolbar>

<IconButton
onClick={
handleDrawerToggle
}
sx={{
display:{
xs:"block",
md:"none",
},
}}
>

<MenuIcon/>

</IconButton>

<Typography
variant="h6"
fontWeight="bold"
>

ERP Dashboard

</Typography>

<Box sx={{flexGrow:1}}/>

<TextField
size="small"
placeholder="Search..."
sx={{
mr:2,
width:{
xs:120,
md:250,
},
}}
/>

<IconButton
onClick={
toggleDarkMode
}
>

{
darkMode
?
<LightModeIcon/>
:
<DarkModeIcon/>
}

</IconButton>

<IconButton
onClick={
handleNotificationClick
}
>

<NotificationsIcon/>

</IconButton>

<Menu
anchorEl={anchorEl}
open={
Boolean(anchorEl)
}
onClose={
handleClose
}
>

<MenuItem>
New Employee Joined
</MenuItem>

<MenuItem>
Leave Pending
</MenuItem>

<MenuItem>
Payroll Generated
</MenuItem>

</Menu>

<Avatar
sx={{
ml:2,
cursor:"pointer",
}}
onClick={
handleProfileClick
}
>

{
user?.name?.charAt(0)
}

</Avatar>

<Menu
anchorEl={
profileAnchor
}
open={
Boolean(
profileAnchor
)
}
onClose={
handleProfileClose
}
>

<MenuItem
onClick={
openProfile
}
>
My Profile
</MenuItem>

<MenuItem
onClick={
openSettings
}
>
Settings
</MenuItem>


<MenuItem
onClick={
handleLogout
}
sx={{
color:"red",
}}
>

Logout

</MenuItem>

</Menu>

<Dialog
open={
profileOpen
}
onClose={()=>
setProfileOpen(false)
}
>

<DialogTitle>

My Profile

</DialogTitle>

<DialogContent>

<Typography>

Name:
{" "}
{
user?.name
}

</Typography>

<Typography>

Email:
{" "}
{
user?.email
}

</Typography>

<Typography>

Role:
{" "}
{
role
}

</Typography>

</DialogContent>

</Dialog>

<Dialog
open={
settingOpen
}
onClose={()=>
setSettingOpen(false)
}
>

<DialogTitle>

Settings

</DialogTitle>

<DialogContent>

<Box
display="flex"
gap={2}
>

<Typography>

Dark Mode

</Typography>

<Switch
checked={
darkMode
}
onChange={
toggleDarkMode
}
/>

</Box>

</DialogContent>

</Dialog>

</Toolbar>

</AppBar>

);

}

export default Header;
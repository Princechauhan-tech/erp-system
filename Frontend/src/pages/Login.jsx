import {
loginUser,
} from "../api/api";

import { useState } from "react";

import {
Box,
Card,
CardContent,
Typography,
TextField,
Button,
MenuItem,
} from "@mui/material";

import axios from "axios";

import {
useNavigate,
} from "react-router-dom";

function Login() {

const navigate =
useNavigate();

const [email,setEmail] =
useState("");

const [password,setPassword] =
useState("");

const [role,setRole] =
useState("Admin");

const handleLogin = async () => {

try{

const res =
await axios.post(
"https://erp-system-5cp9.onrender.com/api/auth/login",
{
email,
password,
role,
}
);


localStorage.setItem(
"token",
res.data.token
);


// REAL ROLE
localStorage.setItem(
"userRole",
res.data.user.role
);


// CURRENT LOGIN ROLE
localStorage.setItem(
"loginRole",
role
);


localStorage.setItem(
"user",
JSON.stringify(
res.data.user
)
);

alert(
`Login Success as ${role}`
);


// ROLE BASED REDIRECT

switch(role){

case "Admin":
navigate("/dashboard");
break;

case "HR":
navigate("/employees");
break;

case "Employee":
navigate("/attendance");
break;

case "Project":
navigate("/projects");
break;

default:
navigate("/dashboard");

}

}

catch(error){

alert(
error.response?.data?.message
||
"Login Failed"
);

}

};

return(

<Box
sx={{
height:"100vh",
display:"flex",
justifyContent:"center",
alignItems:"center",
background:"#0f172a",
}}
>

<Card
sx={{
width:450,
borderRadius:4,
}}
>

<CardContent>

<Typography
variant="h4"
align="center"
mb={3}
>
ERP Login
</Typography>


<TextField
select
fullWidth
label="Login As"
value={role}
onChange={(e)=>
setRole(
e.target.value
)
}
sx={{mb:2}}
>

<MenuItem value="Admin">
Admin
</MenuItem>

<MenuItem value="HR">
HR
</MenuItem>

<MenuItem value="Project">
Project
</MenuItem>

<MenuItem value="Employee">
Employee
</MenuItem>

</TextField>


<TextField
fullWidth
label="Email"
value={email}
onChange={(e)=>
setEmail(
e.target.value
)
}
sx={{mb:2}}
/>


<TextField
fullWidth
type="password"
label="Password"
value={password}
onChange={(e)=>
setPassword(
e.target.value
)
}
sx={{mb:3}}
/>


<Button
fullWidth
variant="contained"
onClick={
handleLogin
}
>

LOGIN

</Button>

</CardContent>

</Card>

</Box>

);

}

export default Login;
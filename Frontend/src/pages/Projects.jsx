import { useState, useEffect } from "react";

import {
Box,
Typography,
Card,
CardContent,
Button,
LinearProgress,
TextField,
MenuItem,
} from "@mui/material";

function Projects() {

const role =
localStorage.getItem(
"loginRole"
);

const canManage =

role==="Admin"

||

role==="HR"

||

role==="Project";


// LOCAL STORAGE SAVE

const [projects,setProjects]=
useState(()=>{

const saved =

localStorage.getItem(
"projects"
);

return saved

?

JSON.parse(saved)

:

[

{
id:1,

name:
"ERP Management System",

manager:
"Prince Chauhan",

deadline:
"30 June 2026",

status:
"Running",

progress:75,
},

{
id:2,

name:
"E-Commerce Website",

manager:
"Aman Singh",

deadline:
"15 May 2026",

status:
"Completed",

progress:100,
},

];

});


// AUTO SAVE

useEffect(()=>{

localStorage.setItem(

"projects",

JSON.stringify(
projects
)

);

},[projects]);


const [name,setName]=
useState("");

const [manager,setManager]=
useState("");

const [deadline,setDeadline]=
useState("");

const [status,setStatus]=
useState(
"Running"
);

const [progress,setProgress]=
useState("");


// ADD PROJECT

const addProject=()=>{

if(

!name

||

!manager

||

!deadline

||

!progress

){

alert(
"Fill all fields"
);

return;

}

const newProject={

id:
Date.now(),

name,

manager,

deadline,

status,

progress:
Number(progress),

};

setProjects([

...projects,

newProject,

]);

setName("");

setManager("");

setDeadline("");

setStatus(
"Running"
);

setProgress("");

};


// DELETE PROJECT

const deleteProject=
(id)=>{

setProjects(

projects.filter(

(item)=>

item.id!==id

)

);

};


const totalProjects=
projects.length;

const runningProjects=

projects.filter(

(item)=>

item.status===
"Running"

).length;


const completedProjects=

projects.filter(

(item)=>

item.status===
"Completed"

).length;


return(

<Box sx={{p:4}}>

<Typography
variant="h4"
fontWeight="bold"
mb={3}
>

Project Management

</Typography>


<Box
sx={{

display:"flex",

gap:2,

flexWrap:"wrap",

mb:3,

}}
>

<Card sx={{flex:1}}>

<CardContent>

<Typography>
Total
</Typography>

<Typography variant="h4">

{totalProjects}

</Typography>

</CardContent>

</Card>


<Card sx={{flex:1}}>

<CardContent>

<Typography>
Running
</Typography>

<Typography variant="h4">

{runningProjects}

</Typography>

</CardContent>

</Card>


<Card sx={{flex:1}}>

<CardContent>

<Typography>
Completed
</Typography>

<Typography variant="h4">

{completedProjects}

</Typography>

</CardContent>

</Card>

</Box>


{

canManage

&&

<Card sx={{mb:4}}>

<CardContent>

<Typography
variant="h6"
mb={2}
>

Add Project

</Typography>


<Box
sx={{

display:"flex",

gap:2,

flexWrap:"wrap",

}}
>

<TextField
label="Project"
value={name}
onChange={(e)=>
setName(
e.target.value
)}
/>


<TextField
label="Manager"
value={manager}
onChange={(e)=>
setManager(
e.target.value
)}
/>


<TextField
label="Deadline"
value={deadline}
onChange={(e)=>
setDeadline(
e.target.value
)}
/>


<TextField
select
label="Status"
value={status}
onChange={(e)=>
setStatus(
e.target.value
)}
>

<MenuItem value="Running">
Running
</MenuItem>

<MenuItem value="Completed">
Completed
</MenuItem>

</TextField>


<TextField
label="Progress"
type="number"
value={progress}
onChange={(e)=>
setProgress(
e.target.value
)}
/>


<Button
variant="contained"
onClick={
addProject
}
>

Add

</Button>

</Box>

</CardContent>

</Card>

}


{

projects.map(

(project)=>(

<Card
key={
project.id
}
sx={{mb:3}}
>

<CardContent>

<Typography
variant="h6"
>

{project.name}

</Typography>


<Typography>

Manager:
{project.manager}

</Typography>


<Typography>

Deadline:
{project.deadline}

</Typography>


<Typography>

Status:
{project.status}

</Typography>


<LinearProgress
variant="determinate"
value={
project.progress
}
sx={{

mt:2,

mb:2,

}}
/>


<Typography>

{project.progress}%

</Typography>


{

canManage

&&

<Button

variant="contained"

color="error"

sx={{
mt:2
}}

onClick={()=>

deleteProject(
project.id
)

}

>

Delete

</Button>

}

</CardContent>

</Card>

)

)

}

</Box>

);

}

export default Projects;
import {
useEffect,
useState,
} from "react";

import {
Box,
Typography,
Card,
CardContent,
TextField,
Button,
Table,
TableHead,
TableRow,
TableCell,
TableBody,
MenuItem,
CircularProgress,
Snackbar,
Alert,
} from "@mui/material";

import {
getLeaves,
applyLeave,
updateLeaveStatus,
} from "../api/api";

function Leave() {

const role =
localStorage.getItem(
"loginRole"
);

const canApprove =

role==="Admin"

||

role==="HR";

const [leaveRequests,setLeaveRequests]=
useState([]);

const [statusFilter,setStatusFilter]=
useState("");

const [loading,setLoading]=
useState(false);

const [toast,setToast]=
useState({
open:false,
message:"",
severity:"success",
});

const [formData,setFormData]=
useState({
name:"",
leaveType:"",
date:"",
});


// FETCH
const fetchLeaves =
async()=>{

try{

setLoading(true);

const res =
await getLeaves();

setLeaveRequests(
res.data.leaves || []
);

}

catch(error){

setToast({
open:true,
message:
error.response?.data?.message
||
"Failed to Fetch Leaves",
severity:"error",
});

}

finally{

setLoading(false);

}

};


useEffect(()=>{

fetchLeaves();

},[]);


// APPLY
const handleApply =
async()=>{

try{

if(
!formData.name
||
!formData.leaveType
||
!formData.date
){

setToast({
open:true,
message:
"Fill All Fields",
severity:
"warning",
});

return;

}

setLoading(true);

await applyLeave(
formData
);

setToast({
open:true,
message:
"Leave Applied Successfully",
severity:
"success",
});

setFormData({
name:"",
leaveType:"",
date:"",
});

fetchLeaves();

}

catch(error){

setToast({
open:true,
message:
"Apply Failed",
severity:
"error",
});

}

finally{

setLoading(false);

}

};


// APPROVE / REJECT
const handleStatus =
async(
id,
status
)=>{

try{

setLoading(true);

await updateLeaveStatus(
id,
{
status,
}
);

setToast({

open:true,

message:
`Leave ${status}`,

severity:
"success",

});

fetchLeaves();

}

catch(error){

setToast({

open:true,

message:
"Status Update Failed",

severity:
"error",

});

}

finally{

setLoading(false);

}

};


// FILTER
const filteredLeaves =

leaveRequests.filter(

(item)=>

statusFilter===""

||

item.status===statusFilter

);


return(

<Box sx={{p:4}}>

<Typography
variant="h4"
mb={3}
fontWeight="bold"
>

Leave Management

</Typography>


<Card sx={{mb:4}}>

<CardContent>

<Typography
variant="h6"
mb={2}
>

Apply Leave

</Typography>

<Box
display="flex"
gap={2}
flexWrap="wrap"
>

<TextField
label="Employee Name"
value={formData.name}
onChange={(e)=>

setFormData({

...formData,

name:
e.target.value,

})

}
/>

<TextField
label="Leave Type"
value={
formData.leaveType
}
onChange={(e)=>

setFormData({

...formData,

leaveType:
e.target.value,

})

}
/>

<TextField
type="date"
InputLabelProps={{
shrink:true
}}
value={
formData.date
}
onChange={(e)=>

setFormData({

...formData,

date:
e.target.value,

})

}
/>

<Button
variant="contained"
onClick={
handleApply
}
>

Apply

</Button>

</Box>

</CardContent>

</Card>


<Card>

<CardContent>

<Box
display="flex"
justifyContent="space-between"
mb={3}
>

<Typography
variant="h6"
>

Leave Requests

</Typography>

<TextField
select
label="Filter"
value={
statusFilter
}
onChange={(e)=>

setStatusFilter(
e.target.value
)

}
sx={{
width:220
}}
>

<MenuItem value="">
All
</MenuItem>

<MenuItem value="Pending">
Pending
</MenuItem>

<MenuItem value="Approved">
Approved
</MenuItem>

<MenuItem value="Rejected">
Rejected
</MenuItem>

</TextField>

</Box>


<Table>

<TableHead>

<TableRow>

<TableCell>
Name
</TableCell>

<TableCell>
Type
</TableCell>

<TableCell>
Date
</TableCell>

<TableCell>
Status
</TableCell>

<TableCell>
Action
</TableCell>

</TableRow>

</TableHead>

<TableBody>

{

filteredLeaves.length>0

?

filteredLeaves.map(

(leave)=>(

<TableRow
key={
leave._id
}
>

<TableCell>
{leave.name}
</TableCell>

<TableCell>
{leave.leaveType}
</TableCell>

<TableCell>
{leave.date}
</TableCell>

<TableCell>
{leave.status}
</TableCell>

<TableCell>

{

canApprove

?

<>

<Button
variant="contained"
color="success"
size="small"
sx={{
mr:1
}}
disabled={
leave.status!=="Pending"
}
onClick={()=>

handleStatus(
leave._id,
"Approved"
)

}
>

Approve

</Button>

<Button
variant="contained"
color="error"
size="small"
disabled={
leave.status!=="Pending"
}
onClick={()=>

handleStatus(
leave._id,
"Rejected"
)

}
>

Reject

</Button>

</>

:

"-"

}

</TableCell>

</TableRow>

)

)

:

<TableRow>

<TableCell
colSpan={5}
align="center"
>

No Leave Requests Found

</TableCell>

</TableRow>

}

</TableBody>

</Table>

</CardContent>

</Card>


<Snackbar
open={
toast.open
}
autoHideDuration={
3000
}
onClose={()=>

setToast({

...toast,

open:false,

})

}
>

<Alert
severity={
toast.severity
}
variant="filled"
>

{
toast.message
}

</Alert>

</Snackbar>

</Box>

);

}

export default Leave;
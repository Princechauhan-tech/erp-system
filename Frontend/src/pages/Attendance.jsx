import {
Box,
Typography,
Card,
CardContent,
Table,
TableHead,
TableRow,
TableCell,
TableBody,
TextField,
MenuItem,
Button,
CircularProgress,
Snackbar,
Alert,
Autocomplete,
} from "@mui/material";

import {
useEffect,
useState,
} from "react";

import {
PieChart,
Pie,
Cell,
Legend,
Tooltip,
ResponsiveContainer,
} from "recharts";

import {
getAttendance,
markAttendance,
getEmployees,
} from "../api/api";
function Attendance() {

const role =
localStorage.getItem("loginRole");

const canManageAttendance =
role === "Admin" ||
role === "HR";

const [attendance,setAttendance]=
useState([]);
const [employees,setEmployees]=
useState([]);

const [selectedEmployee,setSelectedEmployee]=
useState(null);

const [analytics,setAnalytics]=
useState([]);

const [filter,setFilter]=
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
status:"Present",
});


 const [stats, setStats] = useState({
    total: 0,
    present: 0,
    absent: 0,
    leave: 0,
    attendancePercentage: 0,
});

// FETCH ATTENDANCE

const fetchAttendance = async () => {

    try {

        setLoading(true);

        const res =
            await getAttendance();

        setAttendance(
            res.data.attendance
        );

        setAnalytics(
            res.data.analytics || []
        );

        setStats(
            res.data.stats || {}
        );

    }

    catch (error) {

        setToast({
            open: true,
            message: "Failed to Fetch Attendance",
            severity: "error",
        });

    }

    finally {

        setLoading(false);

    }

};


// FETCH EMPLOYEES

const fetchEmployees=
async()=>{

try{

const res=
await getEmployees();

setEmployees(
res.data.employees
);

}

catch(error){

console.log(error);

}

};


useEffect(()=>{

fetchAttendance();

fetchEmployees();

},[]);


// HANDLE STATUS

const handleChange=
(e)=>{

setFormData({

...formData,

[e.target.name]:
e.target.value,

});

};


// MARK ATTENDANCE

const handleAttendance=
async()=>{

try{

if(!selectedEmployee){

setToast({
open:true,
message:"Select Employee",
severity:"warning",
});

return;

}

setLoading(true);

await markAttendance({

employee:
selectedEmployee._id,

status:
formData.status,

});

setToast({
open:true,
message:"Attendance Marked",
severity:"success",
});

fetchAttendance();

setSelectedEmployee(null);

setFormData({
status:"Present",
});

}

catch(error){

setToast({
open:true,
message:"Attendance Failed",
severity:"error",
});

}

finally{

setLoading(false);

}

};


// FILTER

const filteredAttendance=

attendance.filter(

(item)=>

filter===""

||

item.status===filter

);


return(

<Box sx={{p:4}}>

<Typography
variant="h4"
mb={3}
fontWeight="bold"
>

Attendance Management

</Typography>


{/* ANALYTICS */}

<Card sx={{mb:4}}>

<CardContent>

<Typography
variant="h6"
mb={2}
>

{
role === "Employee" && (

<Card sx={{ mb: 4 }}>

    <CardContent>

        <Typography
            variant="h6"
        >
            My Attendance Percentage
        </Typography>

        <Typography
            variant="h3"
            color="primary"
            fontWeight="bold"
        >
            {stats.attendancePercentage || 0}%
        </Typography>

    </CardContent>

</Card>

)
}
Attendance Analytics

</Typography>

<ResponsiveContainer
width="100%"
height={300}
>

<PieChart>

<Pie
data={analytics}
dataKey="value"
outerRadius={100}
label
>

<Cell fill="#22c55e"/>
<Cell fill="#ef4444"/>
<Cell fill="#eab308"/>

</Pie>

<Tooltip/>
<Legend/>

</PieChart>

</ResponsiveContainer>

</CardContent>

</Card>


{/* MARK ATTENDANCE */}

{
  canManageAttendance && (

    <Card sx={{ mb: 4 }}>

      <CardContent>

        <Typography
          variant="h6"
          mb={2}
        >
          Mark Attendance
        </Typography>

        <Box
          display="flex"
          gap={2}
          flexWrap="wrap"
        >

          <Autocomplete
            options={employees}
            getOptionLabel={(option) =>
              option.name
            }
            value={selectedEmployee}
            onChange={(event, newValue) =>
              setSelectedEmployee(newValue)
            }
            sx={{ width: 300 }}
            renderInput={(params) => (

              <TextField
                {...params}
                label="Search Employee"
              />

            )}
          />

          <TextField
            select
            name="status"
            value={formData.status}
            onChange={handleChange}
            sx={{ minWidth: 180 }}
          >

            <MenuItem value="Present">
              Present
            </MenuItem>

            <MenuItem value="Absent">
              Absent
            </MenuItem>

            <MenuItem value="Leave">
              Leave
            </MenuItem>

          </TextField>

          <Button
            variant="contained"
            onClick={handleAttendance}
            disabled={loading}
          >

            {
              loading
                ? (
                  <CircularProgress
                    size={22}
                    color="inherit"
                  />
                )
                : "Mark"
            }

          </Button>

        </Box>

      </CardContent>

    </Card>

  )
}


{/* TABLE */}

<Card>

<CardContent>

<Box
display="flex"
justifyContent="space-between"
alignItems="center"
mb={3}
flexWrap="wrap"
gap={2}
>

<Typography
variant="h6"
>

Attendance Records

</Typography>

<TextField
select
label="Filter Status"
value={filter}
onChange={(e)=>
setFilter(
e.target.value
)
}
sx={{width:220}}
>

<MenuItem value="">
All
</MenuItem>

<MenuItem value="Present">
Present
</MenuItem>

<MenuItem value="Absent">
Absent
</MenuItem>

<MenuItem value="Leave">
Leave
</MenuItem>

</TextField>

</Box>


{
loading

?

<Box
display="flex"
justifyContent="center"
py={5}
>

<CircularProgress/>

</Box>

:

<Table>

<TableHead>

<TableRow>

<TableCell>
Employee
</TableCell>

<TableCell>
Status
</TableCell>

<TableCell>
Date
</TableCell>

</TableRow>

</TableHead>

<TableBody>

{

filteredAttendance.length>0

?

filteredAttendance.map(

(item)=>(

<TableRow
key={item._id}
>

<TableCell>

{
item.employee?.name
||
"N/A"
}

</TableCell>

<TableCell>
{item.status}
</TableCell>

<TableCell>

{
new Date(
item.date
).toLocaleDateString()
}

</TableCell>

</TableRow>

)

)

:

<TableRow>

<TableCell
colSpan={3}
align="center"
>

No Attendance Found

</TableCell>

</TableRow>

}

</TableBody>

</Table>

}

</CardContent>

</Card>


{/* TOAST */}

<Snackbar
open={toast.open}
autoHideDuration={3000}
onClose={()=>
setToast({
...toast,
open:false,
})
}
>

<Alert
severity={toast.severity}
variant="filled"
>

{toast.message}

</Alert>

</Snackbar>

</Box>

);

}

export default Attendance;
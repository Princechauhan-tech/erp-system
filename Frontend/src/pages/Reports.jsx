import {
Box,
Typography,
Card,
CardContent,
Button,
Table,
TableHead,
TableRow,
TableCell,
TableBody,
} from "@mui/material";

import {
ResponsiveContainer,
BarChart,
Bar,
XAxis,
YAxis,
Tooltip,
} from "recharts";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { saveAs } from "file-saver";

function Reports() {

const reportData=[

{month:"Jan",employees:80},
{month:"Feb",employees:90},
{month:"Mar",employees:100},
{month:"Apr",employees:110},
{month:"May",employees:115},
{month:"Jun",employees:120},

];

const recentReports=[

{
id:1,
name:"Employee Report",
date:"12-06-2026",
status:"Generated"
},

{
id:2,
name:"Payroll Report",
date:"11-06-2026",
status:"Generated"
},

{
id:3,
name:"Attendance Report",
date:"10-06-2026",
status:"Generated"
},

];


// EXPORT PDF

const exportPDF=()=>{

const doc=
new jsPDF();

doc.text(
"ERP REPORT",
20,
20
);

autoTable(
doc,
{

head:[
[
"ID",
"Name",
"Date",
"Status"
]
],

body:

recentReports.map(
(r)=>[
r.id,
r.name,
r.date,
r.status
]
),

}
);

doc.save(
"ERP_Report.pdf"
);

};


// EXPORT CSV

const exportCSV=()=>{

let csv=

"ID,Name,Date,Status\n";

recentReports.forEach(

(r)=>{

csv+=

`${r.id},
${r.name},
${r.date},
${r.status}\n`;

}

);

const blob=
new Blob(

[csv],

{
type:
"text/csv;charset=utf-8;"
}

);

saveAs(
blob,
"ERP_Report.csv"
);

};


return(

<Box sx={{p:4}}>

<Typography
variant="h4"
fontWeight="bold"
mb={3}
>

Reports & Analytics

</Typography>


<Box
sx={{
display:"flex",
gap:2,
mb:3,
}}
>

<Button
variant="contained"
onClick={exportPDF}
>

Export PDF

</Button>


<Button
variant="outlined"
onClick={exportCSV}
>

Export CSV

</Button>

</Box>


<Card
sx={{
p:3,
mb:3,
}}
>

<Typography
variant="h6"
mb={2}
>

Employee Growth

</Typography>


<ResponsiveContainer
width="100%"
height={300}
>

<BarChart
data={reportData}
>

<XAxis
dataKey="month"
/>

<YAxis/>

<Tooltip/>

<Bar
dataKey="employees"
fill="#2563eb"
/>

</BarChart>

</ResponsiveContainer>

</Card>


<Card>

<CardContent>

<Typography
variant="h6"
mb={2}
>

Recent Reports

</Typography>


<Table>

<TableHead>

<TableRow>

<TableCell>
ID
</TableCell>

<TableCell>
Report
</TableCell>

<TableCell>
Date
</TableCell>

<TableCell>
Status
</TableCell>

</TableRow>

</TableHead>


<TableBody>

{

recentReports.map(

(r)=>(

<TableRow
key={r.id}
>

<TableCell>
{r.id}
</TableCell>

<TableCell>
{r.name}
</TableCell>

<TableCell>
{r.date}
</TableCell>

<TableCell>
{r.status}
</TableCell>

</TableRow>

)

)

}

</TableBody>

</Table>

</CardContent>

</Card>

</Box>

);

}

export default Reports;
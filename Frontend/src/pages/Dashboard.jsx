import {
  Box,
  Typography,
  Card,
  CardContent,
} from "@mui/material";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import {
  useEffect,
  useState,
} from "react";

import {
  getDashboardStats,
} from "../api/api";

function Dashboard() {

  const [stats, setStats] = useState({
    totalEmployees: 0,
    totalAttendance: 0,
    totalLeaves: 0,
  });

  useEffect(() => {

    const fetchStats = async () => {

      try {

        const res =
          await getDashboardStats();

        setStats(res.data.stats);

      } catch (error) {

        console.log(error);

      }

    };

    fetchStats();

  }, []);

  const chartData = [
    { month: "Jan", employees: 40 },
    { month: "Feb", employees: 55 },
    { month: "Mar", employees: 70 },
    { month: "Apr", employees: 85 },
    { month: "May", employees: 100 },
    { month: "Jun", employees: 120 },
  ];

  return (

    <Box sx={{ p: 4 }}>

      <Typography
        variant="h4"
        fontWeight="bold"
        mb={3}
      >
        Dashboard Overview
      </Typography>

      <Box
        sx={{
          display: "flex",
          gap: 3,
          flexWrap: "wrap",
          mb: 5,
        }}
      >

        <Card
          sx={{
            width: 220,
            bgcolor: "#2563eb",
            color: "white",
          }}
        >
          <CardContent>

            <Typography>
              Employees
            </Typography>

            <Typography variant="h3">
              {stats.totalEmployees}
            </Typography>

          </CardContent>
        </Card>

        <Card
          sx={{
            width: 220,
            bgcolor: "#16a34a",
            color: "white",
          }}
        >
          <CardContent>

            <Typography>
              Attendance
            </Typography>

            <Typography variant="h3">
              {stats.totalAttendance}
            </Typography>

          </CardContent>
        </Card>

        <Card
          sx={{
            width: 220,
            bgcolor: "#dc2626",
            color: "white",
          }}
        >
          <CardContent>

            <Typography>
              Leaves
            </Typography>

            <Typography variant="h3">
              {stats.totalLeaves}
            </Typography>

          </CardContent>
        </Card>

        
      </Box>

      <Card sx={{ p: 3 }}>

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

          <BarChart data={chartData}>

            <XAxis dataKey="month" />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="employees"
              fill="#2563eb"
            />

          </BarChart>

        </ResponsiveContainer>

      </Card>

    </Box>

  );

}

export default Dashboard;
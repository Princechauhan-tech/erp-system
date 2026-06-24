import { useState } from "react";

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
  Button,
  TextField,
} from "@mui/material";

function Payroll() {
  const [records, setRecords] = useState([
    {
      id: 1,
      name: "Rahul Sharma",
      salary: 50000,
      bonus: 5000,
    },
    {
      id: 2,
      name: "Aman Singh",
      salary: 60000,
      bonus: 7000,
    },
    {
      id: 3,
      name: "Prince Chauhan",
      salary: 45000,
      bonus: 3000,
    },
  ]);

  const [name, setName] = useState("");
  const [salary, setSalary] = useState("");
  const [bonus, setBonus] = useState("");
  const [search, setSearch] = useState("");

  const addPayroll = () => {
    if (!name || !salary || !bonus) return;

    const newRecord = {
      id: records.length + 1,
      name,
      salary: Number(salary),
      bonus: Number(bonus),
    };

    setRecords([...records, newRecord]);

    setName("");
    setSalary("");
    setBonus("");
  };

  const deleteRecord = (id) => {
    setRecords(
      records.filter((record) => record.id !== id)
    );
  };

  const filteredRecords = records.filter((record) =>
    record.name
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const totalPayroll = records.reduce(
    (total, emp) =>
      total + emp.salary + emp.bonus,
    0
  );

  return (
    <Box sx={{ p: 4 }}>
      <Typography
        variant="h4"
        fontWeight="bold"
        mb={3}
      >
        Payroll Management
      </Typography>

      {/* Search */}

      <TextField
        fullWidth
        label="Search Employee"
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        sx={{ mb: 3 }}
      />

      {/* Summary Cards */}

      <Box
        sx={{
          display: "flex",
          gap: 2,
          mb: 3,
          flexWrap: "wrap",
        }}
      >
        <Card sx={{ flex: 1, minWidth: 200 }}>
          <CardContent>
            <Typography variant="h6">
              Total Employees
            </Typography>

            <Typography variant="h4">
              {records.length}
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ flex: 1, minWidth: 200 }}>
          <CardContent>
            <Typography variant="h6">
              Total Payroll
            </Typography>

            <Typography variant="h4">
              ₹{totalPayroll.toLocaleString()}
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ flex: 1, minWidth: 200 }}>
          <CardContent>
            <Typography variant="h6">
              Records
            </Typography>

            <Typography variant="h4">
              {records.length}
            </Typography>
          </CardContent>
        </Card>
      </Box>

      {/* Add Payroll */}

      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography
            variant="h6"
            mb={2}
          >
            Add Payroll
          </Typography>

          <Box
            sx={{
              display: "flex",
              gap: 2,
              flexWrap: "wrap",
            }}
          >
            <TextField
              label="Employee Name"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
            />

            <TextField
              label="Salary"
              type="number"
              value={salary}
              onChange={(e) =>
                setSalary(e.target.value)
              }
            />

            <TextField
              label="Bonus"
              type="number"
              value={bonus}
              onChange={(e) =>
                setBonus(e.target.value)
              }
            />

            <Button
              variant="contained"
              onClick={addPayroll}
            >
              Add Payroll
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Payroll Table */}

      <Card>
        <CardContent>
          <Typography
            variant="h6"
            mb={2}
          >
            Salary Records
          </Typography>

          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Basic Salary</TableCell>
                <TableCell>Bonus</TableCell>
                <TableCell>Net Salary</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredRecords.map((emp) => (
                <TableRow key={emp.id}>
                  <TableCell>{emp.id}</TableCell>
                  <TableCell>{emp.name}</TableCell>

                  <TableCell>
                    ₹{emp.salary.toLocaleString()}
                  </TableCell>

                  <TableCell>
                    ₹{emp.bonus.toLocaleString()}
                  </TableCell>

                  <TableCell>
                    ₹
                    {(
                      emp.salary + emp.bonus
                    ).toLocaleString()}
                  </TableCell>

                  <TableCell>
                    <Button
                      color="error"
                      variant="contained"
                      size="small"
                      onClick={() =>
                        deleteRecord(emp.id)
                      }
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>

          </Table>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Payroll;
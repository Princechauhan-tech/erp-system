import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  MenuItem,
  CircularProgress,
} from "@mui/material";

import {
  useEffect,
  useState,
} from "react";

import {
  getEmployees,
  addEmployee,
} from "../api/api";

function Employees() {

  const [employees, setEmployees] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [addLoading, setAddLoading] =
    useState(false);

  const [search, setSearch] =
    useState("");

  const [department, setDepartment] =
    useState("");

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      phone: "",
      department: "",
      designation: "",
      salary: "",
    });

  // FETCH EMPLOYEES

  const fetchEmployees = async () => {

    try {

      setLoading(true);

      const res =
        await getEmployees();

      setEmployees(
        res.data.employees
      );

    } catch (error) {

      console.log(error);

      alert(
        "Failed To Fetch Employees"
      );

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    fetchEmployees();

  }, []);

  // HANDLE INPUT

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value,

    });

  };

  // ADD EMPLOYEE

  const handleAddEmployee =
    async () => {

      try {

        if (
          !formData.name ||
          !formData.email ||
          !formData.phone ||
          !formData.department ||
          !formData.designation ||
          !formData.salary
        ) {

          alert(
            "Please Fill All Fields"
          );

          return;

        }

        setAddLoading(true);

        await addEmployee(
          formData
        );

        alert(
          "Employee Added Successfully"
        );

        setFormData({
          name: "",
          email: "",
          phone: "",
          department: "",
          designation: "",
          salary: "",
        });

        fetchEmployees();

      } catch (error) {

        console.log(error);

        alert(
          error.response?.data?.message
          ||
          "Employee Add Failed"
        );

      } finally {

        setAddLoading(false);

      }

    };

  // FILTER

  const filteredEmployees =

    employees.filter((emp) => {

      const matchName =

        emp.name
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchDept =

        department === ""

        ||

        emp.department === department;

      return (
        matchName &&
        matchDept
      );

    });

  return (

    <Box sx={{ p: 4 }}>

      <Typography
        variant="h4"
        mb={3}
        fontWeight="bold"
      >

        Employee Management

      </Typography>

      {/* ADD EMPLOYEE */}

      <Card sx={{ mb: 4 }}>

        <CardContent>

          <Typography
            variant="h6"
            mb={2}
          >

            Add Employee

          </Typography>

          <Box
            sx={{
              display: "grid",

              gridTemplateColumns:
                "repeat(auto-fit,minmax(250px,1fr))",

              gap: 2,
            }}
          >

            <TextField
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />

            <TextField
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />

            <TextField
              label="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />

            <TextField
              select
              label="Department"
              name="department"
              value={formData.department}
              onChange={handleChange}
            >

              <MenuItem value="HR">
                HR
              </MenuItem>

              <MenuItem value="IT">
                IT
              </MenuItem>

              <MenuItem value="Finance">
                Finance
              </MenuItem>

            </TextField>

            <TextField
              label="Designation"
              name="designation"
              value={formData.designation}
              onChange={handleChange}
            />

            <TextField
              label="Salary"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
            />

          </Box>

          <Button
            variant="contained"
            sx={{ mt: 3 }}
            onClick={handleAddEmployee}
            disabled={addLoading}
          >

            {

              addLoading

                ?

                "Adding..."

                :

                "Add Employee"

            }

          </Button>

        </CardContent>

      </Card>

      {/* SEARCH + FILTER */}

      <Card sx={{ mb: 3 }}>

        <CardContent>

          <Box
            display="flex"
            gap={2}
            flexWrap="wrap"
          >

            <TextField
              label="Search Employee"
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
            />

            <TextField
              select
              label="Department Filter"
              value={department}
              onChange={(e) =>
                setDepartment(
                  e.target.value
                )
              }
              sx={{ width: 220 }}
            >

              <MenuItem value="">
                All
              </MenuItem>

              <MenuItem value="HR">
                HR
              </MenuItem>

              <MenuItem value="IT">
                IT
              </MenuItem>

              <MenuItem value="Finance">
                Finance
              </MenuItem>

            </TextField>

          </Box>

        </CardContent>

      </Card>

      {/* EMPLOYEE TABLE */}

      <Card>

        <CardContent>

          <Typography
            variant="h6"
            mb={2}
          >

            Employee List

          </Typography>

          {

            loading

              ?

              <Box
                display="flex"
                justifyContent="center"
                py={5}
              >

                <CircularProgress />

              </Box>

              :

              <TableContainer
                component={Paper}
              >

                <Table>

                  <TableHead>

                    <TableRow>

                      <TableCell>
                        Name
                      </TableCell>

                      <TableCell>
                        Email
                      </TableCell>

                      <TableCell>
                        Phone
                      </TableCell>

                      <TableCell>
                        Department
                      </TableCell>

                      <TableCell>
                        Designation
                      </TableCell>

                      <TableCell>
                        Salary
                      </TableCell>

                    </TableRow>

                  </TableHead>

                  <TableBody>

                    {

                      filteredEmployees.length > 0

                        ?

                        filteredEmployees.map(

                          (emp) => (

                            <TableRow
                              key={emp._id}
                            >

                              <TableCell>
                                {emp.name}
                              </TableCell>

                              <TableCell>
                                {emp.email}
                              </TableCell>

                              <TableCell>
                                {emp.phone}
                              </TableCell>

                              <TableCell>
                                {emp.department}
                              </TableCell>

                              <TableCell>
                                {emp.designation}
                              </TableCell>

                              <TableCell>
                                ₹{emp.salary}
                              </TableCell>

                            </TableRow>

                          )

                        )

                        :

                        <TableRow>

                          <TableCell
                            colSpan={6}
                            align="center"
                          >

                            No Employees Found

                          </TableCell>

                        </TableRow>

                    }

                  </TableBody>

                </Table>

              </TableContainer>

          }

        </CardContent>

      </Card>

    </Box>

  );

}

export default Employees;
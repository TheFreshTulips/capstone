import { useState, useEffect, useContext } from "react";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import config from "../config";
import { TaskContext } from "../App.js";
import { useLocation } from "react-router-dom";
import logo from "../loading-blue.gif";
import Grid from "@mui/material/Grid";


const ApiUrl = config[process.env.REACT_APP_NODE_ENV || "development"].apiUrl;

// const createData = (task, date_completed, completed_by) => {
//   return { task, date_completed, completed_by };
// };

/*
const rows = [
  createData("dont be a piece of shit", "never", "me >:D"),
  createData("un heck yourself trainee", "tomorrow", "me mum"),
  createData("get wrecked", "now", "ur MOM"),
];
 */

//variables here can probably have better names, these are the possible names of the columns
const rowNames = ["Task Name", "Date Completed"];
const keys = ["task_title", "task_completed_date"];

// const adminRoles = [];
// const adminOrgs = [];

const TaskTable = () => {
  const tc = useContext(TaskContext);
  let [tasks, setTasks] = useState([]);
  let [isUnit, setIsUnit] = useState(true); //make toggle button to toggle if the table should show unit data or single user data
  let [isLoading, setIsLoading] = useState(false);
  let { pathname } = useLocation();

  // function isDateInThisWeek(date) { //assumes date is a Date objct
  //   const todayObj = new Date();
  //   const todayDate = todayObj.getDate();
  //   const todayDay = todayObj.getDay();

  //   // get first date of week
  //   const firstDayOfWeek = new Date(todayObj.setDate(todayDate - todayDay));

  //   // get last date of week
  //   const lastDayOfWeek = new Date(firstDayOfWeek);
  //   lastDayOfWeek.setDate(lastDayOfWeek.getDate() + 6);

  //   // if date is equal or within the first and last dates of the week
  //   return date >= firstDayOfWeek && date <= lastDayOfWeek;
  // }

  useEffect(() => {
    setIsLoading(true);
    let url;
    console.log("pathname: ", pathname);
    pathname === "/archive"
      ? (url = `${ApiUrl}/tasks/users/${tc.userId}`)
      : isUnit
      ? (url = `${ApiUrl}/war/orgs/${tc.userOrg}`)
      : (url = `${ApiUrl}/war/users/${tc.userId}`);

    fetch(url)
      .then((res) => res.json())
      .then((data) => sortTasks(data))
      .then(() => setTimeout(() => setIsLoading(false), 250))
  }, [isUnit, pathname]);

  const sortTasks = (data) => {
    let temp = [];
    if (pathname === "/archive") {
      //if its archived then the completed date is not null
      temp = data.filter((element) => element.task_completed_date !== null);
    } else {
      //if its not archived then get the tasks that are completed for the week or in progress
      //Note: I dont know if this date sorting is gonna work
      // temp = data.filter((element) => {element.task_status === 'in progress' && isDateInThisWeek(element.task_completed_date)})
      //use line above if we want to filter later on
      temp = data;
    }
    setTasks(temp);
  };

  return (
    <Box width={"90%"} margin="auto" marginTop={5}>
      <Paper>
        <Box m={3}>
          {pathname === "/reports" ? (
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    onChange={() => {
                      setIsUnit(!isUnit);
                    }}
                  />
                }
                label="See my personal report"
              />
            </FormGroup>
          ) : (
            <></>
          )}
        </Box>

        {isLoading ? (
            <Grid container display='flex' justifyContent='center' direction='column' alignItems='center'>
              <img src={logo} width="400px" alt="loading-spinner" />
              <Typography variant="h3" align='center'>Loading...</Typography>
            </Grid>
          ) :
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 400 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  {rowNames.map((element, index) => {
                    return index === 0 ? (
                      <TableCell key={index}>
                        <Typography variant="h6">{element}</Typography>
                      </TableCell>
                    ) : (
                      <TableCell key={index} align="right">
                        <Typography variant="h6">{element}</Typography>
                      </TableCell>
                    );
                  })}
                </TableRow>
              </TableHead>
              <TableBody>
                {tasks.map((row) => {
                  return (
                    <>
                      <TableRow
                        key={tasks.task_id}
                        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                      >
                        {keys.map((colName, index) => {
                          // console.log(`column:${colName}`);
                          // console.log(`index:${index}`);
                          return index === 0 ? (
                            <TableCell key={index} component="th" scope="row">
                              {row[colName]}
                            </TableCell>
                          ) : (
                            <TableCell key={index} align="right">
                              {row[colName] === null ? "N/A" : row[colName]}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    </>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        }
      </Paper>
    </Box>
  );
};

export default TaskTable;

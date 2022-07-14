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

// should these be column names or row names?
// const rowNames = ["Task Name", "Date Completed"];
// const keys = ["task_title", "task_completed_date"];
const rowNames = ["Task Name", "Description", "Assigned To", "Date Completed"];
const keys = ["task_title", "task_description", "assigned_to", "task_completed_date"];
/*  eslint-disable no-unexpected-multiline */

const TaskTable = () => {
  const tc = useContext(TaskContext);
  let [tasks, setTasks] = useState([]);
  let [childOrgTasks, setChildOrgTasks] = useState([]);
  let [isUnit, setIsUnit] = useState(true);
  let [isLoading, setIsLoading] = useState(false);
  let { pathname } = useLocation();

  useEffect(() => {
    setIsLoading(true);
    let url;
    console.log("pathname: ", pathname);
    // get data for ARCHIVE, aka all completed tasks
    pathname === "/archive"
      ? (url = `${ApiUrl}/tasks/users/${tc.userId}`)
    // get data for weekly activity REPORTS
      : isUnit
      ? (url = `${ApiUrl}/war/orgs/${tc.userOrg}`)
      : (url = `${ApiUrl}/war/users/${tc.userId}`);

    fetch(url)
      .then((res) => res.json())
      .then((data) => sortTasks(data))
      .then(() => setTimeout(() => setIsLoading(false), 250))

    if(tc.isSupervisor && isUnit) {
      fetch(`${ApiUrl}/orgs/${tc.userOrg}/children`)
        .then((res) => res.json())
        .then((data) => {
          let promiseArr = [];
          data.forEach(element => {
            promiseArr.push(fetch(`${ApiUrl}/tasks/orgs/${element.org_id}`)
              .then(res => res.json()))
          })
      Promise.all(promiseArr)
        .then(results => {
          let tempTasks = []
          results.forEach(result => {
            tempTasks.push(
              {
                org_id: result[0].task_org_id,
                org_name: result[0].task_org_name,
                tasks: result,
              }
            )
          })
          setChildOrgTasks(tempTasks);

          setTimeout(() => setIsLoading(false), 250);
        })
      })
    }
  }, [isUnit, pathname]);

  const getOwners = (task) => {
    if(task.owners) {
      const assigned_to = task.owners.reduce((prev, curr, index) => {
        // if on the last name in the array
        if(index === task.owners.length - 1) {
          return prev + curr.rank + ' ' + curr.name
        }
        return prev + curr.rank + ' ' + curr.name + "\n"
      }, '')
      return assigned_to;
    } else {
      return null;
    }
  }

  // sorts out the COMPLETED tasks
  const sortTasks = (data) => {
    let filteredTasks = [];
    // for archive, get tasks with completed dates
    if (pathname === "/archive") {
      filteredTasks = data.filter((element) => element.task_completed_date !== null);
    // for reports, get tasks that are completed for the week or in progress this week
    } else {
      filteredTasks = data;
    }
    setTasks(filteredTasks);
    console.log(tasks)
  };

  return (
    <Box width={"90%"} margin="auto" marginTop={5}>
      <Paper
        style={{
          padding: "20px 20px",
          color: "white",
          backgroundColor: "#003665",
          boxShadow: "0 0 10px #4DACFF",
          borderRadius: "5px",
        }}
      >
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
                label={<Typography color="white">View Personal Report</Typography>}
              />
            </FormGroup>
          ) : (
            <></>
          )}
        </Box>

        {isLoading ? (
            <Grid container display='flex' justifyContent='center' direction='column' alignItems='center'>
              <img src={logo} width="400px" alt="loading-spinner" />
              <Typography variant="h3" align='center' style={{color: 'white'}}>Loading...</Typography>
            </Grid>
          ) : (
            <>
              {tasks[0] && isUnit ? <Typography variant="h4" key="header" align = 'center' color="white">{tasks[0].task_org_name}</Typography>: <></>}
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 400 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      {rowNames.map((element, index) => {
                        return (
                          <TableCell key={index} align="center">
                            <Typography variant="h6" color="black">{element}</Typography>
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
                                      return index === keys.length - 1 ? (
                                        <TableCell key={index} align="center">
                                          {row[colName] === null
                                            ? "In Progress"
                                            : new Date(row[colName]).toLocaleString("en-US")}
                                        </TableCell>
                                      ) : colName === "assigned_to" ? (
                                        <TableCell key={index} component="th" scope="row" align="center">
                                            {getOwners(row)}
                                        </TableCell>
                                      ) : (
                                        <TableCell key={index} component="th" scope="row" align="center">
                                        {row[colName]}
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
              { tc.isSupervisor && isUnit && pathname === "/reports"  ? (
                childOrgTasks.map((element) => {
                  return (
                    <>
                      <Typography variant="h4" key="header" align='center' mt={5} color="whitesmoke">{element.org_name}</Typography>
                      <TableContainer key={element.org_id} component={Paper}>
                        <Table sx={{ minWidth: 400 }} aria-label="simple table">
                          <TableHead>
                            <TableRow>
                              {rowNames.map((element, index) => {
                                return (
                                <TableCell key={index} align="center">
                                  <Typography variant="h6" color="black">{element}</Typography>
                                </TableCell>
                                )
                              })}
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {element.tasks.map((row) => {
                              return (
                                <>
                                  <TableRow
                                    key={tasks.task_id}
                                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                  >
                                    {keys.map((colName, index) => {
                                      // console.log(`column:${colName}`);
                                      // console.log(`index:${index}`);
                                      return index === keys.length - 1 ? (
                                        <TableCell key={index} align="center">
                                          {row[colName] === null
                                            ? "In Progress"
                                            : new Date(row[colName]).toLocaleString("en-US")}
                                        </TableCell>
                                      ) : colName === "assigned_to" ? (
                                        <TableCell key={index} component="th" scope="row" align="center">
                                            {getOwners(row) ? getOwners(row) : "None"}
                                        </TableCell>
                                      ) : (
                                        <TableCell key={index} component="th" scope="row" align="center">
                                        {row[colName]}
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
                    </>
                  )
                })
              )
              : <></> }
            </>
          )
        }
      </Paper>
    </Box>
  );
};

export default TaskTable;

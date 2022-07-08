import React, { useEffect, useState, useContext } from "react";
import EditableText from "./EditableText.js";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Button, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers';
import moment from 'moment'

import config from "../config";
const ApiUrl = config[process.env.REACT_APP_NODE_ENV || "development"].apiUrl;

import { TaskContext } from "../App.js";

// for creating/adding a new task
const CreateTask = () => {
  const validPriorities = [1, 2, 3, 4, 5]
  const navigate = useNavigate();
  const tc = useContext(TaskContext);

  let [input, setInput] = useState({
    title: "",
    description: "",
    priority: '',
    assigned_date: new Date(),
    suspense_date: "",
    status: 'to do',
    comments: "",
    creator_id: tc.userId,
    owners: [tc.userId],
    org_id: tc.userOrg
  });

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleSuspenseDateChange = (_value) => {
    handleChange({target: {name: 'suspense_date', value: _value.format()}});
  }
  const handleSubmit = (e) => {
    console.log(`sending body:`, input)
    fetch(`${ApiUrl}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    })
      .then((res) => res.json())
      .then((data) => {
        alert("Task created!");
        navigate("/tasks");
      })
      .catch((err) => {
        console.log(err);
        alert(`Failed to create a new task`);
      });
    e.preventDefault();
  };

  return (
    <Container
      maxWidth="lg"
      className="post-page"
      sx={{
        marginBottom: "0",
        boxShadow: "0 0 10px rgb(10, 31, 10)",
        borderRadius: "5px",
      }}
    >
      <form onSubmit={handleSubmit}>
        <Box m={2} pt={3}>
          <Grid
            container
            spacing={3}
            direction="column"
            alignItems="center"
            justifyContent="space-evenly"
          >
            <Box m={2} pt={3}>
              <Typography variant="h5">Create Task</Typography>
            </Box>
            <Box m={1}>
              <TextField
                label="Title"
                type="title"
                name="title"
                value={input.title}
                onChange={handleChange}
                required
              />
            </Box>
            <Box m={1}>
              <TextField
                label="Description"
                type="description"
                name="description"
                value={input.description}
                onChange={handleChange}
                required
              />
            </Box>
            <Box m={1}>
              <TextField
                id="priority"
                select
                name="priority"
                value={input.priority}
                label="Priority"
                onChange={handleChange}
                required
                sx={{ minWidth: 223 }}
              >
                {validPriorities.map(element => <MenuItem key={element} value={element}>{element}</MenuItem>)}
              </TextField>
            </Box>
            {/* <Box m={1}>
              <TextField
                label="Assigned Date"
                name="assigned"
                value={input.assigned}
                onChange={handleChange}
                required="required"
              />
            </Box> */}
            <Box m={1}>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <Stack spacing={3}>
                  <DateTimePicker
                    label="Suspense Date/Time"
                    value={input.suspense_date}
                    onChange={handleSuspenseDateChange}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </Stack>
              </LocalizationProvider>
            </Box>
            {/* <Box m={1}>
              <TextField
                label="Suspense Date"
                type="suspense"
                name="suspense"
                value={input.suspense}
                onChange={handleChange}
                required
              />
            </Box> */}
            <Box m={2} pt={3}></Box>
            <Button className="submitButton" type="submit" value="Submit">
              Submit
            </Button>
          </Grid>
        </Box>
      </form>
    </Container>
  );
};

export default CreateTask;

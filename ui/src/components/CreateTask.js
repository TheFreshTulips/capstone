import React, { useState, useContext, useEffect } from "react";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
// import { ThemeProvider } from "@mui/material/styles";

import {
  Button,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers";

import config from "../config";
const ApiUrl = config[process.env.REACT_APP_NODE_ENV || "development"].apiUrl;

import '../styles/SharedStyles.css';
import { TaskContext } from "../App.js";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

// for creating/adding a new task
const CreateTask = () => {
  const validPriorities = [1, 2, 3, 4, 5];
  const navigate = useNavigate();
  const tc = useContext(TaskContext);

  let now = new Date();
  let tomorrow = new Date();
  tomorrow.setDate(now.getDate()+1);
  let [input, setInput] = useState({
    title: "",
    description: "",
    priority: "",
    assigned_date: now,
    suspense_date: tomorrow,
    status: "to do",
    comments: "",
    creator_id: tc.userId,
    owners: [tc.userId],
    org_id: tc.userOrg,
  });
  let [users, setUsers] = useState([]);
  const [selectedNameOrNames, setSelectedNameOrNames] = useState([]);

  // const dtptextcolor = {
  //   typography: {
  //     allVariants: {
  //       color: "white"
  //     },
  //   }
  // };

  useEffect(async () => {
    // fetches an array of all users in the organization and then sets the state with that info
    let promiseArr = [];
    if (tc.isSupervisor) {
      await fetch(`${ApiUrl}/orgs/${tc.userOrg}/children`)
        .then((res) => res.json())
        .then((data) => {
          data.forEach(element => {
            promiseArr.push(fetch(`${ApiUrl}/users/orgs/${element.org_id}`)
              .then(res => res.json())
              .then(data => {
                // console.log(`got back from sub-org get data: `, data)
                return data;
              })
            )
          })
        })
    }

    promiseArr.push(fetch(`${ApiUrl}/users/orgs/${tc.userOrg}`)
      .then((res) => res.json())
    )

    Promise.all(promiseArr)
      .then((data) => {
        // console.log(`data: `, data)
        let allUsers = []
        data.map(element => {
          element.map((el) => {
            allUsers.push({
              id: el.user_id,
              name: el.user_name,
              rank: el.user_rank,
            })
          })
        })
        setUsers(allUsers);
      })
      .catch((err) => console.log("Error getting users array", err));
  }, []);

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelect = (event) => {
    const {
      target: { value },
    } = event;

    let returnVal;

    typeof value === "string"
      ? (returnVal = value.split(","))
      : (returnVal = value);

    setSelectedNameOrNames(returnVal);

    let ownerArray = [];
    users.map((x) => {
      if (returnVal.includes(x.name)) {
        ownerArray.push(x.id);
      }
    });

    setInput({
      ...input,
      owners: ownerArray,
    });
  };

  const handleSuspenseDateChange = (_value) => {
    handleChange({ target: { name: "suspense_date", value: _value.format() } });
  };
  const handleSubmit = (e) => {
    // console.log(`sending body:`, input);

    fetch(`${ApiUrl}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    })
      .then((res) => {
        if (res.status === 200) {
          alert("Task created!");
          navigate("/");
        } else {
          alert("task creation failed");
        }
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
        borderRadius: "5px",
        backgroundColor: "#003665",
        boxShadow: "0 0 10px #4DACFF",
      }}
    >
      <form onSubmit={handleSubmit}>
        <Box m={2} pt={3} marginTop={10}>
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
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& > fieldset": { borderColor: "white" },
                    color: "white"
                  },
                  minWidth: 350,
                }}
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
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& > fieldset": { borderColor: "white" },
                    color: "white"
                  },
                  "& .MuiSvgIcon-root": {
                    color: "white",
                  },
                  minWidth: 350,
                }}
                id="priority"
                select
                name="priority"
                value={input.priority}
                label="Priority"
                onChange={handleChange}
                required
              >
                {validPriorities.map((element) => (
                  <MenuItem
                    key={element}
                    value={element}
                    sx={{ color: "black" }}
                  >
                    {element}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
            <Box m={1}>

              <FormControl
                sx={{
                  m: 1,
                  width: 350,
                  "& .MuiOutlinedInput-root": {
                    "& > fieldset": { borderColor: "white" },
                    color: "white"
                  },
                  "& .MuiSvgIcon-root": {
                    color: "white",
                  },
                  }}>
                <InputLabel id="demo-multiple-checkbox-label">
                  Assign Task To
                </InputLabel>
                <Select
                  labelId="demo-multiple-name-label"
                  id="demo-multiple-name"
                  fullwidth
                  multiple
                  value={selectedNameOrNames}
                  onChange={handleSelect}
                  input={<OutlinedInput label="Name" />}
                  MenuProps={MenuProps}
                >
                  {/* {console.log(users)} */}
                  {users.map((el) => (
                    <MenuItem
                      key={el.id}
                      value={el.name}
                      sx={{ color: "black" }}
                    >
                      {`${el.rank} ${el.name}`}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            {/* <Box m={1}>
              <TextField
                  "& .MuiInputBase-root": {
                    color: "white",
                  },
                }}
                label="Assigned Date"
                name="assigned"
                value={input.assigned}
                onChange={handleChange}
                required="required"
              />
            </Box> */}
            <Box m={1} sx={{ minWidth: 350 }}>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <Stack spacing={3}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& > fieldset": { borderColor: "white" },
                      color: "white"
                    },
                    // "& .MuiInputLabel-root": {
                    //   color: "white",
                    // },
                    "& .MuiButtonBase-root": {
                      color: "white",
                    },

                  }}
                >
                  <DateTimePicker
                    label="Suspense Date/Time"
                    value={input.suspense_date}
                    onChange={handleSuspenseDateChange}
                    renderInput={(params) =>
                        <TextField {...params} />
                    }/>
                </Stack>
              </LocalizationProvider>
            </Box>
            <Box m={1} sx={{ minWidth: 500 }}>
              <TextField
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& > fieldset": { borderColor: "white" },
                    color: "white"
                  },
                  "& .MuiSvgIcon-root": {
                    color: "white",
                  },
                }}
                label="Description"
                type="description"
                name="description"
                fullWidth
                value={input.description}
                onChange={handleChange}
                required
              />
            </Box>
            {/* <Box m={1}>
              <TextField
                  "& .MuiInputBase-root": {
                    color: "white",
                  },
                }}
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

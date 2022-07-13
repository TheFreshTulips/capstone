import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { Button, Select, MenuItem, InputLabel, Stack } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import { TaskContext } from "../App.js";
import EditableText from "./EditableText.js";
// import { useParams } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import Fab from "@mui/material/Fab";
import { useNavigate } from "react-router-dom";
import OutlinedInput from "@mui/material/OutlinedInput";
import logo from "../loading-blue.gif";

import config from "../config";
const ApiUrl = config[process.env.REACT_APP_NODE_ENV || "development"].apiUrl;

/*
TODO:
  - get drop down info for supervisors (example in project 3)
    -implement drop down func for supervisors
    - in patch request for supervisors, if they change the owners then both a delete and post request has to be performed for owners,
      along with the patch request for the task
  - send patch request for task  creators
  - delete functionality
  - Display task owners (aka people who the task is assigned to)
  - conditional rendering for an editable suspense date if the user is the creator of the task
  - Style the page better
*/
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

let validPriorities = [1, 2, 3, 4, 5];

const TaskDetails = () => {
  /*
      change the fields to use Editable Text if the userId is equal to the userId of the task
  */
  const tc = useContext(TaskContext);
  const [ownsTask, setOwnsTask] = useState(null);
  let [isLoading, setIsLoading] = useState(null); //use this to make loading circle
  const [taskDetails, setTaskDetails] = useState({}); // this is the actual task object
  const [owners, setOwners] = useState([]); //state for JUST the owners (like the comments)
  const [comments, setComments] = useState([]);
  const [users, setUsers] = useState([]); // state for all the users in the organization
  const [selectedNameOrNames, setSelectedNameOrNames] = useState([]);
  const [input, setInput] = useState({ body: "", author_id: tc.userId }); //This input will be used for the POST for comments
  const [inputTask, setInputTask] = useState({
    title: "",
    description: "",
    priority: null,
    status: "",
    suspense_date: "",
    completed_date: "",
    owners: [],
  }); //This input will be used for PATCH for tasks
  const [isSubmit, setIsSubmit] = useState(false);
  const titleTypography = "h5";
  const valueTypography = "h6";
  let { task } = useParams();
  let navigate = useNavigate();

  let formatPatchReq = () => {
    let body = {};
    Object.keys(inputTask).forEach((x) => {
      if (inputTask[x] !== "" && inputTask[x] !== null && x != "owners") {
        body[x] = inputTask[x];
      }
    });
    if (inputTask.status === "finished") {
      body.completed_date = new Date();
    }
    console.log(body);
    return body;
  };

  function compare(a, b) {
    if (a.id < b.id) {
      return -1;
    }
    if (a.id > b.id) {
      return 1;
    }
    return 0;
  }

  const sortComments = (data) => {
    let commentArray = data; //maybe have to do a deep copy?
    commentArray.sort(compare);
    setComments(commentArray);
  };

  // const sortOwners = (data) => {
  //   let inputOwners = data.map((x) => x);
  //   setOwners(inputOwners);
  // };

  const handleChange = (e) => {
    const value = e.target.value;
    setInput({
      ...input,
      body: value,
    });
    e.preventDefault();
  };

  const handleDelete = () => {
    console.log("deleting this task:", taskDetails);
    const request = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };
    fetch(`${ApiUrl}/tasks/${taskDetails.task_id}`, request)
      .then((res) => {
        if (res.status === 200) {
          alert(`Delete of task ${taskDetails.task_id} was successful!`);
          navigate("/");
        } else {
          alert(`Delete of task ${taskDetails.task_id} failed!`);
        }
      })
      .catch((err) => {
        console.log(err);
        alert(`Failed to delete task ${taskDetails.task_id}`);
      });
  };

  const handleSubmitTask = (e) => {
    if (inputTask.owners.length > 0) {
      let url = `${ApiUrl}/owners/${taskDetails.task_id}`;
      let delBody = owners.map((x) => x.owner_id); //the state of the old owners is stored in owners
      let postBody = { owners: inputTask.owners }; //the state of the new owners is stored in taskowners

      fetch(url, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ owners: delBody }),
      }).then(
        fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(postBody),
        }).then(() => {
          alert("Task updated!");
          setIsSubmit(!isSubmit);
        })
      );
    }

    let request = "PATCH";
    let body = formatPatchReq();
    let url = `${ApiUrl}/tasks/${taskDetails.task_id}`;

    if (Object.keys(body).length > 0) {
      fetch(url, {
        method: request,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }).then((res) => {
        console.log(res);
        setIsSubmit(!isSubmit);
      });
      e.preventDefault();
    }
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

    setInputTask({
      ...inputTask,
      owners: ownerArray,
    });
  };

  const handleSubmitComments = (e) => {
    console.log(`sending body:`, input);
    fetch(`${ApiUrl}/tasks/${taskDetails.task_id}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        alert("Comment posted");
        setIsSubmit(!isSubmit);
      })
      .catch((err) => {
        console.log(err);
        alert(`Failed to post comment`);
      });
    e.preventDefault();
  };

  useEffect(() => {
    setIsLoading(true);
    let url = `${ApiUrl}/tasks/${task}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setTaskDetails(data[0]);
        //setComments(data[0].comments)
        return data[0];
      })
      .then((data) => {
        sortComments(data.comments);
        setOwners(data.owners);

        let owner_ids = data.owners.map((x) => x.owner_id);
        console.log(data.author_id);
        console.log(tc.userId);
        setOwnsTask(
          tc.userId === data.author_id || owner_ids.includes(tc.userId)
        ); //change this back to the line above once the author_id is being passed by the API
      })
      .then(() => setTimeout(() => setIsLoading(false), 250))
      .catch((err) => console.log(err));
  }, [isSubmit]);

  useEffect(() => {
    setIsLoading(true);
    // fetches an array of all users in the organization and then sets the state with that info
    fetch(`${ApiUrl}/users/orgs/${tc.userOrg}`)
      .then((res) => res.json())
      .then((data) => {
        setUsers(
          data.map((el) => {
            return {
              id: el.user_id,
              name: el.user_name,
              rank: el.user_rank,
              email: el.user_email,
            };
          })
        );
      })
      .then(() => setTimeout(() => setIsLoading(false), 250))
      .catch((err) => console.log("Error getting users array", err));
  }, []);

  const convertDateTime = (zuluTime) => {
    return new Date(zuluTime).toLocaleString("en-US");
  };

  return (
    <>
      <Box m={3}></Box>
      <Box  sx={{ width: "90%", margin:"auto"}}>
        {isLoading ? (
              <Grid container display='flex' justifyContent='center' direction='column' alignItems='center'>
                <img src={logo} width="400px" alt="loading-spinner" />
                <Typography variant="h3" align='center' style={{color: 'white'}}>Loading...</Typography>
              </Grid>
            ) : (
              <>
                <Paper elevation={8} style={{backgroundColor : "white"}} >
                <Grid container spacing={5}>
                  {ownsTask ? (
                    <>
                    <Grid item xs={4} display="flex" justifyContent="left" marginLeft = {5}>
                        <Button variant="contained" onClick={handleSubmitTask}>
                          Submit Changes
                        </Button>
                      </Grid>
                    <Grid item xs={7} display="flex" justifyContent="right">
                        <Fab color="error" aria-label="delete" onClick={handleDelete}>
                          <DeleteIcon />
                        </Fab>
                    </Grid>
                    </>
                  ) : null}

                  <Grid item xs={12} display="flex" justifyContent="center">
                    <EditableText
                      field="title"
                      val={taskDetails.task_title}
                      canEdit={ownsTask}
                      callback={setInputTask}
                      input={inputTask}
                      typography="h4"
                    />
                  </Grid>

                  <Grid item xs={6} display="flex" justifyContent="center">
                    <Stack alignItems={"center"}>
                      <Typography variant={titleTypography} color= "#1D4367">Priority:</Typography>
                      <EditableText
                        field="priority"
                        val={taskDetails.task_priority}
                        canEdit={ownsTask}
                        callback={setInputTask}
                        input={inputTask}
                        typography={valueTypography}
                        input_type="dropdown"
                        dropdown={validPriorities}
                      />
                    </Stack>
                  </Grid>

                  <Grid item xs={6} display="flex" justifyContent="center">
                    <Stack alignItems={"center"}>
                      <Typography variant={titleTypography}>Status:</Typography>
                      <EditableText
                        field="status"
                        val={taskDetails.task_status}
                        canEdit={ownsTask}
                        callback={setInputTask}
                        input={inputTask}
                        input_type="dropdown"
                        dropdown={["to do", "in progress", "finished"]}
                        typography={valueTypography}
                      />
                    </Stack>
                  </Grid>

                  <Grid item xs={6} display="flex" justifyContent="center">
                    <Stack alignItems={"center"}>
                      <Typography variant={titleTypography}>Assigned Date:</Typography>
                      <Typography paddingTop={2}>{`${convertDateTime(
                        taskDetails.task_assigned_date
                      )}`}</Typography>
                    </Stack>
                  </Grid>

                  <Grid item xs={6} display="flex" justifyContent="center">
                    <Stack alignItems={"center"}>
                      <Typography variant={titleTypography}>Suspense Date:</Typography>
                      <EditableText
                        field="suspense_date"
                        val={taskDetails.task_suspense_date}
                        canEdit={ownsTask}
                        callback={setInputTask}
                        input={inputTask}
                        input_type="date"
                      />
                    </Stack>
                  </Grid>

                  <Grid item xs={12}>
                    <Stack alignItems={"center"}>
                      <Typography variant={titleTypography}>Details:</Typography>
                      <EditableText
                        field="description"
                        val={taskDetails.task_description}
                        canEdit={ownsTask}
                        callback={setInputTask}
                        input={inputTask}
                        input_type="large"
                        typography={valueTypography}
                      />
                    </Stack>
                  </Grid>

                  <Grid item xs={6} display="flex" justifyContent="center">
                    <Stack alignItems={"center"}>
                      <Typography>Assigned To:</Typography>
                      <Box m={2}>
                        {owners.map((owner, index) => (
                          <Typography
                            key={index}
                          >{`${owner.owner_rank} ${owner.owner_name}`}</Typography>
                        ))}
                      </Box>
                    </Stack>
                  </Grid>
                  {ownsTask ? (
                    <Grid item xs={6} display="flex" justifyContent="center">
                      <FormControl sx={{ m: 1, width: 300 }}>
                        <InputLabel id="demo-multiple-checkbox-label">
                          Reassign Task
                        </InputLabel>
                        <Select
                          labelId="demo-multiple-name-label"
                          id="demo-multiple-name"
                          multiple
                          value={selectedNameOrNames}
                          onChange={handleSelect}
                          input={<OutlinedInput label="Name" />}
                          MenuProps={MenuProps}
                        >
                          {users.map((el) => (
                            <MenuItem key={el.id} value={el.name}>
                              {el.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                  ) : (
                    <></>
                  )}
                </Grid>
                </Paper>

                <Container>
                  <Box marginTop = {5}><Typography variant="h4" sx={{ fontFamily: "sans-serif" }} >{`Comments`}</Typography></Box>
                  <Paper
                    elevation = {10}
                    style={{
                      padding: "40px 20px",
                      color: "#a0b3c4",
                      backgroundColor: "rgba(74,104,133,0.44)",
                    }}
                    sx={{ fontFamily: "sans-serif" }}
                  >
                    {comments.map((comment) => {
                      return (
                        <>
                          <Grid container wrap="nowrap" spacing={2}>
                            <Grid justifyContent="left" item xs zeroMinWidth>
                              <h4 style={{ margin: 0, textAlign: "left" }}>
                                {`${comment.user_rank} ${comment.user_name}`}
                              </h4>
                              <p style={{ textAlign: "left" }}>
                                {comment.comment_body}
                              </p>
                              <p style={{ textAlign: "left", color: "gray" }}>
                                {convertDateTime(comment.comment_timestamp)}
                              </p>
                            </Grid>
                          </Grid>
                        </>
                      );
                    })}
                    <form onSubmit={handleSubmitComments}>
                      <TextField
                        fullWidth
                        id="outlined-basic"
                        label="Add a comment"
                        variant="outlined"
                        onChange={handleChange}
                      />
                      <Button
                        className="submitButton"
                        type="submit"
                        value="Submit"
                        size="small"
                      >
                        {" "}
                        Done{" "}
                      </Button>
                    </form>
                  </Paper>
                </Container>
              </>
        ) }
      </Box>
    </>
  );
};

export default TaskDetails;
/*{validRanks.map((rank, index) => <MenuItem key={index} value={rank}>{rank}</MenuItem>)} */

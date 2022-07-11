import React, { useState, useEffect, useContext } from "react";
import { useParams } from 'react-router-dom'
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { Button, Select, MenuItem, InputLabel } from "@mui/material";
import FormControl from '@mui/material/FormControl';
import { TaskContext } from "../App.js";
import EditableText from "./EditableText.js"
// import { useParams } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import Fab from "@mui/material/Fab";
import { useNavigate } from 'react-router-dom'

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
  - Display task owners
  - conditional rendering for an editable suspense date if the user is the creator of the task
  - Style the page better
*/

const TaskDetails = () => {
  /*
      change the fields to use Editable Text if the userId is equal to the userId of the task
  */
  const tc = useContext(TaskContext);
  const [ownsTask, setOwnsTask] = useState(null)
  const [taskDetails, setTaskDetails] = useState({}); // this is the actual task object
  const [owners, setOwners] = useState([]) //state for JUST the owners (like the comments)
  const [comments, setComments] = useState([]);
  const [users, setUsers] = useState([])
  const [selectedName, setSelectedName] = useState([])
  const [input, setInput] = useState({body: "", author_id : tc.userId}) //This input will be used for the POST for comments
  const [inputTask, setInputTask] = useState({title: "", description:"", priority:null, status:"", suspense_date:"", owners: []}) //This input will be used for PATCH for tasks
  const [isSubmit, setIsSubmit] = useState(false)
  let { task } = useParams();
  let navigate = useNavigate();

let formatPatchReq = () =>{
  let body = {}
  Object.keys(inputTask).forEach((x) => {
    if (inputTask[x] !== '' && inputTask[x] !== null && x != "owners"){
      body[x] = inputTask[x]
      }
  })
  console.log(body)
  return body
}

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
    console.log(commentArray)
    setComments(commentArray)
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setInput({
      ...input,
      body: value
    });
    e.preventDefault();
  }

  const handleDelete = async () => {
    console.log('deleting this task:', taskDetails)

    // await fetch(`${ApiUrl}/tasks/${taskDetails.task_id}`, { method: 'DELETE'})
    //   .then(() => alert('Task deleted!'))
    //   navigate('/')
      console.log('delete is supposed to happen, we need to fix this')
  }

  const handleSubmitTask = (e) => {

    if (inputTask.owners.length > 0){
      let url = `${ApiUrl}/owners/${taskDetails.task_id}`
      let delBody = owners //the state of the old owners is stored in owners
      let postBody = {owners : inputTask.owners} //the state of the new owners is stored in taskowners

      fetch(url, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(delBody),
      })
        .then(fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(postBody),
      }))
    }

    let request = 'PATCH'
    let body = formatPatchReq()
    let url = `${ApiUrl}/tasks/${taskDetails.task_id}`

    fetch(url, {
        method: request,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
    })
    .then(res => {
        console.log(res)
    })
    e.preventDefault()
  }

  const handleSelect = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedName(
      typeof value === 'string' ? value.split(',') : value,
    )
    setInputTask({
      ...inputTask,
      owners: inputTask.owners.push(value)
    })
  }

  const handleSubmitComments = (e) => {
    console.log(`sending body:`, input)
    fetch(`${ApiUrl}/tasks/${taskDetails.task_id}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        alert("Comment posted");
        setIsSubmit(!isSubmit)
      })
      .catch((err) => {
        console.log(err);
        alert(`Failed to post comment`);
      });
    e.preventDefault();
  };

  useEffect(() => {
    let url = `${ApiUrl}/tasks/${task}`
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setTaskDetails(data[0]);
        //setComments(data[0].comments)
        setOwners(data[0].owners)
        return data[0]
      })
      .then((data) => {
        sortComments(data.comments);
        setOwners(data.owners)
        //  setOwnsTask(data.author_id === tc.userId) //if the author of the task is the same user in the global context they can edit the task
        setOwnsTask(tc.userId === data.task_id); //change this back to the line above once the author_id is being passed by the API
      })
      .catch((err) => console.log(err));
  }, [isSubmit]);

  useEffect(() => {
    // fetches and sets an array of all users in the organization in the state
    fetch(`${ApiUrl}/users/orgs/${tc.userOrg}`)
      .then(res => res.json())
      .then(data => {
        setUsers(data.map((el) => {
          return (
            {
              id: el.user_id,
              name: el.user_name,
              rank: el.user_rank,
              email: el.user_email
            }
          )
        }))
      })
      .catch((err) => console.log('Error getting users array', err))
  }, [])

  console.log(users)



  return (
    <>
      <Box marginTop={5} sx={{ width: "100%" }}>
        <Box m={2}><Typography variant="h5">{`Task #${taskDetails.task_id}`}</Typography></Box>
        {ownsTask ? (
          <Box m={4} display='flex' justifyContent='right'>
            <Fab color="primary" aria-label="add" onClick={handleDelete}>
              <DeleteIcon />
            </Fab>
            <Button variant = "outlined" onClick = {handleSubmitTask}>Submit Changes Here</Button>
          </Box>
        ) : null}
        <Grid
          container
          spacing={3}
        >
          <Grid item xs={6} display="flex" justifyContent="center">
            <EditableText field = 'title' val = {taskDetails.task_title} canEdit = {ownsTask} callback = {setInputTask} input={inputTask}/>
          </Grid>

          <Grid item xs={6} display="flex" justifyContent="center">
            <EditableText field = 'priority' val = {taskDetails.task_priority} canEdit = {ownsTask} callback = {setInputTask} input={inputTask}/>
          </Grid>

          <Grid item xs={6} display="flex" justifyContent="center">
            <EditableText field = 'status' val = {taskDetails.task_status} canEdit = {ownsTask} callback = {setInputTask} input={inputTask}/>
          </Grid>

          <Grid item xs={6} display="flex" justifyContent="center">
            <Typography>{`Assigned Date: ${taskDetails.task_assigned_date}`}</Typography>
          </Grid>

          <Grid item xs={6} display="flex" justifyContent="center">
            <EditableText field = 'suspense_date' val = {taskDetails.task_suspense_date} canEdit = {ownsTask} callback = {setInputTask} input={inputTask} input_type ="date"/>
          </Grid>

          <Grid item xs={12} display="flex" justifyContent="center">
            <EditableText field = 'description' val = {taskDetails.task_description} canEdit = {ownsTask} callback = {setInputTask} input={inputTask} input_type="large"/>
          </Grid>

          <Grid item xs={12} display="flex" justifyContent="center">
            <Typography>
              Assigned To:
            </Typography>
            <>
            {
              //owners.map(owner => <Typography>{`${owner.user_rank} ${owner.user_name}`}</Typography>)
            }
            </>
            <FormControl sx={{ m: 1, width: 300 }}>
              <InputLabel id='multi-select-label'>Name</InputLabel>
              <Select
                labelId='multi-select-label'
                multiple
                value={selectedName}
                onChange={handleSelect}
                id='multi-select-name'
                input={<OutlinedInput label="Tag" />}
                renderValue={(selected) => selected.join(', ')}
                MenuProps={MenuProps}
              >
                {users.map((el) => (
                  <MenuItem key={el.id} value={el.id}>
                    <Checkbox checked={selectedName.indexOf(el.name) > -1} />
                    <ListItemText primary={el.name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

        </Grid>

        <Container>
          <h1>Comments</h1>
          <Paper style={{ padding: "40px 20px" }}>
            {comments.map((comment) => {
              return (
                <>
                  <Grid container wrap="nowrap" spacing={2}>
                    <Grid justifyContent="left" item xs zeroMinWidth>
                      <h4 style={{ margin: 0, textAlign: "left" }}>
                        {`${comment.user_rank} ${comment.user_name}`}
                      </h4>
                      <p style={{ textAlign: "left" }}>{comment.comment_body}</p>
                      <p style={{ textAlign: "left", color: "gray" }}>
                        {comment.comment_timestamp}
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
                onChange = {handleChange}
              />
              <Button className="submitButton" type="submit" value="Submit" size="small" > Done </Button>
            </form>
          </Paper>
        </Container>
      </Box>
    </>
  );
};

export default TaskDetails;
/*{validRanks.map((rank, index) => <MenuItem key={index} value={rank}>{rank}</MenuItem>)} */
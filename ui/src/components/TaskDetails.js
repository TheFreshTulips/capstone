import React, { useState, useEffect, useContext } from "react";
import { useParams } from 'react-router-dom'
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { TaskContext } from "../App.js";
import EditableText from "./EditableText.js"
// import { useParams } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import Fab from "@mui/material/Fab";
import { useNavigate } from 'react-router-dom'

import config from "../config";
const ApiUrl = config[process.env.REACT_APP_NODE_ENV || "development"].apiUrl;

/*
scroll container for comments?
*/

const TaskDetails = () => {
  /*
      change the fields to use Editable Text if the userId is equal to the userId of the task
  */
  const tc = useContext(TaskContext);
  const [ownsTask, setOwnsTask] = useState(null)
  const [taskDetails, setTaskDetails] = useState({}); // this is the actual task object
  const [comments, setComments] = useState([]);
  const [input, setInput] = useState({body: "", author_id : tc.userId}) //ADD AUTHOR_ID  author_id : tc.userId
  const [inputTask, setInputTask] = useState({})
  const [isSubmit, setIsSubmit] = useState(false)
  let { task } = useParams();
  let navigate = useNavigate();

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

  const handleSubmit = (e) => {
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
        setComments(data[0].comments)
        return data[0]
      })
      .then((data) => {
        sortComments(data.comments);
        //  setOwnsTask(data.author_id === tc.userId) //if the author of the task is the same user in the global context they can edit the task
        setOwnsTask(true); //change this back to the line above once the author_id is being passed by the API
      })
      .catch((err) => console.log(err));
  }, [isSubmit]);


  //NOTE: To edit fields in place, change the Typography to Editable Text, pass the setInput as a "callback" prop for the function
  //If the canEdit field is false then it won't be editable. The only thing that might need to be customized for this project
  //is if you want the type of text to be different between the different fields.
  //NOTE: conditional rendering for the suspense date if the user
  return (
    <>
      <Box marginTop={5} sx={{ width: "100%" }}>
        <Box m={2}><Typography variant="h5">{`Task #${taskDetails.task_id}`}</Typography></Box>
        {ownsTask ? (
          <Box m={4} display='flex' justifyContent='right'>
            <Fab color="primary" aria-label="add" onClick={handleDelete}>
              <DeleteIcon />
            </Fab>
          </Box>
        ) : null}
        <Grid
          container
          spacing={3}
        >
          <Grid item xs={6} display="flex" justifyContent="center">
            <EditableText field = 'title' val = {taskDetails.task_title} canEdit = {tc.userId === taskDetails.task_id} callback = {setInputTask}/>
          </Grid>
          <Grid item xs={6} display="flex" justifyContent="center">
            <EditableText field = 'priority' val = {taskDetails.task_priority} canEdit = {tc.userId === taskDetails.task_id} callback = {setInputTask}/>
          </Grid>
          <Grid item xs={6} display="flex" justifyContent="center">
            <EditableText field = 'status' val = {taskDetails.task_status} canEdit = {tc.userId === taskDetails.task_id} callback = {setInputTask}/>
          </Grid>
          <Grid item xs={6} display="flex" justifyContent="center">
            <Typography>{`Assigned Date: ${taskDetails.task_assigned_date}`}</Typography>
          </Grid>
          <Grid item xs={6} display="flex" justifyContent="center">
            <Typography>{`Suspense Date: ${taskDetails.task_suspense_date}`}</Typography>
          </Grid>
          <Grid item xs={12} display="flex" justifyContent="center">
            <Typography>{`Description:\n${taskDetails.task_description}`}</Typography>
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
            <form onSubmit={handleSubmit}>
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

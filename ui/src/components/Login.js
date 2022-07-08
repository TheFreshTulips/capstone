import React, { useEffect, useState, useContext } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { Alert } from "@mui/material";
import config from "../config";
import { useNavigate, Link } from "react-router-dom";
const ApiUrl = config[process.env.REACT_APP_NODE_ENV || "development"].apiUrl;

import { TaskContext } from "../App.js";

const Login = () => {
  let [input, setInput] = useState({
    email: '',
    password: '',
  })
  const [feedback, setFeedback] = useState('');
  let navigate = useNavigate();
  const tc = useContext(TaskContext);

  // const handleSubmit = () => {
  //   console.log("success")
  //   console.log(tc.userId)
  // }

  const handleSubmit = async (event) => {
    event.preventDefault()

    let error = false;

    //resets feedback states to empty
    let tempFeedback = ''

    //data validation for each input field



    if (!input.email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )) {
      tempFeedback += 'invalid email format\n';
      error = true;
    }
    setFeedback(tempFeedback);
    if (error === false) {
      let isAuthenticated = false;
      let res = await fetch(`${ApiUrl}/login`, {
          method: "POST",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(input)
        })
        .then(response => {
          //console.log("RESPONSE AFTER SIGNING IN", response.json())
          if (response.ok) {
            isAuthenticated = true;
            return response.json();
          } else if (response.status === 401) {
            isAuthenticated = false
            console.log("Unsuccessfull login")
            return;
          }
        })
        .then(data => {
          // res is the id of the user that signed in
          if (isAuthenticated) {
            console.log(`data: `, data)
            tc.setIsAdmin(data.position === "admin")
            tc.setUserId(data.id);
            if(data.org_id) {
              tc.setUserOrg(data.org_id)
            }
            navigate(`/`)
          }
        })
        .catch(error => console.log('error is', error));


      // console.log("RES VALUE", res);
    }

  }

  const handleChange = (e) => {
    const value = e.target.value;
    setInput({
      ...input,
      [e.target.name]: value
    });
    e.preventDefault();
  }

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
              <Typography variant="h5">Login</Typography>
            </Box>
            <Box m={1}>
              <Typography variant="body1" color="red">{feedback}</Typography>
            </Box>
            <Box m={1}>
              <TextField
                label="Email"
                name="email"
                value={input.email}
                onChange={handleChange}
                required
              />
            </Box>
            <Box m={1}>
              <TextField
                label="Password"
                type="password"
                name="password"
                value={input.password}
                onChange={handleChange}
                required
              />
            </Box>
            <Box m={2} pt={3}></Box>
            <Button className="submitButton" type="submit" value="Submit">
              Submit
            </Button>
            <Link to={"/register"} style={{ textDecoration: 'none', color: "black", "paddingBottom":"10px"}}>
              <Typography variant="h6" >Need to register? Click here to be taken to the registration page!</Typography>
            </Link>
        </Grid>
      </Box>
    </form>
    </Container >
  );
};

export default Login;

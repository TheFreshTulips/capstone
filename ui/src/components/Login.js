import React, { useState, useContext } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import config from "../config";
import { useNavigate, Link } from "react-router-dom";
const ApiUrl = config[process.env.REACT_APP_NODE_ENV || "development"].apiUrl;
import "../styles/SharedStyles.css";

import { TaskContext } from "../App.js";

const Login = () => {
  let [input, setInput] = useState({
    email: "",
    password: "",
  });
  const [feedback, setFeedback] = useState("");
  let navigate = useNavigate();
  const tc = useContext(TaskContext);

  const handleSubmit = async (event) => {
    event.preventDefault();

    let error = false;

    //resets feedback states to empty
    let tempFeedback = "";

    //data validation for each input field

    if (
      !input.email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ //eslint-disable-line
      )
    ) {
      tempFeedback += "invalid email format\n";
      error = true;
    }
    setFeedback(tempFeedback);
    if (error === false) {
      let isAuthenticated = false;
      await fetch(`${ApiUrl}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      })
        .then((response) => {
          //console.log("RESPONSE AFTER SIGNING IN", response.json())
          if (response.ok) {
            isAuthenticated = true;
            return response.json();
          } else if (response.status === 404) {
            setFeedback("email not found");
            console.log("email not found");
            return;
          } else if (response.status === 400) {
            setFeedback("invalid password");
            console.log("invalid password");
          } else {
            setFeedback("an error occurred");
            console.log("an error occurred");
          }
        })
        .then((data) => {
          // res is the id of the user that signed in
          if (isAuthenticated) {
            console.log(`data: `, data);
            tc.setIsAdmin(data.position === "admin");
            tc.setIsSupervisor(data.position === "supervisor");
            tc.setUserId(data.id);
            if (data.org_id) {
              tc.setUserOrg(data.org_id);
            }
            navigate(`/`);
          }
        })
        .catch((error) => console.log("error is", error));

      // console.log("RES VALUE", res);
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setInput({
      ...input,
      [e.target.name]: value,
    });
    e.preventDefault();
  };

  return (
    <Container
      maxWidth="lg"
      className="post-page"
      sx={{
        marginBottom: "0",
        marginTop: "30px",
        boxShadow: "0 0 10px #4DACFF",
        borderRadius: "5px",
        backgroundColor: "#003665",
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
              <Typography variant="body1" color="red">
                {feedback}
              </Typography>
            </Box>
            <Box m={1} color="white">
              <TextField
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& > fieldset": { borderColor: "white" },
                    color: "white"
                  },
                }}
                label="Email"
                name="email"
                value={input.email}
                onChange={handleChange}
                required
                variant="outlined"
              />
            </Box>
            <Box m={1}>
              <TextField
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& > fieldset": { borderColor: "white" },
                    color: "white"
                  },
                }}
                label="Password"
                type="password"
                name="password"
                value={input.password}
                onChange={handleChange}
                required
                // sx={{
                //   "& .MuiInputBase-root": {
                //     color: "white",
                //   },
                // }}
              />
            </Box>
            <Box m={2} pt={3}></Box>
            <Button className="submitButton" type="submit" value="Submit">
              Submit
            </Button>
            <Link
              to={"/register"}
              style={{
                textDecoration: "none",
                color: "white",
                paddingBottom: "10px",
              }}
            >
              <Typography variant="h6" className="underline-on-hover-link">
                New member? Click here to register
              </Typography>
            </Link>
          </Grid>
        </Box>
      </form>
    </Container>
  );
};

export default Login;
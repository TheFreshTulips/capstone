import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
//import { makeStyles } from "@material-ui/core/styles";
import { Button, MenuItem } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import config from "../config";

const ApiUrl = config[process.env.REACT_APP_NODE_ENV || "development"].apiUrl;

// const useStyles = makeStyles({
//   input: {
//     color: "white"
//   }
// });

const Register = () => {
  //const classes = useStyles();
  const navigate = useNavigate();

  let [input, setInput] = useState({
    name: "",
    rank: "",
    email: "",
    position_id: 1,
    password: "",
    org_id: null,
  });

  const validRanks = [
    "CIV",
    "Spc 1",
    "Spc 2",
    "Spc 3",
    "Spc 4",
    "Sgt",
    "TSgt",
    "MSgt",
    "SMSgt",
    "CMSgt",
    "2d Lt",
    "1st Lt",
    "Capt",
    "Maj",
    "Lt Col",
    "Col",
    "Brig Gen",
    "Maj Gen",
    "Lt Gen",
    "Gen",
  ];

  const [password2, setPassword2] = useState("");
  const [feedback, setFeedback] = useState("");

  const [orgs, setOrgs] = useState([]);

  useEffect(() => {
    let url = `${ApiUrl}/orgs`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => setOrgs(data));
  }, []);

  const handleChange = (e) => {
    // sets Input state depending on what the user inputted into registration fields

    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    e.preventDefault();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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
    if (input.password !== password2) {
      tempFeedback += "passwords must match\n";
      error = true;
    }
    setFeedback(tempFeedback);
    if (error === false) {
      // sends post request with input state info to API when user clicks submit/register
      fetch(`${ApiUrl}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      })
        .then((res) => {
          if (res.status === 200) {
            alert("Registration successful!");
            navigate("/login");
          } else {
            alert("Registration failed!");
          }
        })
        .catch((err) => {
          console.log(err);
          alert(`Failed to register new user`);
        });
    }
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
        <Box m={2} pt={3}>
          <Grid
            container
            spacing={3}
            direction="column"
            alignItems="center"
            justifyContent="space-evenly"
          >
            <Box m={2} pt={3}>
              <Typography variant="h4">Register Here</Typography>
            </Box>

            <Box m={1}>
              <Typography variant="body1" color="red">
                {feedback}
              </Typography>
            </Box>
            <Box m={1}>
              <TextField
                sx={{
                  "& .MuiInputBase-root": {
                    color: "white",
                  },
                }}
                //inputProps={{ className: classes.input }}
                label="Name"
                type="name"
                name="name"
                value={input.name}
                onChange={handleChange}
                required
                maxLength={50}
              />
            </Box>
            <Box m={1}>
              <TextField
                sx={{
                  "& .MuiInputBase-root": {
                    color: "white",
                  },
                  minWidth: 223,
                }}
                id="rank"
                select
                value={input.rank}
                label="Rank"
                onChange={handleChange}
                name="rank"
                required
              >
                {validRanks.map((rank, index) => (
                  <MenuItem key={index} value={rank} sx={{ color: "black" }}>
                    {rank}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
            <Box m={1}>
              <TextField
                sx={{
                  "& .MuiInputBase-root": {
                    color: "white",
                  },
                  minWidth: 223,
                }}
                id="org"
                select
                value={input.org_id}
                label="Organization"
                onChange={handleChange}
                name="org_id"
                required
              >
                {orgs.map((org) => (
                  <MenuItem
                    key={org.org_id}
                    value={org.org_id}
                    sx={{ color: "black" }}
                  >
                    {org.org_name}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
            <Box m={1}>
              <TextField
                sx={{
                  "& .MuiInputBase-root": {
                    color: "white",
                  },
                }}
                label="Email"
                name="email"
                value={input.email}
                onChange={handleChange}
                required
                maxLength={50}
              />
            </Box>
            <Box m={1}>
              <TextField
                sx={{
                  "& .MuiInputBase-root": {
                    color: "white",
                  },
                }}
                label="Password"
                type="password"
                name="password"
                value={input.password}
                onChange={handleChange}
                required
                maxLength={50}
              />
            </Box>
            <Box m={1}>
              <TextField
                sx={{
                  "& .MuiInputBase-root": {
                    color: "white",
                  },
                }}
                label="Re-Enter Password"
                type="password"
                name="password2"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
                required
                maxLength={50}
              />
            </Box>
            <Box m={2} pt={3}></Box>
            <Button className="submitButton" type="submit" value="Submit">
              Register
            </Button>
            <Link
              to={"/login"}
              style={{
                textDecoration: "none",
                color: "black",
              }}
              className="register-link"
            >
              <Typography variant="h6">
                Already have an account? Click here to be taken to the login
                page!
              </Typography>
            </Link>
          </Grid>
        </Box>
      </form>
    </Container>
  );
};

export default Register;

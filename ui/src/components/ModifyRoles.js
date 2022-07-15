import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Button, MenuItem } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import Fab from "@mui/material/Fab";
import Paper from "@mui/material/Paper";

import config from "../config";
const ApiUrl = config[process.env.REACT_APP_NODE_ENV || "development"].apiUrl;

const ModifyRoles = () => {
  const navigate = useNavigate();

  let { id } = useParams();

  let [input, setInput] = useState({
    name: "",
    rank: "",
    org_id: 0,
    email: "",
    position_id: 0,
  });

  const positions = [
    { name: "member", id: 1 },
    { name: "supervisor", id: 2 },
    { name: "admin", id: 3 },
  ];
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
  const [orgs, setOrgs] = useState([]);

  const [feedback, setFeedback] = useState("");
  const handleDelete = () => {
    fetch(`${ApiUrl}/users/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        if (res.status === 200) {
          alert(`Delete on user ${id} was successful!`);
          navigate("/admin/roles");
        } else {
          alert(`Delete on user ${id} failed!`);
        }
      })
      .catch((err) => {
        console.log(err);
        alert(`Failed to delete user ${id}`);
      });
  };
  useEffect(() => {
    fetch(`${ApiUrl}/users/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(`data on user ${id}: `, data[0]);
        setInput({
          name: data[0].user_name,
          rank: data[0].user_rank,
          org_id: data[0].org_id,
          email: data[0].user_email,
          position_id: data[0].position_id,
        });
      });
    fetch(`${ApiUrl}/orgs`)
      .then((res) => res.json())
      .then((data) => setOrgs(data));
  }, [id]);

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

    setFeedback(tempFeedback);
    if (error === false) {
      // sends post request with input state info to API when user clicks submit/register
      fetch(`${ApiUrl}/users/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      })
        .then((res) => {
          if (res.status === 200) {
            alert(`Update on user ${id} was successful!`);
            navigate("/admin/roles");
          } else {
            alert(`Update on user ${id} failed!`);
          }
        })
        .catch((err) => {
          console.log(err);
          alert(`Failed to update user ${id}`);
        });
    }
  };

  return (
    <Container
      maxWidth="lg"
      className="post-page"
      sx={{
        marginBottom: "0",
        marginTop: "30px",
      }}
    >
      <Paper
        elevation={5}
        style={{
          marginTop:"20px",
          backgroundColor: "#003665",
          boxShadow: "0 0 10px #4DACFF",
          borderRadius: "5px",
        }}
      >
        <Grid container alignItems="center">
          <Grid item xs={6} justifyContent="left" display="flex">
            <Link
              to={"/admin/roles"}
              style={{ textDecoration: "none", color: "black" }}
              className="roles-link"
            >
              <Typography variant="h6" m={2}>
                Back to the roles page
              </Typography>
            </Link>
          </Grid>
          <Grid item xs={6} justifyContent="right" display="flex" p={2}>
            <Fab color="error" aria-label="delete" onClick={handleDelete}>
              <DeleteIcon />
            </Fab>
          </Grid>
        </Grid>
        <form onSubmit={handleSubmit}>
          <Box m={2}>
            <Grid
              container
              spacing={3}
              direction="column"
              alignItems="center"
              justifyContent="space-evenly"
            >
              <Box m={2}>
                <Typography variant="h4">Modify Role</Typography>
              </Box>
              <Box m={1}>
                <Typography variant="body1" color="red">
                  {feedback}
                </Typography>
              </Box>
              <Box m={1}>
                <TextField
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& > fieldset": { borderColor: "white" },
                      color: "white"
                    },
                  }}
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
                    "& .MuiOutlinedInput-root": {
                      "& > fieldset": { borderColor: "white" },
                      color: "white"
                    },
                    "& .MuiSvgIcon-root": {
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
                    "& .MuiOutlinedInput-root": {
                      "& > fieldset": { borderColor: "white" },
                      color: "white"
                    },
                    "& .MuiSvgIcon-root": {
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
                  maxLength={50}
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
                    minWidth: 223,
                  }}
                  id="position"
                  select
                  value={input.position_id}
                  label="Position"
                  onChange={handleChange}
                  name="position_id"
                  required
                >
                  {positions.map((position) => (
                    <MenuItem
                      key={position.id}
                      value={position.id}
                      sx={{ color: "black" }}
                    >
                      {position.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>
              <Box m={2} pt={3}>
                <Button className="submitButton" type="submit" value="Submit">
                  Submit Changes
                </Button>
              </Box>
            </Grid>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default ModifyRoles;

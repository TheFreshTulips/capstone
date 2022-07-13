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

import config from "../config";
const ApiUrl = config[process.env.REACT_APP_NODE_ENV || "development"].apiUrl;

const ModifyRoles = () => {
  const navigate = useNavigate();

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

  let { id } = useParams();

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
        boxShadow: "0 0 10px rgb(10, 31, 10)",
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
            <Typography variant="h6">Back to the roles page</Typography>
          </Link>
        </Grid>
        <Grid item xs={6} justifyContent="right" display="flex">
          <Fab color="error" aria-label="delete" onClick={handleDelete}>
            <DeleteIcon />
          </Fab>
        </Grid>
      </Grid>
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
              <Typography variant="h5">Modify Role</Typography>
            </Box>

            <Box m={1}>
              <Typography variant="body1" color="red">
                {feedback}
              </Typography>
            </Box>
            <Box m={1}>
              <TextField
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
                id="rank"
                select
                value={input.rank}
                label="Rank"
                onChange={handleChange}
                name="rank"
                required
                sx={{ minWidth: 223 }}
              >
                {validRanks.map((rank, index) => (
                  <MenuItem key={index} value={rank}>
                    {rank}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
            <Box m={1}>
              <TextField
                id="org"
                select
                value={input.org_id}
                label="Organization"
                onChange={handleChange}
                name="org_id"
                required
                sx={{ minWidth: 223 }}
              >
                {orgs.map((org) => (
                  <MenuItem key={org.org_id} value={org.org_id}>
                    {org.org_name}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
            <Box m={1}>
              <TextField
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
                id="position"
                select
                value={input.position_id}
                label="Position"
                onChange={handleChange}
                name="position_id"
                required
                sx={{ minWidth: 223 }}
              >
                {positions.map((position) => (
                  <MenuItem key={position.id} value={position.id}>
                    {position.name}
                  </MenuItem>
                ))}
              </TextField>
            </Box>

            <Box m={2} pt={3}></Box>
            <Button className="submitButton" type="submit" value="Submit">
              Submit Changes
            </Button>
          </Grid>
        </Box>
      </form>
    </Container>
  );
};

export default ModifyRoles;

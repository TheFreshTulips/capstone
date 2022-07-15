import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Button, MenuItem } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import Fab from "@mui/material/Fab";
import DeleteIcon from "@mui/icons-material/Delete";
import Paper from "@mui/material/Paper";

import config from "../config";
const ApiUrl = config[process.env.REACT_APP_NODE_ENV || "development"].apiUrl;

const ModifyOrgs = () => {
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState("");
  const [orgs, setOrgs] = useState([]);

  let { id } = useParams();
  let [input, setInput] = useState({
    name: "",
    parent_name: "",
    parent_id: 0,
    img_url: "",
  });

  useEffect(() => {
    fetch(`${ApiUrl}/orgs/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(`data on orgs ${id}: `, data[0]);
        setInput({
          name: data[0].org_name,
          img_url: data[0].org_img_url,
          parent_id: data[0].org_parent_id,
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
      input.name.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ //eslint-disable-line
      )
    ) {
      tempFeedback += "invalid name format\n";
      error = true;
    }

    setFeedback(tempFeedback);
    if (error === false) {
      // sends post request with input state info to API when user clicks submit/register
      fetch(`${ApiUrl}/orgs/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      })
        .then((res) => {
          if (res.status === 200) {
            alert(`Update on org ${id} was successful!`);
            navigate("/admin/orgs");
          } else {
            alert(`update on org ${id} failed`);
          }
        })
        .catch((err) => {
          console.log(err);
          alert(`Failed to update user ${id}`);
        });
    }
  };

  const handleDelete = () => {
    fetch(`${ApiUrl}/orgs/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        if (res.status === 200) {
          alert(`Delete on org ${id} was successful!`);
          navigate("/admin/orgs");
        } else {
          alert(`update on org ${id} failed`);
        }
      })
      .catch((err) => {
        console.log(err);
        alert(`Failed to delete org ${id}`);
      });
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
              to={"/admin/orgs"}
              style={{ textDecoration: "none", color: "black" }}
              className="roles-link"
            >
              <Typography variant="h6" m={5}>
                Back to the orgs page
              </Typography>
            </Link>
          </Grid>
          <Grid item xs={6} justifyContent="right" display="flex" p={3}>
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
                <Typography variant="h5">Modify Organizations</Typography>
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
                  label="Organization Name"
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
                  value={input.img_url}
                  label="Image URL"
                  onChange={handleChange}
                  name="img_url"
                  required
                ></TextField>
              </Box>
              <Box m={1}>
                <TextField
                  sx={{
                    "& .MuiInputBase-root": {
                      color: "white",
                    },
                    minWidth: 223,
                  }}
                  select
                  value={input.parent_id}
                  label="Parent Organization"
                  onChange={handleChange}
                  name="parent_id"
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

export default ModifyOrgs;
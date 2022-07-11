import React, { useEffect, useState, useContext } from "react";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Button, Select, MenuItem, InputLabel } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";

import config from "../config";
const ApiUrl = config[process.env.REACT_APP_NODE_ENV || "development"].apiUrl;

import { TaskContext } from "../App.js";

const ModifyOrgs = () => {
  const tc = useContext(TaskContext);
  const navigate = useNavigate();
//   "org.id as org_id",
      // "org.img_url as org_img_url",
      // "org.name as org_name",
      // "org.parent_id as org_parent_id",
      // "parent.name as parent_name"
  let [input, setInput] = useState({
    name: "",
    parent_name: "",
    parent_id: 0,
    img_url: ""
  });


  const [feedback, setFeedback] = useState('')
  const [orgs, setOrgs] = useState([])

  let {id} = useParams();

  useEffect(() => {
    fetch(`${ApiUrl}/orgs/${id}`)
      .then(res => res.json())
      .then(data => {
        console.log(`data on orgs ${id}: `, data[0])
      //   "org.id as org_id",
      // "org.img_url as org_img_url",
      // "org.name as org_name",
      // "org.parent_id as org_parent_id",
      // "parent.name as parent_name"
        setInput({
          name: data[0].org_name,
          img_url: data[0].org_img_url,
          parent_id: data[0].org_parent_id
        })
      })
    fetch(`${ApiUrl}/orgs`)
      .then(res => res.json())
      .then(data => setOrgs(data))
  }, [id])

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
    let tempFeedback = ''

    //data validation for each input field
    if(input.name.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )) {
        tempFeedback += 'invalid name format\n';
        error = true;
    }

    setFeedback(tempFeedback);
    if(error === false) {
      // sends post request with input state info to API when user clicks submit/register
      fetch(`${ApiUrl}/orgs/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
      })
        .then((res) => res.json())
        .then((data) => {
          alert(`Update on user ${id} was successful!`);
          navigate("/admin/orgs");
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
        boxShadow: "0 0 10px rgb(10, 31, 10)",
        borderRadius: "5px",
      }}
    >
      <form onSubmit={handleSubmit}>
        <Box m={2} pt={3}>
          <Link to={"/admin/orgs"} style={{ textDecoration: 'none', color: "black" }} className='roles-link'>
            <Typography variant="h6">Back to the orgs page</Typography>
          </Link>
          <Grid
            container
            spacing={3}
            direction="column"
            alignItems="center"
            justifyContent="space-evenly"
          >
            <Box m={2} pt={3}>
              <Typography variant="h5">Modify Organizations</Typography>
            </Box>

            <Box m={1}>
              <Typography variant="body1" color="red">{feedback}</Typography>
            </Box>
            <Box m={1}>
              <TextField
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
                value={input.img_url}
                label="Image URL"
                onChange={handleChange}
                name="img_url"
                required
                sx={{minWidth: 223}}
                >
              </TextField>
            </Box>
            <Box m={1}>
              <TextField
                select
                value={input.parent_id}
                label="Parent Organization"
                onChange={handleChange}
                name="parent_id"
                sx={{minWidth: 223}}
                >
                {orgs.map(org => <MenuItem key={org.org_id} value={org.org_id}>{org.org_name}</MenuItem>)}
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

export default ModifyOrgs;

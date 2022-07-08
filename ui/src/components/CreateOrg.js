import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Box from '@mui/material/Box';
import Grid from "@mui/material/Grid";
import { Button, MenuItem } from "@mui/material";

import config from "../config";
const ApiUrl = config[process.env.REACT_APP_NODE_ENV || "development"].apiUrl;

const CreateOrg = () => {

  const [orgs, setOrgs] = useState([])
  const [input, setInput] = useState({
    name: "",
    img_url: "",
    org_id: 0
  })

  useEffect(() => {
    let url = `${ApiUrl}/orgs`
    fetch(url)
      .then(res => res.json())
      .then(data => setOrgs(data))
  }, [])

  const handleSubmit = (e) => {
    console.log(e.target.value);
    fetch(`${ApiUrl}/orgs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    })
      .then((res) => res.json())
      .then((data) => {
        alert("Organization created!");
        navigate("/admin/orgs");
      })
      .catch((err) => {
        console.log(err);
        alert(`Failed to create a new organization`);
      });
    e.preventDefault();
  }

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  return (
    < Container
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
              <Typography variant="h5">Create Org</Typography>
            </Box>
            <Box m={1}>
              <TextField
                label="Organization Name"
                type="Organization Name"
                name="Organization Name"
                value={input.title}
                onChange={handleChange}
                required
              />
            </Box>
            <Box m={1}>
              <TextField
                label="Image URL"
                type="Image URL"
                name="Image URL"
                value={input.im_url}
                onChange={handleChange}
                required
              />
            </Box>
            <Box m={1}>
              <TextField
                id="org"
                select
                value={input.org_id}
                label="Parent Organization (Optional)"
                onChange={handleChange}
                name="org_id"
                sx={{ minWidth: 223 }}
              >
                {orgs.map(org => <MenuItem key={org.org_id} value={org.org_id}>{org.org_name}</MenuItem>)}
              </TextField>
            </Box>
            <Box m={2} pt={3}></Box>
            <Button className="submitButton" type="submit" value="Submit">
              Submit
            </Button>
          </Grid>
        </Box >
      </form >
    </Container >
  )
}

export default CreateOrg;
import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Button, MenuItem } from "@mui/material";

import config from "../config";
const ApiUrl = config[process.env.REACT_APP_NODE_ENV || "development"].apiUrl;

const CreateOrgs = () => {
  let navigate = useNavigate();
  const [orgs, setOrgs] = useState([]);
  const [input, setInput] = useState({
    img_url: "",
    name: "",
    parent_id: 1,
  });

  useEffect(() => {
    let url = `${ApiUrl}/orgs`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => setOrgs(data));
  }, []);

  const handleSubmit = (e) => {
    console.log(input);
    let tempInput = {};
    if (input.parent_id === 0) {
      tempInput = {
        img_url: input.img_url,
        name: input.name,
      };
    } else {
      tempInput = input;
    }
    fetch(`${ApiUrl}/orgs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tempInput),
    })
      .then((res) => {
        if (res.status === 200) {
          alert("Organization created");
          navigate("/admin/orgs");
        } else {
          alert("organization creation failed");
        }
      })
      .catch((err) => {
        console.log(err);
        alert(`Failed to create a new organization`);
      });
    e.preventDefault();
  };

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Container
      maxWidth="lg"
      className="post-page"
      sx={{
        marginTop:"50px",
        marginBottom: "0",
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
              <Typography variant="h5">Create Org</Typography>
            </Box>
            <Box m={1}>
              <TextField
                sx={{
                  "& .MuiInputBase-root": {
                    color: "white",
                  },
                }}
                label="Organization Name"
                type="Organization Name"
                name="name"
                value={input.name}
                onChange={handleChange}
                required
              />
            </Box>
            <Box m={1}>
              <TextField
                sx={{
                  "& .MuiInputBase-root": {
                    color: "white",
                  },
                }}
                label="Image URL"
                type="Image URL"
                name="img_url"
                value={input.img_url}
                onChange={handleChange}
                required
              />
            </Box>
            <Box m={1}>
              <TextField
                sx={{
                  "& .MuiInputBase-root": {
                    color: "white",
                  },
                  minWidth: 223,
                  color: "white",
                }}
                id="org"
                select
                value={input.parent_id}
                label="Parent Organization (Optional)"
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
            <Box m={2} pt={3}></Box>
            <Button className="submitButton" type="submit" value="Submit">
              Submit
            </Button>
          </Grid>
        </Box>
      </form>
    </Container>
  );
};

export default CreateOrgs;
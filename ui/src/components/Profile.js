import React, { useEffect, useState, useContext } from "react";
import EditableText from "./EditableText.js";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import { TaskContext } from "../App.js";
import {
  Select,
  MenuItem,
  InputLabelProps,
  OutlinedInput,
} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import config from "../config";
const ApiUrl = config[process.env.REACT_APP_NODE_ENV || "development"].apiUrl;

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

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const Profile = () => {
  let [input, setInput] = useState({
    user_id: 0,
    user_name: "",
    user_rank: "",
    org_id: 0,
    org_name: "",
    user_email: "",
  });
  let [orgs, setOrgs] = useState([]);
  let [selected, setSelected] = useState("");

  const tc = useContext(TaskContext);

  let formatPatchReq = () => {
    let body = {};
    Object.keys(inputTask).forEach((x) => {
      if (inputTask[x] !== "" && inputTask[x] !== null && inputTask[x] !== 0) {
        body[x] = inputTask[x];
      }
    });

    return body;
  };

  useEffect(() => {
    let url = `${ApiUrl}/users/${tc.userId}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => setInput(data[0]))
      .then(
        fetch(`${ApiUrl}/orgs`)
          .then((res) => res.json())
          .then((data) => {
            setOrgs(data);
          })
      );
  }, []);

  const handleSelect = (event) => {
    setSelected(event.target.value);
    setInput({
      ...input,
      organization: event.target.value,
    });
  };

  const handleSubmit = () =>{

    let request = "PATCH";
    let body = formatPatchReq();
    let url = `${ApiUrl}/users/${taskDetails.task_id}`;

    if (Object.keys(body).length > 0) {
      fetch(url, {
        method: request,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }).then((res) => {
        console.log(res);
        setIsSubmit(!isSubmit);
      });
      e.preventDefault();
    }

  }

  return (
    <Box m={2} p={1} alignItems="center">
      <Stack spacing={2} alignItems="center">
        <Typography variant="h4" alignContent="left">
          My Profile
        </Typography>
        <Paper elevation={2}>
          <Grid container spacing={2} marginTop={2}>
            <Grid item xs={4} display="flex" justifyContent="flex-end">
              <Typography pt={3}>Name:</Typography>
            </Grid>
            <Grid item xs={8}>
              <EditableText
                field={"user_name"}
                val={input.user_name}
                canEdit={true}
                callback={setInput}
                input={input}
              />
            </Grid>
            <Grid item xs={4} display="flex" justifyContent="flex-end">
              <Typography pt={3}>Rank:</Typography>
            </Grid>
            <Grid item xs={8}>
              <EditableText
                field={"user_rank"}
                val={input.user_rank}
                canEdit={true}
                callback={setInput}
                input={input}
                input_type="dropdown"
                dropdown={validRanks}
              />
            </Grid>
            <Grid item xs={4} display="flex" justifyContent="flex-end">
              <Typography pt={3}>Email:</Typography>
            </Grid>
            <Grid item xs={8}>
              <EditableText
                field={"user_email"}
                val={input.user_email}
                canEdit={true}
                callback={setInput}
                input={input}
              />
            </Grid>
            <Grid item xs={4} display="flex" justifyContent="flex-end">
              <Typography pt={3}>Organization:</Typography>
            </Grid>
            <Grid item xs={8}>
              <FormControl sx={{ m: 1, width: 150 }}>
                <Select
                  labelId="demo-multiple-name-label"
                  id="demo-multiple-name"
                  value={selected}
                  onChange={handleSelect}
                  input={<OutlinedInput label="Name" />}
                  MenuProps={MenuProps}
                >
                  {orgs.map((el) => (
                    <MenuItem value={el.org_id}>
                      {el.org_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Paper>
        <Button onClick={handleSubmit}>Submit Changes</Button>
        <Button
          onClick={() => {
            tc.setUserId(null);
            tc.setIsAdmin(false);
            tc.setUserOrg(null);
          }}
        >
          Log Out
        </Button>
      </Stack>
    </Box>
  );
};

export default Profile;

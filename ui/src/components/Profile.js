import React, { useEffect, useState, useContext } from "react";
import EditableText from "./EditableText.js";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Box from '@mui/material/Box'
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import { TaskContext } from "../App.js";
// import FormControl from "@mui/material/FormControl";
import config from "../config";
import TextField from "@mui/material/TextField";
import { MenuItem } from "@mui/material";
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

// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;
// const MenuProps = {
//   PaperProps: {
//     style: {
//       maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//       width: 250,
//     },
//   },
// };

const Profile = () => {
  let [input, setInput] = useState({
    name: "",
    rank: "",
    org_id: 0,
    email: "",
  });
  let [userData, setUserData] = useState({
    org_id: null,
    org_name: "",
    position_id: null,
    position_name: "",
    user_email: "",
    user_id: null,
    user_name: "",
    user_rank: "",
  });

  const titleTypography = "h5";
  const valueTypography = "h6";
  let [orgs, setOrgs] = useState([]);

  const tc = useContext(TaskContext);

  let formatPatchReq = () => {
    let body = {};
    Object.keys(input).forEach((x) => {
      if (input[x] !== "" && input[x] !== null && input[x] !== 0) {
        body[x] = input[x];
      }
    });

    return body;
  };

  useEffect(() => {
    let url = `${ApiUrl}/users/${tc.userId}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => setUserData(data[0]))
      .then(
        fetch(`${ApiUrl}/orgs`)
          .then((res) => res.json())
          .then((data) => {
            setOrgs(data);
          })
      );
  }, []);

  const handleSubmit = (e) => {
    let request = "PATCH";
    let body = formatPatchReq();
    let url = `${ApiUrl}/users/${tc.userId}`;

    console.log(body);

    if (Object.keys(body).length > 0) {
      fetch(url, {
        method: request,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }).then((res) => {
        console.log(res);
      });
      e.preventDefault();
    }
  };

  return (
     <Box m={2} p = {1}>
      <Stack margin = {2} spacing={2} alignItems="center" >
        <Typography variant="h4" style={{color:"white"}}>
          My Profile
        </Typography>
        <Paper
          elevation={5}
          style={{
            backgroundColor: '#white'
          }}
        >
          <Grid container spacing={2} marginTop={2} marginBottom={2}>
            <Grid item xs={4} display="flex" justifyContent="flex-end">
              <Typography pt={3} variant={titleTypography}>Name:</Typography>
            </Grid>
            <Grid item xs={8}>
              <EditableText
                field={"name"}
                val={userData.user_name}
                canEdit={true}
                callback={setInput}
                input={input}
                typography={valueTypography}
              />
            </Grid>
            <Grid item xs={4} display="flex" justifyContent="flex-end">
              <Typography pt={3} variant={titleTypography}>Rank:</Typography>
            </Grid>
            <Grid item xs={8}>
              <EditableText
                field={"rank"}
                val={userData.user_rank}
                canEdit={true}
                callback={setInput}
                input={input}
                typography={valueTypography}
                input_type="dropdown"
                dropdown={validRanks}
              />
            </Grid>
            <Grid item xs={4} display="flex" justifyContent="flex-end">
              <Typography pt={3} variant={titleTypography}>Email:</Typography>
            </Grid>
            <Grid item xs={8}>
              <EditableText
                field={"email"}
                val={userData.user_email}
                canEdit={true}
                callback={setInput}
                input={input}
                typography={valueTypography}
              />
            </Grid>
            <Grid item xs={4} display="flex" justifyContent="flex-end">
              <Typography pt={3} variant={titleTypography}>Organization:</Typography>
            </Grid>
            <Grid item xs={8} display="flex" alignItems="center" justifyContent="center">
              {/* <FormControl sx={{ width: 150 }}> */}
                <TextField
                  id="org"
                  select
                  value={userData.org_id}
                  onChange={setInput}
                  name="org_id"
                  sx={{ minWidth: 223 }}
                >
                  {orgs.map((org) => (
                    <MenuItem key={org.org_id} value={org.org_id}>
                      {org.org_name}
                    </MenuItem>
                  ))}
                </TextField>
              {/* </FormControl> */}
            </Grid>
          </Grid>
        </Paper>
        <Button onClick={handleSubmit} style={{color: 'white'}} size = "large">Submit Changes</Button>
        <Button
          onClick={() => {
            tc.setUserId(null);
            tc.setIsAdmin(false);
            tc.setUserOrg(null);
          }}
          style={{color: 'white'}}
        >
          Log Out
        </Button>
      </Stack>
      </Box>
  );
};

export default Profile;

import React, { useEffect, useState, useContext } from "react";
import EditableText from "./EditableText.js";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import { TaskContext } from "../App.js";
import { NativeSelect } from "@mui/material";
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
  let [orgs, setOrgs] = useState([]);
  // let [selected, setSelected] = useState("");

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

  const handleSelect = (event) => {
    // setSelected(event.target.value);
    setInput({
      ...input,
      org_id: event.target.value,
    });
  };

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
    <Box m={2} p={1} alignItems="center">
      <Stack spacing={2} alignItems="center">
        <Typography variant="h4" alignContent="left">
          My Profile
        </Typography>
        <Paper
          elevation={5}
          style={{
            padding: "40px 20px",
            color: "white",
            backgroundColor: "rgba(74,104,133,0.44)",
          }}
        >
          <Grid container spacing={2} marginTop={2}>
            <Grid item xs={4} display="flex" justifyContent="flex-end">
              <Typography pt={3}>Name:</Typography>
            </Grid>
            <Grid item xs={8}>
              <EditableText
                field={"name"}
                val={userData.user_name}
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
                field={"rank"}
                val={userData.user_rank}
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
                field={"email"}
                val={userData.user_email}
                canEdit={true}
                callback={setInput}
                input={input}
              />
            </Grid>
            <Grid item xs={4} display="flex" justifyContent="flex-end">
              <Typography pt={3}>Organization:</Typography>
            </Grid>
            <Grid item xs={8}>
              <FormControl sx={{ width: 150 }}>
                <NativeSelect
                  defaultValue={userData.org_name}
                  onChange={handleSelect}
                  inputProps={{
                    name: "org_id",
                    id: "uncontrolled-native",
                  }}
                >
                  {orgs.map((el) => (
                    <option value={el.org_id} key={el.org_id}>{el.org_name}</option>
                  ))}
                </NativeSelect>
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

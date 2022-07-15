import React, { useEffect, useState, useContext } from "react";
import EditableText from "./EditableText.js";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import { TaskContext } from "../App.js";
// import FormControl from "@mui/material/FormControl";
import config from "../config";
import TextField from "@mui/material/TextField";
import { MenuItem } from "@mui/material";
import '../styles/SharedStyles.css'
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
    org_name: "",
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
      .then((data) => {setUserData(data[0]); return data[0];})
      .then( (data) => {
        setInput( {
          ...input,
          org_id: data.org_id
        }
        )
        fetch(`${ApiUrl}/orgs`)
          .then((res) => res.json())
          .then((data) => {
            setOrgs(data);
          })
        }
      );
  }, []);

  const handleSubmit = (e) => {
    let request = "PATCH";
    let body = formatPatchReq();
    console.log(body)
    let url = `${ApiUrl}/users/${tc.userId}`;

    console.log(body);

    if (Object.keys(body).length > 0) {
      fetch(url, {
        method: request,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }).then((res) => {
        console.log(res);
        alert("Profile has been updated.")
      });
      e.preventDefault();
    }
  };

  const handleChange = (e) => {
    console.log(e.target.value)
    setInput({
      ...input,
      org_id : e.target.value
    })
    // let name
    // orgs.forEach(ele => {
    //   if (ele.org_id == e.target.value){
    //     name = ele.org_name
    //   }
    // })
    // setInput({
    //   ...input,
    //   org_name : name
    // })
  }

  return (
    <Box m={2} p={1}>
      <Stack margin={2} spacing={2} alignItems="center">
        <Typography variant="h4" style={{ color: "white" }}>
          My Profile
        </Typography>
        <Paper
          elevation={5}
          style={{
            backgroundColor: "#003665",
            boxShadow: "0 0 10px #4DACFF",
            borderRadius: "5px",
          }}
        >
          <Grid container spacing={2} marginTop={2} marginBottom={2}>
            <Grid item xs={4} display="flex" justifyContent="flex-end">
              <Typography pt={3} variant={titleTypography}>
                Name:
              </Typography>
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
              <Typography pt={3} variant={titleTypography}>
                Rank:
              </Typography>
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
              <Typography pt={3} variant={titleTypography}>
                Email:
              </Typography>
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
              <Typography pt={3} variant={titleTypography}>
                Organization:
              </Typography>
            </Grid>
            <Grid
              item
              xs={8}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              {/* <FormControl sx={{ width: 150 }}> */}
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
                default={userData.org_name}
                value={input.org_id}
                onChange={handleChange}
                name="org_id"
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
              {/* </FormControl> */}
            </Grid>
          </Grid>
        </Paper>
        <Button onClick={handleSubmit} style={{ color: "white" }} size="large">
          Submit Changes
        </Button>
        <Button
          onClick={() => {
            tc.setUserId(null);
            tc.setIsAdmin(false);
            tc.setUserOrg(null);
          }}
          style={{ color: "white" }}
        >
          Log Out
        </Button>
      </Stack>
    </Box>
  );
};

export default Profile;

import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import config from "../config";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import logo from "../loading-blue.gif";

const ApiUrl = config[process.env.REACT_APP_NODE_ENV || "development"].apiUrl;

const ViewModifyRoles = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    let url = `${ApiUrl}/users`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .then(() => setTimeout(() => setIsLoading(false), 250));
  }, []);

  // const updateByIndex = (index) => {
  //   let tempUsers = users;
  //   users[index] = {
  //     ...input,
  //     [e.target.name]: e.target.value,
  //   };
  // };
  return (
    <Box width={"90%"} margin="auto" marginTop={5}>
      <Grid
        container
        spacing={3}
        direction="column"
        alignItems="center"
        justifyContent="space-evenly"
      >
        <Typography align="center" variant="h4">
          View/Modify Roles
        </Typography>
        {isLoading ? (
        <Grid container display='flex' justifyContent='center' direction='column' alignItems='center'>
          <img src={logo} width="400px" alt="loading-spinner"/>
          <Typography variant="h3" align='center'>Loading...</Typography>
        </Grid>
        ) :
          <Paper style={{ padding: "10px 20px" }}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell> User Id </TableCell>
                    <TableCell align="right"> Name </TableCell>
                    <TableCell align="right"> Rank </TableCell>
                    <TableCell align="right"> Organization Name </TableCell>
                    <TableCell align="right"> Email </TableCell>
                    <TableCell align="right"> Position Name </TableCell>
                    <TableCell align="right"> Edit </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((user) => (
                    <TableRow
                      key={user.user_id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {user.user_id}
                      </TableCell>
                      <TableCell align="right">
                        {user.user_name}
                        {/* <EditableText field='user_name' canEdit={true} val={users[index].user_name callback={() => handleChange(index)}}/> */}
                      </TableCell>
                      <TableCell align="right">{user.user_rank}</TableCell>
                      <TableCell align="right">{user.org_name}</TableCell>
                      <TableCell align="right">{user.user_email}</TableCell>
                      <TableCell align="right">{user.position_name}</TableCell>
                      <TableCell align="right">
                        <Link to={`/admin/roles/edit/${user.user_id}`}>Edit</Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        }
      </Grid>
    </Box>
  );
};

export default ViewModifyRoles;

/*
    "user_id": 1,
    "user_name": "Jeff Haddock",
    "user_rank": "CIV",
    "org_id": 1,
    "org_name": "21 CS",
    "user_email": "jeff.haddock@gmail.com",
    "position_id": 1,
    "position_name": "member"

        <SearchBar
          value={searched}
          onChange={(searchVal) => requestSearch(searchVal)}
          onCancelSearch={() => cancelSearch()}
        />
        <TableContainer>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Food (100g serving)</TableCell>
                <TableCell align="right">Calories</TableCell>
                <TableCell align="right">Fat&nbsp;(g)</TableCell>
                <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                <TableCell align="right">Protein&nbsp;(g)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.calories}</TableCell>
                  <TableCell align="right">{row.fat}</TableCell>
                  <TableCell align="right">{row.carbs}</TableCell>
                  <TableCell align="right">{row.protein}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
*/

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
import { useNavigate } from "react-router-dom";
import logo from "../loading-blue.gif";
import Button from "@mui/material/Button";

const ApiUrl = config[process.env.REACT_APP_NODE_ENV || "development"].apiUrl;

const ViewModifyRoles = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  let navigate = useNavigate()

  useEffect(() => {
    setIsLoading(true);
    let url = `${ApiUrl}/users`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .then(() => setTimeout(() => setIsLoading(false), 250));
  }, []);

  return (
    <Box width={"90%"} margin="auto" marginTop={10}>
      <Grid
        container
        spacing={3}
        direction="column"
        alignItems="center"
        justifyContent="space-evenly"
      >
        <Paper
          style={{
            padding: "20px 20px",
            color: "white",
            backgroundColor: "#003665",
            boxShadow: "0 0 10px #4DACFF",
          }}
        >
          <Typography align="center" variant="h4">
            View/Modify Roles
          </Typography>
          {isLoading ? (
          <Grid container display='flex' justifyContent='center' direction='column' alignItems='center'>
            <img src={logo} width="400px" alt="loading-spinner"/>
            <Typography variant="h3" align='center' style={{color: 'white'}}>Loading...</Typography>
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
                      <TableCell align="right"></TableCell>
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
                            <Button
                              size="small"
                              variant = "contained"
                              onClick = {()=>{navigate(`/admin/roles/edit/${user.user_id}`)}}>
                              Edit
                            </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          }
        </Paper>
      </Grid>
    </Box>
  );
};

export default ViewModifyRoles;
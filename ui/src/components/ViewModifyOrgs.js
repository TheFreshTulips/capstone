import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import config from "../config";
import Typography from "@mui/material/Typography";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import logo from "../loading-blue.gif";
import Button from "@mui/material/Button";


const ApiUrl = config[process.env.REACT_APP_NODE_ENV || "development"].apiUrl;


const ViewModifyOrgs = () => {
  const navigate = useNavigate();
  const [orgs, setOrgs] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true)
    let url = `${ApiUrl}/orgs`
    fetch(url)
      .then(res => res.json())
      .then(data => setOrgs(data))
      .then(() => setTimeout(() => setIsLoading(false), 250))
  }, [])

  return (
    <>
      <Box width={"90%"} margin="auto" marginTop={5}>
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
            backgroundColor: "rgba(74,104,133,0.44)",
          }}
          >
            <Grid container spacing={2} direction='row' alignItems='center' justifyContent='right'>
              <Grid item xs>
                <Box m={4} display='flex' justifyContent='right' >
                  <></>
                </Box>
              </Grid>
              <Grid item xs >
                <Typography align="center" variant="h4">View/Modify Organizations</Typography>
              </Grid>

              <Grid item xs>
                <Box m={4} display='flex' justifyContent='right'>
                  <Fab color="primary" aria-label="add" onClick={() => navigate('/admin/orgs/create')}>
                    <AddIcon />
                  </Fab>
                </Box>
              </Grid>
            </Grid>
            {isLoading ? (
              <Grid container display='flex' justifyContent='center' direction='column' alignItems='center'>
                <img src={logo} width="400px" alt="loading-spinner" />
                <Typography variant="h3" align='center' style={{color: 'white'}}>Loading...</Typography>
              </Grid>
            ) :
              <Paper style={{ padding: "40px 20px" }}>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell> Organization Id </TableCell>
                        <TableCell align="right"> Organization Name </TableCell>
                        <TableCell align="right"> Image </TableCell>
                        <TableCell align="right"> Parent Organization </TableCell>
                        <TableCell align="right"> Edit </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {orgs.map((org) => (
                        <TableRow
                          key={org.org_id}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                          <TableCell align="right">
                            {org.org_id}
                          </TableCell>
                          <TableCell align="right">{org.org_name}</TableCell>
                          <TableCell align="right">
                            <Box
                              component="img"
                              sx={{
                                maxHeight: { xs: 40, md: 40 },
                                maxWidth: { xs: 40, md: 40 },
                              }}
                              alt="No Image Found"
                              src={org.org_img_url}
                            />
                          </TableCell>
                          <TableCell align="right">{org.parent_name}</TableCell>
                          <TableCell align="right">
                            <Link to={`/admin/orgs/edit/${org.org_id}`}>
                              <Button size="small">
                                Edit
                              </Button>
                            </Link>
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
    </>
  )
}

export default ViewModifyOrgs
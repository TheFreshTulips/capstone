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
import {Link} from "react-router-dom";


const ApiUrl = config[process.env.REACT_APP_NODE_ENV || "development"].apiUrl;


const ViewModifyOrgs = () => {
  const navigate = useNavigate();
  const [orgs, setOrgs] = useState([])
  useEffect(() => {
    let url = `${ApiUrl}/orgs`
    fetch(url)
      .then(res => res.json())
      .then(data => setOrgs(data))
  }, [])

  return (
    <>
      <Box m={4} display='flex' justifyContent='right'>
        <Fab color="primary" aria-label="add" onClick={() => navigate('/admin/orgs/create')}>
          <AddIcon />
        </Fab>
      </Box>
      <Box width={"90%"} margin="auto" marginTop={5}>
        <Grid
          container
          spacing={3}
          direction="column"
          alignItems="center"
          justifyContent="space-evenly"
        >
          <Typography align="center" variant="h3">View/Modify Organizations</Typography>
          <Paper style={{ padding: "40px 20px" }}>
            <TableContainer>
              <Table
                justifyContent="center">
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
                      Edit
                    </Link>
                  </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Box>
    </>
  )
}

export default ViewModifyOrgs
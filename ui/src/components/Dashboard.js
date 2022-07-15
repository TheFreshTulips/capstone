import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import config from "../config.js";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Stack, Paper, Divider} from "@mui/material";
import TaskCard from "./TaskCard.js";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { TaskContext } from "../App.js";
import logo from "../loading-blue.gif";

const ApiUrl = config[process.env.REACT_APP_NODE_ENV || "development"].apiUrl;

const userColumns = ["to do", "in progress", "Created By Me"];
const unitColumns = ["to do", "in progress"];
/*
const checkNotFinished = (taskArr) =>{
  return taskArr.reduce((prev, curr) => {
    if (curr.task_status === "finished"){
      return prev && curr
    }else{
      return false
    }
  }, true)
}*/

const Dashboard = ({ user }) => {
  const tc = useContext(TaskContext);
  let [tasks, setTasks] = useState([]);
  let [createdTasks, setCreatedTasks] = useState([]);
  let [childOrgTasks, setChildOrgTasks] = useState([]);
  let [isLoading, setIsLoading] = useState(null); //use this to make loading circle
  let [columns, setColumns] = useState([]);
  let navigate = useNavigate()

  const formatColumn = (someWords) => {
    const words = someWords.split(" ");

    for (let i = 0; i < words.length; i++) {
      words[i] = words[i][0].toUpperCase() + words[i].substr(1);
    }

    return words.join(" ");
  };

  useEffect(() => {
    setIsLoading(true);
    let getUrl;
    user
      ? (getUrl = `${ApiUrl}/tasks/users/${tc.userId}`)
      : (getUrl = `${ApiUrl}/tasks/orgs/${tc.userOrg}`)

    user ? setColumns(userColumns) : setColumns(unitColumns);

    (tc.isSupervisor && !user) ? (
      fetch(`${ApiUrl}/orgs/${tc.userOrg}/children`)
        .then((res) => res.json())
        .then((data) => {
          let promiseArr = [];
          data.forEach(element => {
            promiseArr.push(fetch(`${ApiUrl}/tasks/orgs/${element.org_id}`)
              .then(res => res.json()))
          })
          Promise.all(promiseArr)
            .then(results => {
              let tempTasks = []
              results.forEach(result => {
                tempTasks.push(
                  {
                    org_id: result[0].task_org_id,
                    org_name: result[0].task_org_name,
                    tasks: result,
                  }
                )
              })
              setChildOrgTasks(tempTasks);
              setTimeout(() => setIsLoading(false), 250);
            })
        })
    ) : null

    if (user) {
      fetch(getUrl + '/created')
        .then((res) => res.json())
        .then((data) => {
          setCreatedTasks(data)
        })
    }
    fetch(getUrl)
      .then((res) => res.json())
      .then((data) => {
        setTasks(data);
        setTimeout(() => setIsLoading(false), 250);
      });

  }, [user]);


  return (
    <div>
      <Box marginTop = {2} marginBottom = {1} marginRight = {5} display='flex' justifyContent='right'>
        <Fab color="primary" aria-label="add" onClick={() => navigate('/tasks/add')}>
          <AddIcon />
        </Fab>
      </Box>
      {isLoading ? (
        <Grid container display='flex' justifyContent='center' direction='column' alignItems='center'>
          <img src={logo} width="400px" alt="loading-spinner"/>
          <Typography variant="h3" align='center' style={{color: 'white'}}>Loading...</Typography>
        </Grid>
      ) :
        <Stack>
          <Box m = {1} width={"90%"} margin="auto"  >
            <Paper elevation={10} style={{ padding: "15px", backgroundColor : " #003665" , marginBottom:"2rem", boxShadow: "0 0 10px #4DACFF", borderRadius: "5px",}}>
            {tasks[0] ? <Typography variant="h4" key="header" align = 'center' marginBottom={2} sx={{marginTop:"20px"}}>{tasks[0].task_org_name}</Typography>: <></>}
            <Grid
              container
              spacing={2}
              direction="row"
              justifyContent="space-evenly"
              alignItems="flex-start"
              >
              {
               tasks.length > 0 || createdTasks.length > 0?
               <>
              {columns.map((colName, index) => {
                return (
                  <>
                  <Grid item sm={12/columns.length} key={index}>
                    <Stack spacing={2} key={index} alignItems='center' padding = {1}>
                      <Typography
                        variant="h4"
                        align = 'center'
                        sx={{marginTop:"15px"}}
                      >
                        {formatColumn(colName)}
                      </Typography>
                      {
                      tasks.map((element) => {
                        //if we are in the correct column, give back the following card
                        return element.task_status === colName ? (
                          <TaskCard
                            key={element.task_id}
                            id={element.task_id}
                            title={element.task_title}
                            status={element.task_status}
                            suspense_date={element.task_suspense_date}
                            priority={element.task_priority}
                          />

                        ) : <></>
                      })}
                      {console.log(createdTasks)}
                      {colName === 'Created By Me' ?
                        createdTasks.map((element) => (
                          //if we are in the created column, give back this
                          <TaskCard
                            key={element.task_id}
                            id={element.task_id}
                            title={element.task_title}
                            status={formatColumn(element.task_status)}
                            suspense_date={element.task_suspense_date}
                            priority={element.task_priority}
                          />
                        )) : <></>
                      }
                    </Stack>
                  </Grid>
                  {index < columns.length-1? <Divider orientation="vertical" variant = "middle" flexItem style={{marginRight:"-5px", color:"#4fffcc", borderRightWidth:"5px"}} /> : <></>}
                  </>
                );
              })}
              </>
              :
              <Typography variant = "h4" sx={{marginTop:"50px", marginBottom:"50px"}}>You have no Tasks to Display!</Typography>
              }
            </Grid>

            </Paper>
          </Box>
          <Box m = {1} width={"90%"} margin="auto"  >
            {tc.isSupervisor && !user ?
              childOrgTasks.map((element) => {
                console.log(element)
                return (
                  <div key={element.org_id}>
                    <Paper elevation={10} style={{
                      backgroundColor : "#003665",
                      marginBottom:"2rem",
                      boxShadow: "0 0 10px #4DACFF",
                      borderRadius: "5px",
                      padding: "15px",
                      }}>
                    <Typography variant="h4" key="header" align = 'center' sx={{marginBottom:"15px"}}>{element.org_name}</Typography>
                    {element.tasks.length > 0?
                     <Grid
                     container
                     spacing={2}
                     direction="row"
                     justifyContent="space-evenly"
                     alignItems="flex-start"
                   >
                   {columns.map((colName, index) => {
                     return (
                       <>
                       <Grid item sm={12/columns.length} key={index}>
                         <Stack spacing={2} alignItems="center">
                           <Typography
                             variant="h5"
                           >
                             {formatColumn(colName)}
                           </Typography>
                           {isLoading ? "Loading" : element.tasks.map((element) => {
                             //if we are in the correct column, give back the following card
                             return element.task_status === colName ? (
                               <TaskCard
                                 key={element.task_id}
                                 id={element.task_id}
                                 title={element.task_title}
                                 status={element.task_status}
                                 suspense_date={element.task_suspense_date}
                                 priority={element.task_priority}
                               />
                             ) : <></>
                           })}
                         </Stack>
                       </Grid>
                       {index < columns.length-1? <Divider orientation="vertical" variant = "middle" flexItem style={{marginRight:"-5px", color:"#4fffcc", borderRightWidth:"5px"}} /> : <></>}

                       </>
                     );
                   })}
                 </Grid>
                 :
                 <Grid item sm={12} margin={3} paddingBottom={5} display="flex" justifyContent="center">
                    <Typography variant="h5">No Tasks to Display For This Org</Typography>
                 </Grid>
                  }

                    </Paper>
                  </div>
                )
              }) : <></>
            }

          </Box>
        </Stack>
      }
    </div>
  );
};

export default Dashboard;
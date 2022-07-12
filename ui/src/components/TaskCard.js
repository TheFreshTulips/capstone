import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import React from "react";

const TaskCard = (props) => {
  console.log("here");
  const navigate = useNavigate();

  const clickHandler = () => {
    navigate(`/tasks/${props.id}`);
  };

  const card = (
    <>
      <Box m={1}>
        <Typography align="right" sx={{ fontSize: 11 }} color="text.secondary">
          Suspense: {new Date(props.suspense_date).toLocaleString("en-US")}
        </Typography>
      </Box>
      <CardContent>
        <Typography variant="h5" align="center">
          {props.title}
        </Typography>
        <Typography sx={{ fontSize: 11 }} color="text.primary" align="center">
          Priority:{props.priority}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={clickHandler}>
          View Details
        </Button>
      </CardActions>
    </>
  );

  return (
    <Box sx={{ maxWidth: 300, minWidth: 300, minHeight: 180 }}>
      <Card
        variant="outlined"
        style={{ color: "white", backgroundColor: "rgba(74,104,133,0.44)" }}
      >
        {card}
      </Card>
    </Box>
  );
};

export default TaskCard;

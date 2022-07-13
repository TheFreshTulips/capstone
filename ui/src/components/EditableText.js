import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
import { Grid } from "@mui/material";
import { Box } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";

/*
EXAPLANATION FOR THIS COMPONENT IF YOU ARE GOING TO USE IT:

props: {canEdit, val, field, callback, inputType}

field: the property name of the value (like "title", "author", "post", etc)
value: the value of that field (like "This Specific Title", "me", "this specific post")
canEdit: true if this is a field you want the user to be able to edit. If it's not editable it will show normal text
callback: Whatever function you get from the useState in the parent component to set the obj being submitted to the server
        on change, that is the callback. It uses the function returned by useState to hook into the state of the parent so
        whatever is changed in this component can be submitted in the fetch in the parent
inputType: if it's a large text field, this prop will indicate that, or if it is a date picker
  -if input type is "dropdown", then display a dropdown from an optional dropdown prop
typography: if you want to set the typography to "body", or "h1" then this is the prop field to do that (to implement)

        (example: I usually use [input, setInput] which is being changed onChange of a form and submitted onSubmit.
            the setInput is what I would pass into this component)
*/

const convertDateTime = (zuluTime) => {
  return new Date(zuluTime).toLocaleString("en-US");
};

const EditableText = (props) => {
  let [isEdit, setIsEdit] = useState(false);
  let [value, setValue] = useState(props.val);
  let [typography, setTypography] = useState(""); //can set the typography type if desired

  const formatString = (sentence) => {
    if (typeof sentence !== "string") {
      return sentence;
    }
    const words = sentence.split(" ");
    if (words && words.length > 0) {
      return words
        .map((word) => {
          if (word.length > 0) {
            return word[0].toUpperCase() + word.substring(1);
          } else {
            return "";
          }
        })
        .join(" ");
    } else {
      return "";
    }
  };

  useEffect(() => {
    setValue(props.val);
    setTypography(props.typography);
  }, [props.val]);

  let toggleEdit = () => {
    setIsEdit(!isEdit);
  };

  const handleSuspenseDateChange = (_value) => {
    setValue(_value.format());
  };

  let handleChange = () => {
    props.callback({
      ...props.input,
      [props.field]: value,
    });
  };

  const handleClick = () => {
    toggleEdit();
    handleChange();
  };

  return (
    <Box m={2} p={1}>
      {isEdit ? (
        <Grid
          container
          spacing={1}
          direction="column"
          alignItems="center"
          justifyContent="space-around"
          style = {{width: 600}}
        >
          {props.input_type === "large" ? (
            <TextField
              defaultValue={props.val}
              fullWidth
              multiline
              rows={5}
              maxRows={10}
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          ) : props.input_type === "date" ? (
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <Stack spacing={3}>
                <DateTimePicker
                  label="Suspense Date/Time"
                  value={value}
                  onChange={handleSuspenseDateChange}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Stack>
            </LocalizationProvider>
          ) : props.input_type === "dropdown" ? (
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="simple-select-label">Status</InputLabel>
                <Select
                  labelId="simple-select-label"
                  id="simple-select"
                  value={value}
                  label="status"
                  onChange={(e) => setValue(e.target.value)}
                >
                  {props.dropdown.map((ele, index) => (
                    <MenuItem value={ele} key={index} sx={{color:"black"}}>{formatString(ele)}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          ) : (
            <TextField

              defaultValue={props.val}
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          )}
          <Button size="small" onClick={handleClick}>
            {" "}
            Done{" "}
          </Button>
        </Grid>
      ) : (
        <Grid
          container
          spacing={1}
          direction="column"
          alignItems="center"
          justifyContent="space-evenly"
        >
          <Typography variant={typography}>
            {props.field === "suspense_date"
              ? convertDateTime(value)
              : typeof value === "string" && props.field !== "description"
              ? formatString(value)
              : value}
          </Typography>
          {props.canEdit ? (
            <Button size="small" onClick={toggleEdit}>
              Edit
            </Button>
          ) : (
            <></>
          )}
        </Grid>
      )}
    </Box>
  );
};

export default EditableText;

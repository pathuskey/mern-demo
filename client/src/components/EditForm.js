import React from "react"
import Typography from "@material-ui/core/Typography"
import Box from "@material-ui/core/Box"
import TextField from "@material-ui/core/TextField"
import { MuiPickersUtilsProvider, TimePicker } from "@material-ui/pickers"
import DateFnsUtils from "@date-io/date-fns"
import "date-fns"
import indigo from "@material-ui/core/colors/indigo"
import Card from "@material-ui/core/Card"
import { makeStyles } from "@material-ui/core/styles"
import DeleteIcon from "@material-ui/icons/Delete"
import IconButton from "@material-ui/core/IconButton"
import Tooltip from "@material-ui/core/Tooltip"
import Grid from "@material-ui/core/Grid"

const useStyles = makeStyles({
  card: {
    borderColor: indigo["A100"]
  }
})

const EditForm = ({ movie, handleDataChange }) => {
  const classes = useStyles()

  if (!movie.times) {
    movie.times = []
  }

  const handleChangeInputName = event => {
    handleDataChange({ ...movie, name: event.target.value })
  }

  const handleChangeInputRating = event => {
    const validRating = event.target.validity.valid
      ? event.target.value
      : movie.rating

    handleDataChange({ ...movie, rating: validRating })
  }

  const handleChangeInputTime = (value, index) => {
    if (value === null) {
      return false
    }

    movie.times[index] = value
    handleDataChange({ ...movie, times: movie.times })
  }

  const handleDeleteTime = index => {
    movie.times.splice(index, 1)
    handleDataChange({ ...movie, times: movie.times })
  }

  return (
    <>
      <Box my={2}>
        <TextField
          id="name"
          label="Name"
          value={movie.name || ""}
          onChange={handleChangeInputName}
          required
        />
      </Box>

      <Box my={2}>
        <TextField
          id="rating"
          label="Rating"
          type="number"
          step="0.1"
          lang="en-US"
          min="0"
          max="10"
          pattern="[0-9]+([,\.][0-9]+)?"
          value={movie.rating || 0}
          onChange={handleChangeInputRating}
        />
      </Box>

      <Box
        component={Card}
        p={3}
        my={2}
        className={classes.card}
        variant="outlined"
      >
        <Typography>Available Show Times</Typography>
        {movie.times &&
          movie.times.map((time, i) => (
            <Grid container alignItems="center" key={`times-${i}`}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <TimePicker
                  margin="normal"
                  id={`times-${i}`}
                  label="Time"
                  value={time}
                  onChange={val => handleChangeInputTime(val, i)}
                />
              </MuiPickersUtilsProvider>

              <Tooltip title="Delete">
                <IconButton
                  size="small"
                  aria-label="delete-time"
                  style={{ marginTop: 25 }}
                  onClick={() => handleDeleteTime(i)}
                >
                  <DeleteIcon color="error" />
                </IconButton>
              </Tooltip>
            </Grid>
          ))}

        <Grid container alignItems="center">
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <TimePicker
              margin="normal"
              id={`times-${movie.times.length}`}
              label="Time"
              value={null}
              onChange={val => handleChangeInputTime(val, movie.times.length)}
              minutesStep={5}
              format="HH:mm"
            />
          </MuiPickersUtilsProvider>
        </Grid>
      </Box>
    </>
  )
}

export default EditForm

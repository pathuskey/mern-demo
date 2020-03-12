import React, { useState, useEffect } from "react"
import { withStyles } from "@material-ui/core/styles"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableContainer from "@material-ui/core/TableContainer"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import Paper from "@material-ui/core/Paper"
import DeleteIcon from "@material-ui/icons/Delete"
import EditIcon from "@material-ui/icons/Edit"
import CloseIcon from "@material-ui/icons/Close"
import IconButton from "@material-ui/core/IconButton"
import Tooltip from "@material-ui/core/Tooltip"
import grey from "@material-ui/core/colors/grey"
import green from "@material-ui/core/colors/green"
import Fab from "@material-ui/core/Fab"
import AddIcon from "@material-ui/icons/Add"
import SaveIcon from "@material-ui/icons/Save"
import ScheduleIcon from "@material-ui/icons/Schedule"
import GradeIcon from "@material-ui/icons/Grade"
import VideoIcon from "@material-ui/icons/Videocam"
import Box from "@material-ui/core/Box"
import MuiDialogTitle from "@material-ui/core/DialogTitle"
import DialogContent from "@material-ui/core/DialogContent"
import DialogActions from "@material-ui/core/DialogActions"
import Dialog from "@material-ui/core/Dialog"
import EditForm from "../components/EditForm"
import Button from "@material-ui/core/Button"
import Grow from "@material-ui/core/Grow"
import Snackbar from "@material-ui/core/Snackbar"
import MuiAlert from "@material-ui/lab/Alert"
import Typography from "@material-ui/core/Typography"
import Chip from "@material-ui/core/Chip"
import Grid from "@material-ui/core/Grid"

import api from "../api"

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell)

const StyledTableRow = withStyles(theme => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: grey[50]
    }
  }
}))(TableRow)

const dialogStyles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
    background: grey[100]
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  }
})

const DialogTransition = React.forwardRef(function Transition(props, ref) {
  return <Grow in ref={ref} {...props} />
})

const DialogTitle = withStyles(dialogStyles)(props => {
  const { children, classes, onClose, ...other } = props
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  )
})

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

const UpdateMovie = ({ onClick }) => {
  return (
    <Tooltip title="Edit">
      <IconButton onClick={onClick} aria-label="Edit">
        <EditIcon />
      </IconButton>
    </Tooltip>
  )
}

const DeleteMovie = ({ onClick }) => {
  return (
    <Tooltip title="Delete">
      <IconButton onClick={onClick} aria-label="delete">
        <DeleteIcon color="error" />
      </IconButton>
    </Tooltip>
  )
}

const MoviesList = () => {
  const [movies, setMovies] = useState([])
  const [movieToEdit, setMovieToEdit] = useState({})
  const [movieToDelete, setMovieToDelete] = useState({})
  const [openEdit, setOpenEdit] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const [alertSettings, setAlertSettings] = useState({})

  useEffect(() => {
    fetchMovies()
  }, [])

  const fetchMovies = async () => {
    await api.getAllMovies().then(movies => {
      setMovies(movies.data.data)
    })
  }

  const handleEditMovie = movie => {
    setMovieToEdit(movie)
    setOpenEdit(true)
  }

  const handleDeleteMovieConfirm = movie => {
    setMovieToDelete(movie)
    setOpenDelete(true)
  }

  const handleAddMovie = async () => {
    await api.insertMovie(movieToEdit).then(res => {
      setAlertSettings({
        isOpen: true,
        severity: "success",
        message: `${movieToEdit.name} was added!`
      })

      setMovieToEdit({})
      setOpenEdit(false)
      fetchMovies()
    })
  }

  const handleUpdateMovie = async () => {
    await api
      .updateMovieById(movieToEdit._id, {
        name: movieToEdit.name,
        rating: movieToEdit.rating,
        times: movieToEdit.times
      })
      .then(res => {
        const name = movieToEdit.name

        setAlertSettings({
          isOpen: true,
          severity: "success",
          message: `${name} was updated!`
        })

        setMovieToEdit({})
        setOpenEdit(false)
        fetchMovies()
      })
  }

  const handleDeleteMovie = async () => {
    await api.deleteMovieById(movieToDelete._id).then(res => {
      setAlertSettings({
        isOpen: true,
        severity: "success",
        message: `${movieToDelete.name} was deleted!`
      })

      setMovieToDelete({})
      setOpenDelete(false)
      fetchMovies()
    })
  }

  const handleAlertClose = () => {
    setAlertSettings({ ...alertSettings, isOpen: false })
  }

  return movies.length > 0 ? (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>
                <Grid container spacing={1} alignItems="center">
                  <Grid item>
                    <VideoIcon style={{ verticalAlign: "middle" }} />
                  </Grid>
                  <Grid item>
                    <Typography>Name</Typography>
                  </Grid>
                </Grid>
              </StyledTableCell>
              <StyledTableCell align="center">
                <Grid
                  container
                  spacing={1}
                  alignItems="center"
                  justify="center"
                >
                  <Grid item>
                    <GradeIcon style={{ verticalAlign: "middle" }} />
                  </Grid>
                  <Grid item>
                    <Typography>Rating</Typography>
                  </Grid>
                </Grid>
              </StyledTableCell>
              <StyledTableCell>
                <Grid container spacing={1} alignItems="center">
                  <Grid item>
                    <ScheduleIcon style={{ verticalAlign: "middle" }} />
                  </Grid>
                  <Grid item>
                    <Typography>Times</Typography>
                  </Grid>
                </Grid>
              </StyledTableCell>
              <StyledTableCell align="right"></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {movies.map(movie => (
              <StyledTableRow key={movie._id}>
                <StyledTableCell>{movie.name}</StyledTableCell>
                <StyledTableCell align="center">{movie.rating}</StyledTableCell>
                <StyledTableCell>
                  {movie.times.map((time, i) => {
                    const formattedDate = new Date(time).toLocaleTimeString(
                      "en-US",
                      {
                        hour: "2-digit",
                        minute: "2-digit"
                      }
                    )

                    return (
                      <Box
                        key={i}
                        component={Chip}
                        mr={1}
                        label={formattedDate}
                      />
                    )
                  })}
                </StyledTableCell>
                <StyledTableCell align="right">
                  <UpdateMovie onClick={() => handleEditMovie(movie)} />
                  <DeleteMovie
                    onClick={() => handleDeleteMovieConfirm(movie)}
                  />
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box mt={-2.5} ml={3}>
        <Tooltip title="Add">
          <Fab
            style={{ backgroundColor: green[400], color: "white" }}
            size="small"
            aria-label="add"
            onClick={() => handleEditMovie({})}
          >
            <AddIcon />
          </Fab>
        </Tooltip>
      </Box>

      <Dialog
        disableBackdropClick
        maxWidth="xs"
        fullWidth
        aria-labelledby="edit-dialog-title"
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        TransitionComponent={DialogTransition}
      >
        <DialogTitle id="edit-dialog-title" onClose={() => setOpenEdit(false)}>
          {movieToEdit._id ? "Edit Movie" : "Add Movie"}
        </DialogTitle>
        <DialogContent dividers>
          <EditForm movie={movieToEdit} handleDataChange={setMovieToEdit} />
        </DialogContent>
        <DialogActions style={{ background: grey[100] }}>
          <Button
            color="primary"
            variant="contained"
            onClick={movieToEdit._id ? handleUpdateMovie : handleAddMovie}
            startIcon={<SaveIcon />}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        disableBackdropClick
        maxWidth="xs"
        fullWidth
        aria-labelledby="delete-dialog-title"
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        TransitionComponent={DialogTransition}
      >
        <DialogTitle
          id="delete-dialog-title"
          onClose={() => setOpenDelete(false)}
        >
          Delete Movie
        </DialogTitle>
        <DialogContent dividers>
          <Box
            component={Typography}
            py={4}
            style={{ textAlign: "center" }}
          >{`Do you want to delete ${movieToDelete.name} permanently?`}</Box>
        </DialogContent>
        <DialogActions style={{ background: grey[100] }}>
          <Button
            color="secondary"
            variant="contained"
            onClick={handleDeleteMovie}
            startIcon={<DeleteIcon />}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={alertSettings.isOpen}
        autoHideDuration={6000}
        onClose={handleAlertClose}
      >
        <Alert onClose={handleAlertClose} severity={alertSettings.severity}>
          {alertSettings.message}
        </Alert>
      </Snackbar>
    </>
  ) : null
}

export default MoviesList

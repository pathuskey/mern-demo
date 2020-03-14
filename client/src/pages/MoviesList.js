import React, { useState, useEffect } from "react"
import {
  withStyles,
  createMuiTheme,
  ThemeProvider,
  useTheme,
  makeStyles
} from "@material-ui/core/styles"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableContainer from "@material-ui/core/TableContainer"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import TableFooter from "@material-ui/core/TableFooter"
import TablePagination from "@material-ui/core/TablePagination"
import Paper from "@material-ui/core/Paper"
import DeleteIcon from "@material-ui/icons/Delete"
import EditIcon from "@material-ui/icons/Edit"
import CloseIcon from "@material-ui/icons/Close"
import IconButton from "@material-ui/core/IconButton"
import Tooltip from "@material-ui/core/Tooltip"
import grey from "@material-ui/core/colors/grey"
import green from "@material-ui/core/colors/green"
import red from "@material-ui/core/colors/red"
import Fab from "@material-ui/core/Fab"
import AddIcon from "@material-ui/icons/Add"
import SaveIcon from "@material-ui/icons/Save"
import ScheduleIcon from "@material-ui/icons/Schedule"
import GradeIcon from "@material-ui/icons/Grade"
import VideoIcon from "@material-ui/icons/Videocam"
import SearchIcon from "@material-ui/icons/Search"
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
import FirstPageIcon from "@material-ui/icons/FirstPage"
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft"
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight"
import LastPageIcon from "@material-ui/icons/LastPage"
import InputBase from "@material-ui/core/InputBase"

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
    transition: "background-color .2s ease-in-out",
    "&:hover": {
      backgroundColor: grey[50]
    }
  }
}))(TableRow)

const dialogStyles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
    background: grey[100],
    minWidth: 320
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  }
})

const addTheme = createMuiTheme({
  palette: {
    primary: green
  }
})

const deleteTheme = createMuiTheme({
  palette: {
    primary: red
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

const searchStyles = makeStyles(theme => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    marginLeft: "auto",
    width: "100%",
    maxWidth: 300,
    color: grey[600]
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1
  }
}))

const paginationStyles = makeStyles(theme => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5)
  }
}))

const TablePaginationActions = props => {
  const classes = paginationStyles()
  const theme = useTheme()
  const { count, page, rowsPerPage, onChangePage } = props

  const handleFirstPageButtonClick = event => {
    onChangePage(event, 0)
  }

  const handleBackButtonClick = event => {
    onChangePage(event, page - 1)
  }

  const handleNextButtonClick = event => {
    onChangePage(event, page + 1)
  }

  const handleLastPageButtonClick = event => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1))
  }

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  )
}

const MoviesList = () => {
  const [movies, setMovies] = useState()
  const [movieToEdit, setMovieToEdit] = useState({})
  const [movieToDelete, setMovieToDelete] = useState({})
  const [openEdit, setOpenEdit] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const [alertSettings, setAlertSettings] = useState({})
  const [searchText, setSearchText] = useState("")
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)

  const searchClasses = searchStyles()

  let filteredMovies = movies

  if (searchText) {
    filteredMovies = movies.filter(movie => movie.name.indexOf(searchText) > -1)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  useEffect(() => {
    fetchMovies()
  }, [])

  const fetchMovies = async () => {
    await api
      .getAllMovies()
      .then(movies => {
        setMovies(movies.data.data)
      })
      .catch(err => {
        setMovies([])
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

  const handleChangeInputSearch = event => {
    setSearchText(event.target.value)
  }

  return (
    <>
      {movies && movies.length > 0 && (
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
                        <Typography>Movie Title</Typography>
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
                  <StyledTableCell align="right">
                    <Paper component="form" className={searchClasses.root}>
                      <SearchIcon />
                      <InputBase
                        id="search"
                        className={searchClasses.input}
                        onChange={handleChangeInputSearch}
                        placeholder="Search..."
                        inputProps={{ "aria-label": "search" }}
                      />
                    </Paper>
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredMovies && filteredMovies.length > 0 ? (
                  (rowsPerPage > 0
                    ? filteredMovies.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                    : filteredMovies
                  ).map(movie => (
                    <StyledTableRow key={movie._id}>
                      <StyledTableCell>{movie.name}</StyledTableCell>
                      <StyledTableCell align="center">
                        {movie.rating}
                      </StyledTableCell>
                      <StyledTableCell>
                        {movie.times.map((time, i) => {
                          const formattedDate = new Date(
                            time
                          ).toLocaleTimeString("en-US", {
                            hour: "2-digit",
                            minute: "2-digit"
                          })

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
                  ))
                ) : (
                  <StyledTableRow>
                    <StyledTableCell align="center" colspan={4}>
                      <Box component={Typography} py={3} color="text.secondary">
                        No Results Found...
                      </Box>
                    </StyledTableCell>
                  </StyledTableRow>
                )}
              </TableBody>

              {filteredMovies.length > 10 && (
                <TableFooter>
                  <TableRow>
                    <TablePagination
                      rowsPerPageOptions={[
                        10,
                        25,
                        50,
                        { label: "All", value: -1 }
                      ]}
                      colSpan={3}
                      count={movies.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      SelectProps={{
                        inputProps: { "aria-label": "rows per page" },
                        native: true
                      }}
                      onChangePage={handleChangePage}
                      onChangeRowsPerPage={handleChangeRowsPerPage}
                      ActionsComponent={TablePaginationActions}
                    />
                  </TableRow>
                </TableFooter>
              )}
            </Table>
          </TableContainer>

          <ThemeProvider theme={addTheme}>
            <Tooltip title="Add">
              <Fab
                size="large"
                color="primary"
                aria-label="add"
                onClick={() => handleEditMovie({})}
                style={{
                  color: "white",
                  position: "fixed",
                  right: 25,
                  bottom: 25
                }}
              >
                <AddIcon />
              </Fab>
            </Tooltip>
          </ThemeProvider>

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
              <ThemeProvider theme={deleteTheme}>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={handleDeleteMovie}
                  startIcon={<DeleteIcon />}
                >
                  Delete
                </Button>
              </ThemeProvider>
            </DialogActions>
          </Dialog>
        </>
      )}

      {movies && movies.length < 1 && (
        <Box
          component={Paper}
          p={4}
          elevation={3}
          color="text.secondary"
          style={{ maxWidth: 400, textAlign: "center", width: "100%" }}
        >
          <Typography component="h1" variant="h5">
            Welcome to MERN Movies Demo.
            <br />
            Please add your first movie.
          </Typography>
          <br />
          <ThemeProvider theme={addTheme}>
            <Button
              aria-label="add"
              size="large"
              color="primary"
              variant="contained"
              onClick={() => handleEditMovie({})}
              style={{ color: "white" }}
              startIcon={<AddIcon />}
            >
              Add Movie
            </Button>
          </ThemeProvider>
        </Box>
      )}

      <Dialog
        disableBackdropClick
        maxWidth="xs"
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
            disabled={
              !movieToEdit.name ||
              !movieToEdit.times ||
              !movieToEdit.rating ||
              !movieToEdit.times.length > 0
            }
          >
            Save
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
  )
}

export default MoviesList

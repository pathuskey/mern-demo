import React from "react"
import {
  AppBar,
  Toolbar,
  IconButton,
  Link,
  Typography,
  Drawer,
  makeStyles
} from "@material-ui/core"
import MenuIcon from "@material-ui/icons/Menu"
import Links from "./Links"

import logo from "../logo.svg"

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: "auto"
  },
  icon: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  drawer: {
    width: 250
  }
}))

const NavBar = () => {
  const classes = useStyles()

  const [state, setState] = React.useState({
    drawerOpen: false
  })

  const toggleDrawer = open => event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return
    }

    setState({ ...state, drawerOpen: open })
  }

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <Link href="/" className={classes.icon}>
            <img src={logo} width="50" height="50" alt="logo" />
          </Link>

          <Typography variant="h6" className={classes.title}>
            MERN Crud App
          </Typography>

          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="right"
        open={state.drawerOpen}
        onClose={toggleDrawer(false)}
      >
        <div className={classes.drawer}>
          <Links />
        </div>
      </Drawer>
    </>
  )
}

export default NavBar

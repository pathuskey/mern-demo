import React from "react"
import { Link } from "react-router-dom"
import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core"
import TheatersIcon from "@material-ui/icons/Theaters"
import PersonIcon from "@material-ui/icons/Person"
import SettingsIcon from "@material-ui/icons/Settings"

const Links = () => {
  return (
    <List>
      <ListItem button component={Link} to="/">
        <ListItemIcon>
          <TheatersIcon />
        </ListItemIcon>
        <ListItemText primary="Movies" />
      </ListItem>
      <ListItem button component={Link} to="/page1">
        <ListItemIcon>
          <PersonIcon />
        </ListItemIcon>
        <ListItemText primary="Page 1" />
      </ListItem>
      <ListItem button component={Link} to="/page2">
        <ListItemIcon>
          <SettingsIcon />
        </ListItemIcon>
        <ListItemText primary="Page 2" />
      </ListItem>
    </List>
  )
}

export default Links

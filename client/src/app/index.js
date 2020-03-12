import React from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import "typeface-roboto"
import { Container, Box } from "@material-ui/core"

import { NavBar } from "../components"
import { MoviesList, Page1, Page2 } from "../pages"

import "./app.css"

function App() {
  return (
    <Router>
      <NavBar />
      <Box component={Container} maxWidth="lg" my={4}>
        <Switch>
          <Route path="/" exact component={MoviesList} />
          <Route path="/page1" exact component={Page1} />
          <Route path="/page2" exact component={Page2} />
        </Switch>
      </Box>
    </Router>
  )
}

export default App

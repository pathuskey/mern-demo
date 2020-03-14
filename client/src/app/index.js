import React from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import "typeface-roboto"
import { Container, Grid } from "@material-ui/core"

import { NavBar } from "../components"
import { MoviesList, Page1, Page2 } from "../pages"

import "./app.css"

function App() {
  return (
    <Router>
      <NavBar />
      <Container maxWidth="lg">
        <Grid
          container
          alignItems="center"
          justify="center"
          style={{ height: "calc(100vh - 32px)" }}
        >
          <Switch>
            <Route path="/" exact component={MoviesList} />
            <Route path="/page1" exact component={Page1} />
            <Route path="/page2" exact component={Page2} />
          </Switch>
        </Grid>
      </Container>
    </Router>
  )
}

export default App

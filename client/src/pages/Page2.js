import React from "react"
import Typography from "@material-ui/core/Typography"
import Paper from "@material-ui/core/Paper"
import Box from "@material-ui/core/Box"
import grey from "@material-ui/core/colors/grey"

const Page2 = () => {
  return (
    <Box
      component={Paper}
      p={4}
      elevation={3}
      style={{ backgroundColor: grey[50] }}
    >
      <Typography variant="h5" component="h1">
        Page 2
      </Typography>
    </Box>
  )
}

export default Page2

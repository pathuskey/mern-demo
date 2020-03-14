import React from "react"
import Typography from "@material-ui/core/Typography"
import Box from "@material-ui/core/Box"
import Paper from "@material-ui/core/Paper"

const Page2 = () => {
  return (
    <Box component={Paper} p={4} elevation={3} style={{ minWidth: 320 }}>
      <Typography variant="h5" component="h1" style={{ textAlign: "center" }}>
        Page 2
      </Typography>
    </Box>
  )
}

export default Page2

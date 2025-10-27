import React from "react"
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import './index.css'
import Card from "./Card";



function App() {
  const theme = createTheme({
    Typography: {
      fontFamily: ["Cairo"]
    }
  });


  return (
    <>
      <ThemeProvider theme={theme}>

        <Typography>
          <Card />
        </Typography>

      </ThemeProvider>
    </>
  )
}

export default App

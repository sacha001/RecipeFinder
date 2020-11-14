import React, { useState } from 'react';

import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { ThemeProvider, makeStyles, Theme, createStyles } from '@material-ui/core/styles'

import theme from './theme'
import SearchBar from './Components/SearchBar';
import Recipes from './Components/Recipes';


export default function App() {
  const [apiResponse, setApiResponse] = useState({});
  const classes = useStyles()

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container>
        <Grid container className={classes.grid} alignItems='center' direction='column'>
            <Typography variant="h2">
              Recipe Finder
            </Typography>
            <Typography className={classes.subtitle} gutterBottom variant="subtitle1">
              Enter your ingredients below (comma seperated) to search recipes:
            </Typography>
            <div className={classes.searchbar}>
              <SearchBar setApiResponse={setApiResponse} />
            </div>
            <Recipes apiResponse={apiResponse} />
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

const useStyles = makeStyles(theme => ({
  grid: {
    'padding-top': '50px'
  },
  subtitle: {
    'padding-bottom': '10px'
  },
  searchbar: {
    'padding-bottom': '20px'
  }
}));


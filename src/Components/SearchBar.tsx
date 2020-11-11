
import React from 'react';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

interface props {
    setApiSuccess: (data: Object) => void;
    setApiError: (data: Object) => void;
}

export default function SearchBar(props:props) {
    const classes = useStyles();

    return(
        <form onSubmit={handleSubmit}>
            <Paper className={classes.root}>
                <InputBase
                    className={classes.input}
                    placeholder="Search Ingredients"
                    inputProps={{ 'aria-label': 'search ingredients' }}
                />
                <IconButton type="submit" className={classes.iconButton} aria-label="search">
                    <SearchIcon />
                </IconButton>
            </Paper>
        </form>
    );

    function handleSubmit(event:any) {
        event.preventDefault();
        console.log('result');
        fetch("http://localhost:8080/api")
          .then(res => res.json())
          .then(
            (result) => {
              console.log(result);
              props.setApiSuccess(result);
            },
            (error) => {
                props.setApiError(error);
            }
          )
    }
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            padding: '2px 4px',
            display: 'flex',
            alignItems: 'center',
            width: 400,
        },
        input: {
            marginLeft: theme.spacing(1),
            flex: 1,
        },
        iconButton: {
            padding: 10,
        },
        divider: {
            height: 28,
            margin: 4,
        },
    }),
);
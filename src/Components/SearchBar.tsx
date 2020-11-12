
import React from 'react';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import mockFindByIngredientsResponse from '../MockResponses/findByIngredients';
interface props {
    setApiResponse: (data: Object) => void;
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
        // fetch("http://localhost:8080/recipepuppyAPI?ingredients=garlic,flour")
        //     .then(res => res.json())
        //     .then(
        //     (result) => {
        //         if (result.statusCode === 200 && result.body)
        //             props.setApiResponse(JSON.parse(result.body));
        //         else
        //             props.setApiResponse({});
        //     },
        //     (error) => {
        //         console.error('server error')
        //     }
        // )
        props.setApiResponse(mockFindByIngredientsResponse);
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
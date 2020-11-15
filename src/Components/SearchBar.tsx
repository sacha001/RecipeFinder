
import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import mockFindByIngredientsResponse from '../MockResponses/findByIngredients';

interface props {
    setApiResponse: (data: Object) => void;
}

let searchedValue:string = '';

export default function SearchBar(props:props) {
    const classes = useStyles();
    const [inputValue, setInputValue] = useState('');
    let isLoading:Boolean = false;

    function handleSubmit(event:any) {
        event.preventDefault();
        if (inputValue === '' || isLoading || searchedValue === inputValue)
            return;
        
        isLoading = true;

        props.setApiResponse('loading'); // This clears the current recipe cards and adds the loading spinner

        searchedValue = inputValue;
        let ingredientsString = inputValue.replace(RegExp(/,\s+/, 'g'), ',');
        fetch(`http://localhost:8080/spoonacularAPI/findByIngredients?ingredients=${ingredientsString}`)
            .then(res => res.json())
            .then(
            (result) => {
                isLoading = false;
                if (result.statusCode === 200 && result.body)
                    props.setApiResponse(JSON.parse(result.body));
                else
                    props.setApiResponse({});
            },
            (error) => {
                isLoading = false;
                console.error(error)
            }
        );
        //props.setApiResponse(mockFindByIngredientsResponse);
    }

    return(
        <form onSubmit={handleSubmit}>
            <Paper className={classes.root}>
                <InputBase
                    className={classes.input}
                    placeholder="Search Ingredients"
                    inputProps={{ 'aria-label': 'search ingredients' }}
                    onChange={(e) => {setInputValue(e.target.value)}}
                    value={inputValue}
                />
                <IconButton type="submit" className={classes.iconButton} aria-label="search">
                    <SearchIcon />
                </IconButton>
            </Paper>
        </form>
    );
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            padding: '2px 4px',
            display: 'flex',
            alignItems: 'center',
            width: 400
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
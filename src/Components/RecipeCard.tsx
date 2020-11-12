import React, { Component, useState, useEffect } from 'react'; // let's also import Component
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';

interface props {
    title: string;
    imageUrl: string;
    missingIngredients: string;
}

export default function RecipeCard(props:props) {
  const classes = useStyles();

  let ingredientsString = props.missingIngredients ? `Missing: ${props.missingIngredients}` : 'You have all the ingredients!';    

  return (
    <Card className={classes.root}>
      <CardHeader
        title={
            <Typography variant="h6" color="textPrimary">
                {props.title}
            </Typography>
        }
      />
      <CardMedia
        className={classes.media}
        image={props.imageUrl}
        title={props.title}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {ingredientsString}
        </Typography>
      </CardContent>
    </Card>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: red[500],
    },
  }),
);






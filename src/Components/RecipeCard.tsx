import React from 'react'; // let's also import Component
import { makeStyles} from '@material-ui/core/styles';
import { Card, CardActionArea, CardMedia, CardContent, Typography } from '@material-ui/core';
import Slide from '@material-ui/core/Slide';

interface props {
  title: string;
  imageUrl: string;
  index: number;
  missingIngredients: string;
  getAndSetLinks: (clickedId: number) => void;
  transitionDelayMs: number;
}

export default function RecipeCard(props:props) {
  const classes = useStyles()

  let missingOrAll;
  if (props.missingIngredients) {
    missingOrAll = 
      <>
        <span className={classes.ingredientsMissing}>Missing: </span><span className={classes.ingredientsList}>{props.missingIngredients}</span>
      </>;
  } else {
    missingOrAll = 
      <>
        <span className={classes.ingredientsAll}>You have all the ingredients!</span>
      </>
  }
  let ingredientsClass = props.missingIngredients ? classes.ingredientsMissing : classes.ingredientsAll; 
  
  return (
    <Slide direction="up" mountOnEnter unmountOnExit in={true} style={{ transitionDelay: true ? `${props.transitionDelayMs}ms` : '0ms' }}>
      <Card className={classes.root} onClick={() => props.getAndSetLinks(props.index)}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={props.imageUrl}
            title={props.title}
          />
          <CardContent>
            <Typography gutterBottom variant="h6">
              {props.title}
            </Typography>
            <Typography variant="subtitle2">
              {missingOrAll}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Slide>
  )
}

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(3),
    width: 345,
  },
  media: {
    height: 140,
  },
  ingredientsAll: {
    color: theme.palette.success.main,
    opacity: 0.75
  },
  ingredientsMissing: {
    color: theme.palette.warning.main,
    opacity: 0.75
  },
  ingredientsList: {
    color: theme.palette.text.secondary
  }
}));





import React from 'react'; // let's also import Component
import { makeStyles} from '@material-ui/core/styles';
import { Card, CardActionArea, CardMedia, CardContent, Typography } from '@material-ui/core';

interface props {
  title: string;
  imageUrl: string;
  missingIngredients: string;
}

export default function RecipeCard(props:props) {

  let ingredientsString = props.missingIngredients ? `Missing: ${props.missingIngredients}` : 'You have all the ingredients!';    
  const classes = useStyles()
  
  return (
    <Card className={classes.root}>
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
          <Typography variant="body2" color="textSecondary" component="p">
            {ingredientsString}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(3),
    width: 345,
  },
  media: {
    height: 140,
  }
}));





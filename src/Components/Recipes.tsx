import React, { useState, useEffect } from 'react'; // let's also import Component
import RecipeCard from './RecipeCard';
import Grid from '@material-ui/core/Grid';

interface props {
    apiResponse: any;
}

export default function Recipes(props:props) {

  const [recipeCards, setRecipeCards] = useState();

  useEffect(() => {
    if (props.apiResponse && Object.keys(props.apiResponse).length !== 0) {
      let recipeCards:any = [];

      props.apiResponse.forEach((result:any) => {
        let title = htmlDecode(result.title);
        let missingIngredients = parseMissingIngredients(result.missedIngredients);
        recipeCards.push(
            <RecipeCard title={title} imageUrl={result.image} missingIngredients={missingIngredients} />
        );
      });
      setRecipeCards(recipeCards);
    }
  }, [props.apiResponse])

  return (
    <Grid container spacing={3} justify='center'>
      {recipeCards}
    </Grid>
  );
}

function htmlDecode(input:string):string {
  input = input.trim();
  let doc = new DOMParser().parseFromString(input, "text/html");
  return doc.documentElement.textContent || '';
}

function parseMissingIngredients(ingredients:Array<any>):string {
  let missingIngredients = ''
  ingredients.forEach((i) => {
    missingIngredients += i.name + ', ';
  });
  return missingIngredients.substring(0, missingIngredients.length-2);
}

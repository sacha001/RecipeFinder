import React, { useState, useEffect } from 'react'; // let's also import Component
import RecipeCard from './RecipeCard';
import Grid from '@material-ui/core/Grid';
import mockInformationBulk from '../MockResponses/informationBulk';

interface props {
    apiResponse: any;
}

let ids:Array<number>;

export default function Recipes(props:props) {

  const [recipeCards, setRecipeCards] = useState();
  const [links, setLinks] = useState([]);

  useEffect(() => {
    if (props.apiResponse && Object.keys(props.apiResponse).length !== 0) {
      let recipeCards:any = [];
      ids = [];
      let transitionDelayMs = 0;
      let index = 0;
      props.apiResponse.forEach((result:any) => {
        let title = htmlDecode(result.title);
        let missingIngredients = parseMissingIngredients(result.missedIngredients);
        ids.push(result.id);
        recipeCards.push(
            <RecipeCard title={title} imageUrl={result.image} index={index} missingIngredients={missingIngredients} getAndSetLinks={getAndSetLinks} transitionDelayMs={transitionDelayMs} />
        );
        transitionDelayMs += 50;
        index++;
      });
      setRecipeCards(recipeCards);
    }
  }, [props.apiResponse])

  function parseRecipeInfoBulk(result:Array<Object>):void {
    console.log('parse');
    let urls:any = [];
    result.forEach((recipeInfo:any) => {
      urls.push(recipeInfo.sourceUrl);
    });
    setLinks(urls);
  }
  function getAndSetLinks(clickedIndex:number) {
    // fetch(`http://localhost:8080/spoonacularAPI/informationBulk?ids=${ids.join(',')}`)
    //   .then(res => res.json())
    //   .then(
    //   (result) => {
    //       if (result.statusCode === 200 && result.body)
    //           parseRecipeInfoBulk(result.body);
    //       else
    //           console.error('server error')
    //   },
    //   (error) => {
    //       console.error('server error')
    //   }
    // );

    if (links.length === 0)
      parseRecipeInfoBulk(mockInformationBulk);

    window.open(links[clickedIndex]);
  }

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
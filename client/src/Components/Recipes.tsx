import React, { useState, useEffect } from 'react'; // let's also import Component
import RecipeCard from './RecipeCard';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import mockInformationBulk from '../MockResponses/informationBulk';

interface props {
    apiResponse: any;
}

export default function Recipes(props:props) {

  const [recipeCards, setRecipeCards] = useState<Array<any>>();
  let ids:Array<number>;
  let links:Array<string>;
  let isLoading:Boolean = false;

  useEffect(() => {
    if (props.apiResponse === 'loading') {
      setRecipeCards([<CircularProgress />]);
    } else if (props.apiResponse && Object.keys(props.apiResponse).length !== 0) {
      let recipeCardsArray:any = [];
      ids = [];
      links = [];
      let transitionDelayMs = 0;
      let index = 0;
      props.apiResponse.forEach((result:any) => {
        let title = htmlDecode(result.title);
        let missingIngredients = parseMissingIngredients(result.missedIngredients);
        ids.push(result.id);
        recipeCardsArray.push(
            <RecipeCard title={title} imageUrl={result.image} index={index} missingIngredients={missingIngredients} getAndSetLinks={getAndSetLinks} transitionDelayMs={transitionDelayMs} />
        );
        transitionDelayMs += 50;
        index++;
      });
      setRecipeCards(recipeCardsArray);
    } else {
      setRecipeCards([]);
    }
  }, [props.apiResponse])

  function parseRecipeInfoBulk(result:Array<Object>):void {
    let urls:any = [];
    result.forEach((recipeInfo:any) => {
      urls.push(recipeInfo.sourceUrl);
    });
    links = urls;
  }

  function getAndSetLinks(clickedIndex:number) {
    if (isLoading)
      return;

    if (links.length === 0) {
      isLoading = true;
      fetch(`/spoonacularAPI/informationBulk?ids=${ids.join(',')}`)
        .then(res => res.json())
        .then(
        (result) => {
          isLoading = false;
          if (result.statusCode === 200 && result.body) {
            parseRecipeInfoBulk(JSON.parse(result.body));
            window.open(links[clickedIndex]);
          } else {
            console.error('server error');
          }
        },
        (error) => {
          isLoading = false;
          console.error('server error')
        }
      );
    } else {
      window.open(links[clickedIndex]);
    }

    // if (links.length === 0)
    //   parseRecipeInfoBulk(mockInformationBulk);

    // window.open(links[clickedIndex]);
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

  return (
    <Grid container spacing={3} justify='center'>
      {recipeCards}
    </Grid>
  );
}
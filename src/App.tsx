import React, { useState } from 'react';
import './App.css';
import Typography from '@material-ui/core/Typography';

import SearchBar from './Components/SearchBar';
import Recipes from './Components/Recipes';

export default function App() {
  const [apiResponse, setApiResponse] = useState({});
  const [apiError, setApiError] = useState({});

  return (
    <div className="App">
      <SearchBar setApiResponse={setApiResponse} />
      <Recipes apiResponse={apiResponse} />
    </div>
  );
}

function getRecipes() {
  
}


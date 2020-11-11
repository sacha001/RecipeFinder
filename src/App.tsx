import React, { useState } from 'react';
import './App.css';
import Typography from '@material-ui/core/Typography';

import SearchBar from './Components/SearchBar';
import Recipes from './Components/Recipes';

export default function App() {
  const [apiSuccess, setApiSuccess] = useState({});
  const [apiError, setApiError] = useState({});

  return (
    <div className="App">
      <SearchBar setApiSuccess={setApiSuccess} setApiError={setApiError} />
      <Recipes apiSuccess={apiSuccess} apiError={apiError} />
    </div>
  );
}

function getRecipes() {
  
}


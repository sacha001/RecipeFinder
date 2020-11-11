import React, { Component } from 'react'; // let's also import Component

interface props {
    apiSuccess: Object;
    apiError: Object;
}

export default function Recipes(props:props) {
    
    return (
      <p>{JSON.stringify(props.apiSuccess)}</p>
    );
}
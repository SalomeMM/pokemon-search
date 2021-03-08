//jshint esversion:6

import React from 'react';
import PokemonSearch from "./components/PokemonSearch";
import './App.css';

function App() {
  return (
    <div className="App">
      <PokemonSearch name="John Doe" numberOfPokemons={5} />
      <p>Type the name of a Pokémon and click on the Search button!</p>
    </div>
  );
}

export default App;

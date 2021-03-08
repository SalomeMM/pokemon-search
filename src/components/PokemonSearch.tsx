import React, { Component } from "react";
import User from "../interfaces/User.interface";

interface SearchState {
  error: boolean;
  pokemon: Pokemon;
}

interface Pokemon {
  name: string;
  numberOfAbilities: number;
  baseExperience: number;
  imageUrl: string;
}

// in ts we need to specify the type of props
export class PokemonSearch extends Component<User, SearchState> {
  pokemonRef: React.RefObject<HTMLInputElement>;
  constructor(props: User) {
    super(props);
    this.state = {
      error: false,
      pokemon: null,
    };
    this.pokemonRef = React.createRef();
  }
  onSearchClick = (): void => {
    const inputValue = this.pokemonRef.current.value;
    fetch(`https://pokeapi.co/api/v2/pokemon/${inputValue}`).then((res) => {
      if (res.status !== 200) {
        this.setState({ error: true });
        return;
      }
      res.json().then((data) => {
        this.setState({
          error: false,
          pokemon: {
            name: data.name,
            numberOfAbilities: data.abilities.length,
            baseExperience: data.base_experience, // all of this is from the API
            imageUrl: data.sprites.front_default,
          },
        });
      });
    });
    };
    
    // example of function with type:
    // addNumbers = (a: number, b: number): number => {
    //     return "Hello"; // this will trigger an error because "Hello" is not a number, as required.
    // }

  render() {
    const { name: userName, numberOfPokemons } = this.props;
    const {
      error,
      pokemon
    } = this.state;

    let resultMarkup;

    if (error) {
      resultMarkup = <p>Pokemon not found, please try again.</p>;
    } else if (this.state.pokemon) {
      resultMarkup = (
        <div>
          <img src={pokemon.imageUrl} alt="pokemon" className="pokemon-image" />
          <p>
            {pokemon.name} has {pokemon.numberOfAbilities} abilities and{" "}
            {pokemon.baseExperience} base experience points.
          </p>
        </div>
      );
    }

    return (
      <div>
        <h2>Type the name of a Pokémon and click on the Search button!</h2>
        <p>
          User {userName}
          {""}
          {numberOfPokemons && <span> has {numberOfPokemons} pokemons.</span>}
        </p>
        <input type="text" ref={this.pokemonRef} />
        <button onClick={this.onSearchClick} className="my-button">
          Search
        </button>
        {resultMarkup}
      </div>
    );
  }
}

export default PokemonSearch;

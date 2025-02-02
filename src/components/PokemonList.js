// import React from "react";
// import PokemonCard from "./PokemonCard";

// const PokemonList = ({ pokemonData }) => {
//   return (
//     <div className="row">
//       {pokemonData.length > 0 ? (
//         pokemonData.map((pokemon) => (
//           <div key={pokemon.id} className="col-md-4 mb-4">
//             <PokemonCard pokemon={pokemon} />
//           </div>
//         ))
//       ) : (
//         <h4 className="text-center">No Pokémon found.</h4>
//       )}
//     </div>
//   );
// };

// export default PokemonList;

import React from "react";
import PokemonCard from "./PokemonCard";

const PokemonList = ({ pokemonData }) => {
  // Log the data to identify duplicates
  console.log(pokemonData);

  // Ensure unique pokemon data based on pokemon.id
  const uniquePokemonData = [
    ...new Map(pokemonData.map((pokemon) => [pokemon.id, pokemon])).values(),
  ];

  return (
    <div className="row">
      {uniquePokemonData.length > 0 ? (
        uniquePokemonData.map((pokemon, index) => (
          <div key={pokemon.id || index} className="col-md-4 mb-4">
            <PokemonCard pokemon={pokemon} />
          </div>
        ))
      ) : (
        <h4 className="text-center">No Pokémon found.</h4>
      )}
    </div>
  );
};

export default PokemonList;



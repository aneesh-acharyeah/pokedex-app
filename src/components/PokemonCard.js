

import React, { useState } from "react";

const PokemonCard = ({ pokemon }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="card shadow-sm text-center p-3 position-relative"
      onMouseEnter={() => setHovered(true)}  // Hover start
      onMouseLeave={() => setHovered(false)} // Hover end
    >
      <img
        src={pokemon.image}
        alt={pokemon.name}
        className="card-img-top w-50 mx-auto"
      />
      <div className="card-body">
        <h5 className="card-title text-capitalize">{pokemon.name}</h5>
        <p className="card-text">
          <strong>Type:</strong> {pokemon.type}
        </p>

        {/* Hover Overlay with Details */}
        <div
          className={`hover-overlay ${hovered ? 'active' : ''}`}
        >
          <p><strong>Height:</strong> {pokemon.height} m</p>
          <p><strong>Weight:</strong> {pokemon.weight} kg</p>
          <p><strong>Abilities:</strong> {pokemon.abilities}</p>
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;


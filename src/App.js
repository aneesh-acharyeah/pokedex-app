// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Navbar from "./components/Navbar";
// import PokemonList from "./components/PokemonList";
// import SearchBar from "./components/SearchBar";
// import "./styles.css";
// import Footer from "./components/Footer";


// const App = () => {
//   const [pokemonData, setPokemonData] = useState([]);
//   const [filteredPokemon, setFilteredPokemon] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");

//   useEffect(() => {
//     const fetchPokemon = async () => {
//       try {
//         let response = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=200");
//         let pokemonDetails = await Promise.all(
//           response.data.results.map(async (pokemon) => {
//             let res = await axios.get(pokemon.url);
//             return {
//               id: res.data.id,
//               name: res.data.name,
//               image: res.data.sprites.front_default,
//               type: res.data.types.map((type) => type.type.name).join(", "),
//               height: res.data.height,  // Fetch height
//               weight: res.data.weight,  // Fetch weight
//               abilities: res.data.abilities.map((ability) => ability.ability.name).join(", "), // Fetch abilities
//             };
//           })
//         );
//         setPokemonData(pokemonDetails);
//         setFilteredPokemon(pokemonDetails);
//       } catch (error) {
//         console.error("Error fetching Pokémon data:", error);
//       }
//     };
//     fetchPokemon();
//   }, []);
 
//   useEffect(() => {
//     const filtered = pokemonData.filter((pokemon) =>
//       pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//     setFilteredPokemon(filtered);
//   }, [searchTerm, pokemonData]);

//   return (
//     <div>
//       <Navbar />
//       <div className="container mt-4">
//         <SearchBar setSearchTerm={setSearchTerm} />
//         <PokemonList pokemonData={filteredPokemon} />
       

//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default App;


import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import PokemonList from "./components/PokemonList";
import SearchBar from "./components/SearchBar";
import Footer from "./components/Footer";
import "./styles.css";

const App = () => {
  const [pokemonData, setPokemonData] = useState([]);
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);

  const limit = 20;

  useEffect(() => {
    const fetchPokemon = async () => {
      setLoading(true);
      try {
        let response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
        );
        let pokemonDetails = await Promise.all(
          response.data.results.map(async (pokemon) => {
            let res = await axios.get(pokemon.url);
            return {
              id: res.data.id,
              name: res.data.name,
              image: res.data.sprites.front_default,
              type: res.data.types.map((type) => type.type.name).join(", "),
              height: res.data.height,
              weight: res.data.weight,
              abilities: res.data.abilities.map((ability) => ability.ability.name).join(", "),
            };
          })
        );
        setPokemonData((prevData) => [...prevData, ...pokemonDetails]);
        setFilteredPokemon((prevData) => [...prevData, ...pokemonDetails]);

        if (response.data.results.length < limit) {
          setHasMore(false);
        }
      } catch (error) {
        console.error("Error fetching Pokémon data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, [offset]);

  useEffect(() => {
    // Log the search term to see if it's updating
    console.log("Search Term: ", searchTerm);

    const filtered = pokemonData.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    console.log("Filtered Pokemon: ", filtered); // Log the filtered Pokémon data
    setFilteredPokemon(filtered);
  }, [searchTerm, pokemonData]);

  const loadMore = () => {
    if (!loading && hasMore) {
      setOffset((prevOffset) => prevOffset + limit);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container mt-4">
        <SearchBar setSearchTerm={setSearchTerm} />
        <PokemonList pokemonData={filteredPokemon} />
        {loading && <div className="text-center">Loading...</div>}
        <div className="text-center">
          {hasMore && !loading && (
            <button className="btn btn-primary" onClick={loadMore}>
              Load More
            </button>
          )}
          {!hasMore && <p>No more Pokémon to load.</p>}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default App;

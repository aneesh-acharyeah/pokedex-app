// import React from "react";

// const SearchBar = ({ setSearchTerm }) => {
//   return (
//     <div className="mb-3">
//       <input
//         type="text"
//         className="form-control"
//         placeholder="Search Pokémon..."
//         onChange={(e) => setSearchTerm(e.target.value)}
//       />
//     </div>
//   );
// };

// export default SearchBar;
import React from "react";

const SearchBar = ({ setSearchTerm }) => {
  const handleSearchChange = (event) => {
    console.log("Input Value: ", event.target.value); // Log the input value
    setSearchTerm(event.target.value); // Update the search term
  };

  return (
    <div className="mb-4">
      <input
        type="text"
        className="form-control"
        placeholder="Search Pokémon..."
        onChange={handleSearchChange}
      />
    </div>
  );
};

export default SearchBar;

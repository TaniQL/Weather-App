import React from 'react';

const SearchBar = ({ city, setCity, handleSearch }) => {
  return (
    <form
      onSubmit={handleSearch}
      className="bg-white/10 backdrop-blur-md rounded-2xl p-4 flex items-center gap-2 shadow-md w-full max-w-md mx-auto"
    >
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Search city..."
        className="flex-1 bg-transparent border-none outline-none text-white placeholder-white/70"
      />
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl transition"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;

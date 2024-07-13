import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchPokemon = async () => {
      const promises = [];
      for (let i = 1; i <= 150; i++) {
        promises.push(axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`));
      }
      const results = await Promise.all(promises);
      setPokemon(results.map((res) => res.data));
    };
    fetchPokemon();
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const filteredPokemon = pokemon.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="App">
      <h1>Pokémon</h1>
      <input
        type="text"
        placeholder="Search Pokémon..."
        value={search}
        onChange={handleSearch}
      />
      <div className="pokemon-container">
        {filteredPokemon.map((p) => (
          <div key={p.id} className="pokemon-card">
            <img src={p.sprites.front_default} alt={p.name} />
            <h2>{p.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

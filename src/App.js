import { useContext, useEffect, useState } from 'react';

import { PokemonContext } from './context/PokemonContext';

import PokemonCard from './components/PokemonCard';

function App() {
    const { loading, pokemonList } = useContext(PokemonContext);
    const [filteredPokemonList, setFilteredPokemonList] = useState([]);
    const [offset, setOffset] = useState(20);
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        setFilteredPokemonList(pokemonList.slice(0, offset));
    }, [pokemonList, offset]);

    function handleOnChange(event) {
        const { value } = event.target;

        setInputValue(value);
    }

    function handleSearch() {
        if (inputValue) {
            const filteredList = pokemonList.filter((pokemon) => {
                return pokemon.name.includes(inputValue);
            });

            setFilteredPokemonList(filteredList);
        }
    }

    function handleClear() {
        setInputValue('');
        setFilteredPokemonList(pokemonList.slice(0, offset));
    }

    function handleLoadMorePokemon() {
        setOffset((oldOffset) => oldOffset + 20);
    }

    return (
        <div>
            <h1>Pokédex</h1>
            <input type="text" onChange={handleOnChange} value={inputValue} />
            <button onClick={handleSearch}>Buscar</button>
            <button onClick={handleClear}>Limpar</button>
            {loading ? (
                <h1>Loading Pokemon List</h1>
            ) : (
                filteredPokemonList.map((pokemon, index) => (
                    <div key={pokemon.name}>
                        <PokemonCard name={pokemon.name} />
                    </div>
                ))
            )}
            <button onClick={handleLoadMorePokemon}>Carregar mais</button>
        </div>
    );
}

export default App;

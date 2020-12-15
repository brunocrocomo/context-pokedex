import { createContext, useEffect, useState, useRef } from 'react';

const PokemonContext = createContext();

const PokemonProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [pokemonList, setPokemonList] = useState([]);
    const pokemonCache = useRef({});

    useEffect(() => {
        async function fetchPokemonList() {
            setLoading(true);

            const response = await fetch(
                'https://pokeapi.co/api/v2/pokemon?limit=9999',
            );
            const { results } = await response.json();
            setPokemonList(results);

            setLoading(false);
        }

        fetchPokemonList();
    }, []);

    async function getPokemonByName(name) {
        if (!pokemonCache.current[name]) {
            const promise = new Promise(async (resolve) => {
                const response = await fetch(
                    `https://pokeapi.co/api/v2/pokemon/${name}`,
                );
                const responseJSON = await response.json();

                resolve(responseJSON);
            });
            pokemonCache.current[name] = promise;
        }

        return pokemonCache.current[name];
    }

    return (
        <PokemonContext.Provider
            value={{ loading, pokemonList, getPokemonByName }}
        >
            {children}
        </PokemonContext.Provider>
    );
};

export { PokemonContext, PokemonProvider };

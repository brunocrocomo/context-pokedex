import { useContext, useState, useEffect } from 'react';

import { PokemonContext } from '../context/PokemonContext';

function Pokemon({ name }) {
    const [pokemonData, setPokemonData] = useState();

    const { getPokemonByName } = useContext(PokemonContext);

    useEffect(() => {
        async function getPokemon() {
            const data = await getPokemonByName(name);
            setPokemonData(data);
        }

        getPokemon();
    }, [getPokemonByName, name]);

    return (
        <div>
            {pokemonData ? (
                <h1>
                    #{pokemonData.id} - {pokemonData.name} (
                    {pokemonData.types.map((type) => type.type.name).join(', ')}
                    )
                </h1>
            ) : (
                <h1>LOADING POKEMON!</h1>
            )}
        </div>
    );
}

export default Pokemon;

import React from 'react';
import ReactDOM from 'react-dom';

import { PokemonProvider } from './context/PokemonContext';

import App from './App';

ReactDOM.render(
    <React.StrictMode>
        <PokemonProvider>
            <App />
        </PokemonProvider>
    </React.StrictMode>,
    document.getElementById('root'),
);

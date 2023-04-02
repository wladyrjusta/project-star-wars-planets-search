import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import PlanetsProvider from './context/PlanetsProvider';
import FiltersProvider from './context/FiltersProvider';

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(
    <PlanetsProvider>
      <FiltersProvider>
        <App />
      </FiltersProvider>
    </PlanetsProvider>,
  );

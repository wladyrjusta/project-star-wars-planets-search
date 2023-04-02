import React from 'react';

import './App.css';
import SetFilters from './Components/SetFilters';
import PlanetsProvider from './context/PlanetsProvider';
import FiltersProvider from './context/FiltersProvider';

function App() {
  return (
    <PlanetsProvider>
      <FiltersProvider>
        <SetFilters />
      </FiltersProvider>
    </PlanetsProvider>

  );
}

export default App;

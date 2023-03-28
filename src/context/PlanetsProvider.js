import React from 'react';
import PropTypes from 'prop-types';

import PlanetContext from './PlanetsContext';

export default function PlanetsProvider({ children }) {
  const fetchPlanets = async (setState) => {
    const API_PLANETS_URL = 'https://swapi.dev/api/planets';
    const data = await (await fetch(API_PLANETS_URL)).json();
    setState([...data.results]);
  };

  return (
    <div>
      <PlanetContext.Provider value={ { fetch: fetchPlanets } }>
        { children }
      </PlanetContext.Provider>
    </div>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.objectOf(PropTypes.string),
}.isRequired;

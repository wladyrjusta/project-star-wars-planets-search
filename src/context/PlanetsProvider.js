import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import PlanetContext from './PlanetsContext';

export default function PlanetsProvider({ children }) {
  const [planets, setPlanets] = useState([]);

  const fetchPlanets = async () => {
    const API_PLANETS_URL = 'https://swapi.dev/api/planets';
    const data = await (await fetch(API_PLANETS_URL)).json();
    setPlanets([...data.results]);
  };

  useEffect(() => {
    fetchPlanets();
  }, []);

  const value = {
    planets,
    setPlanets,
    fetchPlanets,
  };

  return (
    <div>
      <PlanetContext.Provider value={ value }>
        { children }
      </PlanetContext.Provider>
    </div>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.objectOf(PropTypes.string),
}.isRequired;

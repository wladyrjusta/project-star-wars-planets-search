import React, { useContext, useEffect, useState } from 'react';

import PlanetContext from './context/PlanetsContext';
import './App.css';
import SetFilters from './Components/SetFilters';

function App() {
  const [planets, setPlanets] = useState([]);
  const planetsFecth = useContext(PlanetContext);
  const { fetch } = planetsFecth;

  useEffect(() => {
    fetch(setPlanets);
  }, [fetch]);
  return (
    <SetFilters planets={ planets } />
  );
}

export default App;

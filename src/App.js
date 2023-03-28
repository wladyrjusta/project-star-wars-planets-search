import React, { useContext, useEffect, useState } from 'react';

import PlanetContext from './context/PlanetsContext';
import PlanetsTable from './Components/PlanetsTable';
import './App.css';

function App() {
  const [planets, setPlanets] = useState([]);
  const planetsFecth = useContext(PlanetContext);
  const { fetch } = planetsFecth;

  useEffect(() => {
    fetch(setPlanets);
  }, [fetch]);
  return (
    <PlanetsTable planets={ planets } />
  );
}

export default App;

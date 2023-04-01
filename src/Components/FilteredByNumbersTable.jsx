import React from 'react';
import PropTypes from 'prop-types';

function FilteredByNumbersTable({
  planets, numericFilters, textFilter }) {
  const filteredByTextPlanets = planets
    .filter((planet) => planet.name.toLocaleLowerCase()
      .includes(textFilter.toLocaleLowerCase()));

  let filteredByNumbersPlanets = filteredByTextPlanets;

  numericFilters.forEach(({ columnFilter, operator, number }) => {
    if (operator === 'maior que') {
      filteredByNumbersPlanets = filteredByNumbersPlanets
        .filter((planet) => Number(planet[columnFilter]) > Number(number));
    }
    if (operator === 'menor que') {
      filteredByNumbersPlanets = filteredByNumbersPlanets
        .filter((planet) => Number(planet[columnFilter]) < Number(number));
    }
    if (operator === 'igual a') {
      filteredByNumbersPlanets = filteredByNumbersPlanets
        .filter((planet) => Number(planet[columnFilter]) === Number(number));
    }
  });

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Rotation Period</th>
            <th scope="col">Orbital Period</th>
            <th scope="col">Diameter</th>
            <th scope="col">Climate</th>
            <th scope="col">Gravity</th>
            <th scope="col">Terrain</th>
            <th scope="col">Surface Water</th>
            <th scope="col">Population</th>
            <th scope="col">Films</th>
            <th scope="col">Created</th>
            <th scope="col">Edited Water</th>
            <th scope="col">URL</th>
          </tr>
        </thead>
        <tbody>
          { filteredByNumbersPlanets.map((planet) => (
            <tr key={ planet.name }>
              <td>{ planet.name }</td>
              <td>{ planet.rotation_period}</td>
              <td>{ planet.orbital_period }</td>
              <td>{ planet.diameter }</td>
              <td>{ planet.climate }</td>
              <td>{ planet.gravity }</td>
              <td>{ planet.terrain }</td>
              <td>{ planet.surface_water }</td>
              <td>{ planet.population }</td>
              <td>{ planet.films }</td>
              <td>{ planet.created }</td>
              <td>{ planet.edited }</td>
              <td>{ planet.url }</td>
            </tr>))}
        </tbody>
      </table>
    </div>
  );
}

FilteredByNumbersTable.propTypes = {
  planets: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
  columnFilter: PropTypes.string,
  operator: PropTypes.string,
  number: PropTypes.string,
  textFilter: PropTypes.string,
  numericFilters: PropTypes.arrayOf(PropTypes.shape({
    columnFilter: PropTypes.string,
    operator: PropTypes.string,
    number: PropTypes.string,
  })),
}.isRequired;

export default FilteredByNumbersTable;

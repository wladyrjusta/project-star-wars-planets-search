import React from 'react';
import PropTypes from 'prop-types';

function FilteredByTextTable({ textFilter, planets }) {
  const filteredByTextPlanets = planets
    .filter((planet) => planet.name.toLocaleLowerCase()
      .includes(textFilter.toLocaleLowerCase()));

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
          { filteredByTextPlanets.map((planet) => (
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

FilteredByTextTable.propTypes = {
  planets: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
  textFilter: PropTypes.string,
}.isRequired;

export default FilteredByTextTable;

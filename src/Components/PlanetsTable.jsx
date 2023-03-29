import React, { useState } from 'react';
import PropTypes from 'prop-types';

import starWarsLogo from '../starWarsLogo.png';
import '../App.css';

export default function PlanetsTable({ planets }) {
  const [filterNum, setFilterNum] = useState(false);
  const [textFilter, setFilterByText] = useState('');
  const [columnFilter, setColumnFilter] = useState('population');
  const [operator, setOperator] = useState('maior que');
  const [number, setNumber] = useState('0');

  const filteredByTextPlanets = planets
    .filter((planet) => planet.name
      .includes(textFilter));

  const filteredByNumbersPlanets = planets.filter((planet) => {
    if (operator === 'maior que') {
      return planet[columnFilter] > Number(number);
    }
    if (operator === 'menor que') {
      return planet[columnFilter] < Number(number);
    }
    if (operator === 'igual a') {
      return planet[columnFilter] === number;
    }
    return filteredByNumbersPlanets;
  });

  const handleFilterClick = () => {
    setFilterNum(true);
  };

  const handleClearFilterClick = () => {
    setFilterNum(false);
    setNumber('0');
    setColumnFilter('population');
    setOperator('maior que');
  };

  return (
    <div className="table-container">
      <img className="star-wars-logo" src={ starWarsLogo } alt="logo star wars" />
      { filterNum ? (
        <p>
          {`${columnFilter} ${operator} ${number}`}
          <button
            type="button"
            onClick={ () => handleClearFilterClick() }
          >
            X
          </button>
        </p>) : <br />}
      <label htmlFor="pesquisa-por-texto">
        Filtro por texto
        <input
          data-testid="name-filter"
          className="input-filter-by-text"
          type="text"
          name="findPlanets"
          id="pesquisa-por-texto"
          value={ textFilter }
          onChange={ ({ target }) => setFilterByText(target.value) }
        />
        <label htmlFor="column-filter">
          <select
            data-testid="column-filter"
            value={ columnFilter }
            type="text"
            name="column-filter"
            id="column-filter"
            onChange={ ({ target }) => setColumnFilter(target.value) }
          >
            <option
              value="population"
            >
              population
            </option>
            <option
              value="orbital_period"
            >
              orbital_period
            </option>
            <option
              value="diameter"
            >
              diameter
            </option>
            <option
              value="rotation_period"
            >
              rotation_period
            </option>
            <option
              value="surface_water"
            >
              surface_water
            </option>
          </select>
        </label>
        <label htmlFor="operator">
          <select
            data-testid="comparison-filter"
            value={ operator }
            type="text"
            name="comparison-filter"
            id="comparison-filter"
            onChange={ ({ target }) => setOperator(target.value) }
          >
            <option
              value="maior que"
            >
              maior que
            </option>
            <option
              value="menor que"
            >
              menor que
            </option>
            <option
              value="igual a"
            >
              igual a
            </option>
          </select>
        </label>
        <input
          data-testid="value-filter"
          className="input-filter-by-text"
          type="number"
          name="findPlanets"
          id="pesquisa-por-texto"
          value={ number }
          onChange={ ({ target }) => setNumber(target.value) }
        />
      </label>
      <button
        data-testid="button-filter"
        type="button"
        onClick={ () => handleFilterClick() }
      >
        Filtrar
      </button>
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
          { filterNum ? (filteredByNumbersPlanets.map((planet) => (
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
            </tr>))) : filteredByTextPlanets
            .map((planet) => (
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

PlanetsTable.propTypes = {
  planets: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
}.isRequired;

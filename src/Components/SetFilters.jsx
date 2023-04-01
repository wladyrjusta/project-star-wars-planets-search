import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import PlanetsTable from './PlanetsTable';
import starWarsLogo from '../starWarsLogo.png';
import '../App.css';
import FilteredByTextTable from './FilteredByTextTable';
import FilteredByNumbersTable from './FilteredByNumbersTable';

export default function SetFilters({ planets }) {
  const [filterText, setFilterText] = useState(false);
  // const [filterNum, setFilterNum] = useState(false);
  const [textFilter, setFilterByText] = useState('');
  const [columnFilter, setColumnFilter] = useState('population');
  const [operator, setOperator] = useState('maior que');
  const [number, setNumber] = useState('0');
  const [numericFilters, setNumericFilters] = useState([]);

  useEffect(() => {
    if (textFilter.length > 0) { return setFilterText(true); }
    if (textFilter.length === 0) { return setFilterText(false); }
  }, [textFilter]);

  const handleFilterClick = () => {
    // setFilterNum(true);
    setNumericFilters([...numericFilters, { columnFilter, operator, number }]);
  };

  const handleClearFilterClick = (indexFilter) => {
    const newNumericFilters = numericFilters
      .filter((_filter, index) => index !== indexFilter);
    // setFilterNum(false);
    setNumber('0');
    setColumnFilter('population');
    setOperator('maior que');
    setNumericFilters([...newNumericFilters]);
  };

  return (
    <div className="table-container">
      <img className="star-wars-logo" src={ starWarsLogo } alt="logo star wars" />
      { numericFilters.length > 0
        && numericFilters.map((filter, index) => (
          <div key={ index }>
            <p>
              <span>{` ${filter.columnFilter} `}</span>
              <span>{` ${filter.operator} `}</span>
              <span>{` ${filter.number} `}</span>
            </p>
            <button
              type="button"
              onClick={ () => handleClearFilterClick(index) }
            >
              X
            </button>
          </div>)) }
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
      { (!filterText
        && numericFilters.length === 0) && <PlanetsTable planets={ planets } /> }
      { (filterText
        && numericFilters.length === 0)
      && <FilteredByTextTable planets={ planets } textFilter={ textFilter } /> }
      { numericFilters.length > 0
        && <FilteredByNumbersTable
          planets={ planets }
          operator={ operator }
          columnFilter={ columnFilter }
          number={ number }
          textFilter={ textFilter }
          numericFilters={ numericFilters }
        />}
    </div>
  );
}

SetFilters.propTypes = {
  planets: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
}.isRequired;

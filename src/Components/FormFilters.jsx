import React from 'react';
import PropTypes from 'prop-types';

import '../App.css';

function FormFilters({ textFilter,
  setFilterByText,
  columnFilter,
  setColumnFilter,
  operator,
  setOperator,
  number,
  setNumber,
  handleFilterClick,
  columns,
  clearAllNumericFilters }) {
  return (
    <div className="filters-form">
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
      </label>
      <label htmlFor="column-filter">
        <select
          className="form-select"
          data-testid="column-filter"
          value={ columnFilter }
          type="text"
          name="column-filter"
          id="column-filter"
          onChange={ ({ target }) => setColumnFilter(target.value) }
        >
          { columns.map((column) => (
            <option
              key={ column }
              value={ column }
            >
              { column }
            </option>
          ))}
        </select>
      </label>
      <label htmlFor="operator">
        <select
          className="form-select"
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
      <label>
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
        className="filter-btn"
        data-testid="button-filter"
        type="button"
        onClick={ () => handleFilterClick() }
      >
        Filtrar
      </button>

      <button
        className="filter-btn"
        data-testid="button-remove-filters"
        type="button"
        onClick={ () => clearAllNumericFilters() }
      >
        Limpar todos os filtros
      </button>
    </div>
  );
}

FormFilters.propTypes = { textFilter: PropTypes.string,
  setFilterByText: PropTypes.func,
  columnFilter: PropTypes.string,
  setColumnFilter: PropTypes.func,
  operator: PropTypes.string,
  setOperator: PropTypes.func,
  number: PropTypes.string,
  setNumber: PropTypes.func,
  handleFilterClick: PropTypes.func,
  columns: PropTypes.arrayOf(PropTypes.string),
  clearAllNumericFilters: PropTypes.func,
}.isRequired;

export default FormFilters;

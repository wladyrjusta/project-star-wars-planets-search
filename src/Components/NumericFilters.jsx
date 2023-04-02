import React from 'react';
import PropTypes from 'prop-types';

import trashIcon from '../trash-icon.png';

function NumericFilters({ numericFilters, handleClearFilterClick }) {
  return (
    <div>
      { numericFilters.map((filter, index) => (
        <div
          data-testid="filter"
          key={ index }
          className="numeric-filters"
        >
          <p>
            <span>{` ${filter.columnFilter} `}</span>
            <span>{` ${filter.operator} `}</span>
            <span>{` ${filter.number} `}</span>
          </p>
          <button
            type="button"
            data-testid="filter-clear-btn"
            onClick={ () => handleClearFilterClick(index) }
          >
            <img
              className="image-delete"
              src={ trashIcon }
              alt="icone de lixo para delete"
            />
          </button>
        </div>)) }
    </div>
  );
}

NumericFilters.propTypes = {
  numericFilters: PropTypes.arrayOf(PropTypes.shape({
    columnFilter: PropTypes.string,
    operator: PropTypes.string,
    number: PropTypes.string,
  })),
  handleClearFilterClick: PropTypes.func,
}.isRequired;

export default NumericFilters;

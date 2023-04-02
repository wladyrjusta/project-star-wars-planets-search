import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import FormFilters from './FormFilters';
import FiltersContext from '../context/FiltersContext';
import starWarsLogo from '../starWarsLogo.png';
import '../App.css';
import FilteredByNumbersTable from './FilteredByNumbersTable';
import NumericFilters from './NumericFilters';

export default function SetFilters({ planets }) {
  const { textFilter,
    setFilterByText,
    columnFilter,
    setColumnFilter,
    operator,
    setOperator,
    number,
    setNumber,
    numericFilters,
    handleFilterClick,
    handleClearFilterClick,
    columns,
    clearAllNumericFilters } = useContext(FiltersContext);

  return (
    <div className="table-container">
      <img className="star-wars-logo" src={ starWarsLogo } alt="logo star wars" />
      { numericFilters.length > 0
        && <NumericFilters
          numericFilters={ numericFilters }
          handleClearFilterClick={ handleClearFilterClick }
        /> }
      <FormFilters
        textFilter={ textFilter }
        setFilterByText={ setFilterByText }
        columnFilter={ columnFilter }
        setColumnFilter={ setColumnFilter }
        operator={ operator }
        setOperator={ setOperator }
        number={ number }
        setNumber={ setNumber }
        handleFilterClick={ handleFilterClick }
        columns={ columns }
        clearAllNumericFilters={ clearAllNumericFilters }
      />
      <FilteredByNumbersTable
        planets={ planets }
        operator={ operator }
        columnFilter={ columnFilter }
        number={ number }
        textFilter={ textFilter }
        numericFilters={ numericFilters }
      />
    </div>
  );
}

SetFilters.propTypes = {
  planets: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
}.isRequired;

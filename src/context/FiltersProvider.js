import React, { useState } from 'react';
import PropTypes from 'prop-types';

import FiltersContext from './FiltersContext';

function FiltersProvider({ children }) {
  const columnsArray = ['population',
    'orbital_period', 'diameter', 'rotation_period', 'surface_water'];

  const [textFilter, setFilterByText] = useState('');
  const [columnFilter, setColumnFilter] = useState('population');
  const [columns, setColumns] = useState([...columnsArray]);
  const [operator, setOperator] = useState('maior que');
  const [number, setNumber] = useState('0');
  const [numericFilters, setNumericFilters] = useState([]);

  const handleFilterClick = () => {
    setNumericFilters([...numericFilters, { columnFilter, operator, number }]);

    const newColumns = columns.filter((column) => column !== columnFilter);
    setColumns(newColumns);
    setNumber('0');
    setColumnFilter(newColumns[0]);
    console.log(columnFilter);
  };

  const clearAllNumericFilters = () => {
    setNumericFilters([]);
    setColumns(columnsArray);
  };

  const handleClearFilterClick = (indexFilter) => {
    const newNumericFilters = numericFilters
      .filter((_filter, index) => index !== indexFilter);
    setNumericFilters([...newNumericFilters]);
    setNumber('0');
    setOperator('maior que');
    numericFilters.forEach((filter) => setColumns([...columns, filter.columnFilter]));
  };

  const value = {
    textFilter,
    setFilterByText,
    columnFilter,
    setColumnFilter,
    columns,
    setColumns,
    operator,
    setOperator,
    number,
    setNumber,
    numericFilters,
    setNumericFilters,
    handleFilterClick,
    handleClearFilterClick,
    clearAllNumericFilters,
  };

  return (
    <div>
      <FiltersContext.Provider value={ value }>
        { children }
      </FiltersContext.Provider>
    </div>
  );
}

FiltersProvider.propTypes = {
  children: PropTypes.objectOf(PropTypes.string),
}.isRequired;

export default FiltersProvider;

import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import Select from './Select';

export default withRouter (( { history, location }) => {
  const { sort_param, order, query, page } = Object.fromEntries(new URLSearchParams(location.search));
  const [ sortData, setSortData ] = useState({sort_param, order});
  const sortOptions = [
    {name: "Sort by: Relevance", value: ""},
    {name: "Sort by: Highest price", value: "sort_param=price&order=desc"},
    {name: "Sort by: Lowest price", value: "sort_param=price&order=asc"},
    {name: "Sort by: Most sold", value: "sort_param=quantitySold&order=desc"},
  ]

  const handleSelect = ({ target: { value }}) => {
    history.push(`?query=${query}&page=${page || '1'}&${value}`)
  }

  return (
    <div>
    <Select
    options={sortOptions}
    onChange={handleSelect}
     />
     </div>
  )

})
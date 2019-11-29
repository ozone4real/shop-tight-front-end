import React, { useState } from 'react'
import { withRouter, Link } from 'react-router-dom';
import { useLazyQuery } from '@apollo/react-hooks';
import AutoComplete from 'react-autocomplete';
import { SEARCH_QUERY } from '../../graphql/queries';

const SearchBar = ({ history, location }) => {
  let initialValue = new URLSearchParams(location.search).get('query') || '';
  
  const [ searchValue, setSearchValue ] = useState(initialValue)

  const [ fetchData, { data }  ] = useLazyQuery(SEARCH_QUERY, { 
    fetchPolicy: "cache-and-network",
    variables: {
    query: searchValue,
    limit: 10
  }})

  const handleChange = ({ target: { value }}) => {
    setSearchValue(value)
    fetchData() 
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const query = searchValue.trim()
    history.push(`/search?query=${query}`)
  }

  return (
    <form onSubmit={handleSubmit}>
      <AutoComplete
       getItemValue={(item={}) => `${item.productName}`}
       renderItem={(item, isHighlighted) =>
        <Link to={`/products/${item.urlKey}`} className="menu-item" style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
          {`${item.brand} ${item.productName}`}
        </Link>
      }

      renderMenu={(items, value, style) => (
        <div className="menu-dropdown" children={items}/>
      )}
      
      wrapperProps = {{className: "input-wrapper"}}
      renderInput = {(props) => (
        <input className="search-input" placeholder="Search products" {...props}
        type="text"  onChange={handleChange} required 
         />
      )}
       items={data ? data.searchResults : [] }
        value={searchValue}
       />
      <button className="search-submit-btn">Search</button>
    </form>
  )
}

export default withRouter(SearchBar);
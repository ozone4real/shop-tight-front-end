import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { SEARCH_QUERY } from '../../graphql/queries'
import ProductCardSmall from '../ui-molecules/ProductCard-Small';
import SortMenu from '../ui-molecules/SortMenu';
import ProductCardSkeleton from '../ui-molecules/ProductCardSkeleton';


export default ({ location }) => {
  const queryParams = new URLSearchParams(location.search);
  const  { query, page, sort_param, order } = Object.fromEntries(queryParams)
  const { data, loading } = useQuery(SEARCH_QUERY, { 
    fetchPolicy: "cache-and-network",
    variables: {
    query,
    page: parseInt(page),
    sortParams: {[sort_param] : order}
  }})


  return ( 
  <div className="search-results-page">
    <div className="container"> 
    <h2 >Search Results for "{ query }"</h2>
    <SortMenu />
    <div className="search-results-container">
      <div className="product-list">
      {data ? data.searchResults.map((item) => (
        <ProductCardSmall product={item} /> 
      )) : <div className="product-list">{Array.from({ length: 30 }, () =>  <ProductCardSkeleton /> )}</div> }
      </div>
    </div>
    </div>
  </div> 
  )
} 
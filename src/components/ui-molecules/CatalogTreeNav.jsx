import React, {Fragment} from 'react';
import { NavLink } from 'react-router-dom'

export default ({tree, product}) => (
  <nav className="catalog-tree-nav">
    <NavLink to="/" className="text-md">Home</NavLink>
    {tree.map((node) => (
      <Fragment key={node.urlKey}>
     <span className="next-arrow text-lighter"> > </span> 
     <NavLink className="text-md" to={`/${node.urlKey}`} key={node.urlKey}>{node.categoryName}</NavLink>
     </Fragment>
    ))}
     <Fragment>
     <span className="next-arrow text-lighter"> > </span> 
    <span className="text-md text-light">{product}</span>
    </Fragment>
  </nav>
)
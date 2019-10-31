import React from 'react'
import { NavLink, Link } from 'react-router-dom';
import { useQuery, useApolloClient } from '@apollo/react-hooks';
import { CATEGORIES } from '../../graphql/queries';




const NavBar = () => {
  const {data, loading} = useQuery(CATEGORIES, { fetchPolicy: 'cache-and-network' })
  console.log(data)
  return (<nav className="navbar">
    <div className="nav-container" >
    <div className="home-link">
      <NavLink to="/">Home</NavLink>
    </div>
      {data && data.categories.map((cat) => (
        <div className="cat-link" key={cat.id}>
        <NavLink to={`/categories/${cat.urlKey}`} >
        {cat.categoryName}
        </NavLink>
        <div className="subCat-link">
          {cat.subCategories.map((subCat) => <Link to={`/sub-categories/${subCat.urlKey}`} key={subCat.id}>{subCat.categoryName}</Link>)}
        </div>
        </div>
      ))}
    </div>
  </nav>)
}

export default NavBar
import React, { useState, useEffect, Fragment } from 'react';
import { useQuery } from "@apollo/react-hooks";
import { Link } from 'react-router-dom'
import { CATEGORIES } from '../../graphql/queries'


export default () => {
  const [ currentIndex, setCurrentIndex ] = useState(0);
  const { data, loading } = useQuery(CATEGORIES);

  useEffect(() => {
    const timer = setTimeout(() => setCurrentIndex((currentIndex + 1 ) % selectedCategories.length ), 7000)
    return () => clearTimeout(timer)
  })

  if(loading) return <div></div>

  const selectedCategories = data.categories.filter(({categoryName}) => (
    ["Phones And Tablets", "Computers", "Women's shoes" ].includes(categoryName)) 
  );

  const descPositions = [
    {left: 0, top: '25%'},
    {left: 0, top: 10},
    {right: 0, top: '25%'},
    {right: 0, top: 10},
    {top: 0, left: '27.5%'},
    {bottom: 0, left: '27.5%'},
    {top: '25%', left: '27.5%'}
  ]
  
  const currentCat  = selectedCategories[currentIndex]
  const position = Math.floor(Math.random() * descPositions.length)

  return (<section className="showcase-carousel">

      {selectedCategories.map((cat, index) => (
      <Link to={`/categories/${cat.urlKey}`} key={index}>
      <div className={`carousel-item ${index === currentIndex && 'is-current'}`} >
      <h1 className="desc" style={descPositions[position]}>
      {cat.categoryDescription}
      <button>Shop now</button>
      </h1>
      <img
       src={cat.images && cat.images[currentCat.images.length - 1]}
       alt='carousel'
      />
      </div>
      </Link>
      ))}
  </section>
  )
}
import React, { useState, useEffect, Fragment } from 'react';
import { useQuery } from "@apollo/react-hooks";
import { Link } from 'react-router-dom'
import { CATEGORIES } from '../../graphql/queries'
import 'react-lazy-load-image-component/src/effects/blur.css'
import Skeleton from 'react-loading-skeleton';


export default () => {
  const [ currentIndex, setCurrentIndex ] = useState(0);
  const [loadedImages, setLoadedImages ] = useState(0);
  const { data, loading } = useQuery(CATEGORIES);

  useEffect(() => {
    const timer = setTimeout(() => setCurrentIndex((currentIndex + 1 ) % selectedCategories.length ), 7000)
    return () => clearTimeout(timer)
  })

  const selectedCategories = data && data.categories.filter(({categoryName}) => (
    ["Phones And Tablets", "Computers", "Women's clothing" ].includes(categoryName)) 
  );

  const handleLoad = () => {
    setLoadedImages(loadedImages + 1)
  }

  const descPositions = [
    {left: 0, top: '25%'},
    {left: 0, top: 10},
    {right: 0, top: '25%'},
    {right: 0, top: 10},
    {top: 0, left: '27.5%'},
    {bottom: 0, left: '27.5%'},
    {top: '25%', left: '27.5%'}
  ]
  
  const currentCat  = selectedCategories && selectedCategories[currentIndex]
  const position = Math.floor(Math.random() * descPositions.length)

  return (
    <section className="showcase-carousel">
      {(!selectedCategories || loadedImages < selectedCategories.length) && <Skeleton height="350px" /> }
      {selectedCategories && selectedCategories.map((cat, index) => (
      <Link to={`/categories/${cat.urlKey}`} key={index} style={
        { display: loadedImages < selectedCategories.length  ? 'none' : 'block' }
      } >
      <div className={`carousel-item ${index === currentIndex && 'is-current'}`} >
      <h1 className="desc" style={descPositions[position]}>
      {cat.categoryDescription}
      <button>Shop now</button>
      </h1>
      <img
       src={cat.images && cat.images[currentCat.images.length - 1]}
       alt='carousel'
       onLoad={handleLoad}
       width="100%"
      />
      </div>
      </Link>
      ))}
  </section>
  )
}
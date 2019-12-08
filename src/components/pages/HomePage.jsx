import React from 'react';
import ShowcaseCarousel from '../ui-molecules/ShowcaseCarousel';
import TopDealsSection from '../ui-molecules/TopDealsSection';
import BestSellingSection from '../ui-molecules/BestSellingSection';

export default () => (
    <div className="home-page">
    <div className="container">
    <ShowcaseCarousel />
    <TopDealsSection />
    <BestSellingSection />
    </div>
  </div>
  )
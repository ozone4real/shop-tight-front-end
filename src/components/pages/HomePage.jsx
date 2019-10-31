import React from 'react';
import ShowcaseCarousel from '../ui-molecules/ShowcaseCarousel';
import TopDealsSection from '../ui-molecules/TopDealsSection';

export default () => (
    <main className="home-page">
    <div className="container">
    <ShowcaseCarousel />
    <TopDealsSection />
    </div>
  </main>
  )
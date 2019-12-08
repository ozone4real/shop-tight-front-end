import React from 'react';
import Skeleton from 'react-loading-skeleton';

export default () => (
  <div className="product-card product-card-sm">
    <div className="product-img">
    <Skeleton height={170} />
    </div>
    <div className="product-name">
    <Skeleton  />
    </div>
    <div className="product-price">
    <Skeleton  />
    </div>
  </div>
)
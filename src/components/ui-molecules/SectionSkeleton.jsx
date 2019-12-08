import React from 'react';
import Skeleton from 'react-loading-skeleton';


export default ({ leftHeight, rightHeight}) => (
  <div className="main-sec">
    <div className="left-sec">
      <Skeleton height={leftHeight} />
    </div>
    <div className="right-sec">
    <Skeleton  height={rightHeight} />
    </div>
  </div>
)
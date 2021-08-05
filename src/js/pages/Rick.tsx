import React from 'react'
import SidebarLayout from '../layout/SidebarLayout';

const Rick = () => {
  return (
    <SidebarLayout noPadding includeWindowHeightContainer allowOverflow>
      <iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&start=42&controls=0&modestbranding=1" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope;" style={{position: 'fixed',right: 0, bottom: 0,minWidth: '100%', minHeight: '100%', width: 'auto', height: 'auto'}}></iframe>
    </SidebarLayout>
  );
}

export default Rick
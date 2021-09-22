import React from 'react'
import SidebarLayout from '../layout/SidebarLayout';

const Rick = () => {
  return (
    <SidebarLayout noPadding includeWindowHeightContainer allowOverflow>
      <iframe width="1280" height="720" src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
    </SidebarLayout>
  );
}

export default Rick
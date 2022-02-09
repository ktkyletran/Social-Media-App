import React from 'react';
import Masonry from 'react-masonry-css'
import Post from '../Post'

const breakpoints = {
  default: 2,
  768: 1,
  1000: 2,
  1400: 3,
  2000: 4,

}

const Layout = ({ posts }) => {
  return (
    <Masonry className='flex animate-slide-fwd' breakpointCols={breakpoints}>
      {posts?.map((post) => <Post key={post._id} post={post} className="w-max" />)}
    </Masonry>
  );
};

export default Layout;

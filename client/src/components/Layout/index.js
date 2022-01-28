import React from 'react';
import Masonry from 'react-masonry-css'
import Post from '../Post'

const breakpoints = {
  default: 4,
  768: 2
}

const Layout = ({ posts }) => {
  return (
    <Masonry className='flex animate-slide-fwd' breakpointCols={breakpoints}>
      {posts?.map((post) => <Post key={post._id} post={post} className="w-max" />)}
    </Masonry>
  );
};

export default Layout;

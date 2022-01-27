import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navbar, Feed, PostDetails, CreatePost, Search} from '../../components/'

const Post = ({ user }) => {
  const [searchTerm, setSearchTerm] = useState('')
  return (
    <div className="px-2 md:px-5">
      <div className="bg-gray-100">
        <Navbar user={user} searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
      </div>
      <div className="h-full">
        <Routes>
          <Route path="/" element={<Feed />}/>
          <Route path="/category/:categoryId" element={<Feed />}/>
          <Route path="/post-details/:postId" element={<PostDetails user={user} />}/>
          <Route path="/create-post" element={<Feed user={user} />}/>
          <Route path="/search" element={<Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />}/>
        </Routes>
      </div>
    </div>
  )
};

export default Post;

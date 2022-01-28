import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { client } from '../../client'
import Spinner from '../Spinner'
import Layout from '../Layout'
import { feedQuery, searchQuery } from '../../utils/data';

const Feed = () => {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState(null);
  const { categoryId } = useParams();

  useEffect(() => {
    setLoading(true);

    if (categoryId) {
      const query = searchQuery(categoryId);

      client.fetch(query)
        .then((data) => {
          setPosts(data)
          setLoading(false);
        })
    } else {
      client.fetch(feedQuery)
        .then((data) => {
          setPosts(data)
          setLoading(false)
        })
    }
  
  }, [categoryId]);
  

  if (loading) return (<Spinner message="We are adding new ideas to your feed!" />)

  return (
    <div className="">
      {posts && <Layout posts={posts} />}
    </div>
  );
};

export default Feed;

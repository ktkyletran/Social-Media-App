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
  

  if (loading) return (<Spinner message="We are adding new ideas to your feed!" />);

  if (!posts?.length) return <h2 className="text-lg">Sorry, there are no posts for this category.</h2>

  return (
    <div className="">
      {posts && <Layout posts={posts} />}
    </div>
  );
};

export default Feed;

import React, { useState, useEffect } from 'react';
import Layout from '../Layout';
import { client } from '../../client';
import { feedQuery, searchQuery } from '../../utils/data';
import Spinner from '../Spinner'

const Search = ({ searchTerm }) => {
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchTerm) {
      setLoading(true);
      const query = searchQuery(searchTerm.toLowerCase());

      client.fetch(query)
      .then((data) => {
        setPosts(data)
        setLoading(false)
      })
    } else {
      client.fetch(feedQuery)
        .then((data) => {
          setPosts(data)
          setLoading(false)
        })
    }
  }, [searchTerm])
  

  return (
    <div className="">
      {loading && <Spinner message="Searching for posts" />}
      {posts?.length !== 0 && <Layout posts={posts} />}
      {posts?.length === 0 && searchTerm !== '' && !loading && (
        <div className="mt-10 text-center text-xl">
          No posts found
        </div>
      )}
    </div>
  );
};

export default Search;

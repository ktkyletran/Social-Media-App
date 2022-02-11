import React, { useState, useEffect } from 'react';
import { AiOutlineLogout } from 'react-icons/ai';
import { useParams, useNavigate } from 'react-router-dom';
import { GoogleLogout } from 'react-google-login';

import { userCreatedPostsQuery, userQuery, userSavedPostsQuery } from '../../utils/data';
import { client } from '../../client';
import Layout from '../Layout';
import Spinner from '../Spinner';

const randomImage = 'https://source.unsplash.com/1600x900/?nature,photography,technology'
const activeBtnStyles = 'bg-red-500 text-white font-bold p-2 rounded-full w-20 outline-none';
const notActiveBtnStyles = 'bg-primary mr-4 text-black font-bold p-2 rounded-full w-20 outline-none';
const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState(null);
  const [text, setText] = useState('Created');
  const [activeBtn, setActiveBtn] = useState('created');
  const navigate = useNavigate();
  const { userId } = useParams();
  
  useEffect(() => {
    const query = userQuery(userId);
    
    client.fetch(query)
    .then((data) => {
      setUser(data[0]);
    })
    
  }, [userId]);

  useEffect(() => {
    if (text === 'Created') {
      const createdPosts = userCreatedPostsQuery(userId);

      client.fetch(createdPosts)
        .then((data) => {
          setPosts(data);
        })
    } else {
      const savedPosts = userSavedPostsQuery(userId);

      client.fetch(savedPosts)
        .then((data) => {
          setPosts(data);
        })
    }
  },[text,userId])

  const logout = () => {
    localStorage.clear();

    navigate('/');
  }
  
  if (!user) return <Spinner message="Loading profile.." />

  return (
    <div className="relative pb-2 h-full justify-center items-center">
      <div className="flex flex-col pb-5">
        <div className="relative flex flex-col mb-7">
          <div className="flex flex-col justify-center items-center">
            <img src={randomImage} className="w-full h-370 xl:h-510 shadow-lg object-cover" alt="banner" />
            <img className='rounded-full h-20 w-20 -mt-10 shadow-xl object-cover' src={user.image} alt="user" />
            <h1 className="font-bold text-3xl text-center mt-3 mb-6">
              {user.userName}
            </h1>
            <div className="absolute top-0 z-1 right-0 p-2">
              {userId === user._id && (
                <GoogleLogout
              clientId={process.env.REACT_APP_GOOGLE_API}
              render={(renderProps) => (
                <button
                  type='button'
                  className='bg-white p-2 rounded-full cursor-pointer outline-none shadow-lg'
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  <AiOutlineLogout color="red" fontSize={21} />
                </button>
              )}
              onLogoutSuccess={logout}
              cookiePolicy='single_host_origin'
            />
              )}
            </div>
          </div>
          <div className="text-center mb-7">
            <button
              type='button'
              onClick={(e) => {
                setText(e.target.textContent)
                setActiveBtn('Created')
              }}
              className={`${activeBtn === 'Created' ? activeBtnStyles : notActiveBtnStyles}`}
            >
              Created
            </button>
            <button
              type='button'
              onClick={(e) => {
                setText(e.target.textContent)
                setActiveBtn('Saved')
              }}
              className={`${activeBtn === 'Saved' ? activeBtnStyles : notActiveBtnStyles}`}
            >
              Saved
            </button>
          </div>

          <div className="px-2">
            {posts?.length ? (
              <Layout posts={posts} />
            ) : (
              <div className="flex justify-center font-bold items-center w-full text-xl mt-2">
                Sorry, no posts were found
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

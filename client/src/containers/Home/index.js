import React, { useState, useEffect, useRef } from 'react';
import { HiMenu } from 'react-icons/hi';
import { AiFillCloseCircle } from 'react-icons/ai';
import { Link, Route, Routes } from 'react-router-dom';
import { Sidebar, UserProfile } from '../../components';
import { client } from '../../client';
import Posts from '../Posts';
import { userQuery } from '../../utils/data';
import { fetchUser } from '../../utils/fetchUser';

const Home = () => {
  const scrollRef = useRef(null);
  const [sidebar, setSidebar] = useState(false);
  const [user, setUser] = useState(null);
  const userInfo = fetchUser();
  
  useEffect(() => {
    const query = userQuery(userInfo?.googleId);

    client.fetch(query)
    .then((data) => {
      setUser(data[0]);
    });
  }, [userInfo?.googleId]);

  useEffect(() => {
    scrollRef.current.scrollTo(0,0);
  }, []);
  

  return (
    <div className="flex bg-gray-50 md:flex-row flex-col h-screen transition-height duration-75 ease-out">
      <div className="hidden md:flex h-screen flex-initial">
        <Sidebar user={user && user} />
      </div>
      <div className="flex md:hidden flex-row">
        <div className="p-2 w-full flex flex-row justify-between items-center shadow-md">
        <HiMenu fontSize={30} className='cursor-pointer' onClick={() => setSidebar(true)} />
        <Link to='/'>
          <h1 className='text-4xl'>Jolie</h1>
        </Link>
        <Link to={`user-profile/${user?._id}`}>
          <img src={user?.image} alt='user profile' className='w-9 h-9 rounded-full' />
        </Link>
        </div>
        {sidebar && (
          <div className="fixed w-2/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in">
            <div className="absolute w-full flex justify-end items-center p-2">
              <AiFillCloseCircle fontSize={30} className='cursor-pointer' onClick={() => setSidebar(false)} />
            </div>
            <Sidebar user={user && user} closeToggle={setSidebar} />
          </div>
        )}
      </div>
      <div className="pb-2 flex-1 h-screen overflow-y-scroll" ref={scrollRef}>
        <Routes>
          <Route path='/user-profile/:userId' element={<UserProfile />} />
          <Route path='/*' element={<Posts user={user && user} />} />
        </Routes>
      </div>
    </div>
  )
}

export default Home;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid';
import { MdDownloadForOffline } from 'react-icons/md'
import { AiTwotoneDelete } from 'react-icons/ai'
import { client, urlFor } from '../../client';
import { fetchUser } from '../../utils/fetchUser';

const Post = ({ post: { postedBy, image, _id, destination, save } }) => {
  const [postHovered, setPostHovered] = useState(false);
  const user = fetchUser();

  const alreadySaved = !!(save?.filter((item) => item.postedBy._id === user.googleId))?.length;

  const savePost = (id) => {
    if (!alreadySaved) {
      client.patch(id).setIfMissing({ save: [] }).insert('after', 'save[-1]', [{
        _key: uuidv4(),
        userId: user.googleId,
        postedBy: {
          _type: 'postedBy',
          _ref: user.googleId
        }
      }])
      .commit()
      .then(() => {
        window.location.reload();
      })
    }
  }

  const deletePost = (id) => {
    client.delete(id).then(() => {
      window.location.reload();
    })
  }

  const navigate = useNavigate();

  return (
    <div className="m-2 mb-12 md:mb-6">
      <div 
        className="relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out"
        onMouseEnter={() => setPostHovered(true)}
        onMouseLeave={() => setPostHovered(false)}
        onClick={() => navigate(`/post-details/${_id}`)}
      >
        <img className='rounded-lg w-full' alt="post" src={urlFor(image).width(250).url()} />
        {postHovered && (
          <div style={{height: '100%'}} className="absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-2 pt-2 pb-2 z-50 opacity-0 hover:opacity-100 duration-700">
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <a href={`${image?.asset?.url}?dl=`} download onClick={(e) => e.stopPropagation()} className='bg-white w-9 h-9 flex justify-center items-center text-dark text-xl opacity-75 rounded-full hover:opacity-100 hover:shadow-md outline-none duration-300'>
                  <MdDownloadForOffline />
                </a>
              </div>
              {alreadySaved ? (
                <button type="button" className='bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none transition-300'>
                {save?.length}  Saved
                </button>
              ) : (
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    savePost(_id)
                  }} 
                  type='button'
                  className='bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none'
                >
                  Save
                </button>
              )}
            </div>
            <div className="flex justify-end items-center gap-2 w-full">
              {/* {destination && (
                <a
                  href={destination}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-white flex items-center gap-2 text-black font-bold p-2 pl-4 pr-4 rounded-full opacity-70 hover:opacity-100 hover:shadow-md"
                > 
                  <BsFillArrowUpRightCircleFill />
                  {destination.length > 20 ? destination.slice(8, 26) : destination.slice(8)}
                </a>
              )} */}
              {postedBy?._id === user.googleId && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    deletePost(_id)
                  }}
                  className='bg-white opacity-70 hover:opacity-100 text-dark font-bold px-4 py-2 text-base rounded-3xl hover:shadow-md outline-none duration-300'
                >
                  <AiTwotoneDelete />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
      <Link to={`user-profile/${postedBy?._id}`} className='flex gap-2 mt-2 items-center'>
        <img className='w-8 h-8 rounded-full object-cover' src={postedBy?.image} alt="user profile" />
        <p className='font-semibold capitalize'>{postedBy?.userName}</p>
      </Link>
    </div>
  );
};

export default Post;

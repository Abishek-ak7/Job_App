import React from 'react';
import welcome from '../../assets/home1.png';
import Search from '../Elements/Search';

const Home = () => {
  // Fetch user details from localStorage
  const user = JSON.parse(localStorage.getItem('user')) || null;

  return (
    <div className='p-[3%] flex flex-col md:flex-row justify-center items-center bg-gradient-to-b from-green-300 to-green-200'>
      <div className='w-3/4 ml-[5%]'>
        {/* Display Welcome message if user exists */}
        {user && user.firstName && (
          <h2 className='text-2xl font-semibold text-charcoalGray mb-4'>
            Welcome back, <span className='text-black'>{user.firstName}!</span>
          </h2>
        )}

        <p className='bg-softGreen-100 w-fit p-3 rounded-full my-5 text-charcoalGray'>
          2886 Positions
        </p>

        <div className='w-3/4'>
          <h1 className='font-bold md:text-7xl text-charcoalGray'>
            Find your next exciting job
          </h1>
        </div>

        <div className='md:w-1/2 mt-5 leading-normal tracking-tighter text-charcoalGray'>
          <p>
            Discover endless career opportunities with our job search platform.
            Easily browse job listings, apply directly, and get personalized
            recommendations tailored to your skills and preferences. Find your dream
            job today and take the next step in your career!
          </p>
        </div>
        <Search />
        <h1 className='mt-12'>
          <span className='text-slateBlue font-bold'>
            Search keywords e.g
          </span>{' '}
          <span className='font-bold ml-3 text-softGreen'>
            Product Developer
          </span>
        </h1>
      </div>
      <div className='w-1/2'>
        <img src={welcome} alt='Welcome' />
      </div>
    </div>
  );
};

export default Home;

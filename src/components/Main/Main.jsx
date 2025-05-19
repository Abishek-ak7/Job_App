import React from 'react'
import Navbar from '../Navigation/Navbar';
import Home from '../Pages/Home';
import Working from '../Working/Working';
import Explore from '../Working/Explore';
import Footer from '../Footer/Footer';
import Testimonials from '../Landing/Testimonals';
import Subscribe from '../Footer/Subscribe';

const Main=()=> {
  return (
    <div className=' overflow-hidden'>
  <Navbar/>
  <Home/> 
  <Working/>
  <Explore/>
  <Testimonials/>
  <Subscribe/>
  <Footer/>
    </div>
  )
}

export default Main;


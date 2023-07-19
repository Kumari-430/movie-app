import React from 'react';
import './Header.css';
const Header = () => {
  return (
     
    <span onClick ={() => window.scroll(0,0)}className='header'><i className='bx bxs-movie-play'></i> <b>Entertainment Hub</b><i className='bx bxs-camera-movie'></i></span>
  )
}

export default Header;
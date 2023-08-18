import React from 'react';
import './Home.css';
import Navbar from './Navbar';
import Visuals from './Visuals';

function Home() {
  return (
    <div className="home">
       <Navbar />
       <Visuals />
   </div>
  )
}

export default Home;
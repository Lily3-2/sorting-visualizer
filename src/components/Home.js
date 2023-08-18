import React from 'react';
import './Home.css';
import Navbar from './Navbar';
import Visuals from './Visuals';
// Define the Home component
function Home() {
  return (
    <div className="home">
      {/* Render the Navbar component */}
       <Navbar />
      {/* Render the Visuals component */} 
       <Visuals />
   </div>
  )
}
// Export the Home component as the default export
export default Home;
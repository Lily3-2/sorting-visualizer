import React,{useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './Navbar.css';
import { Slider } from '@mui/material';

function Navbar() {
   // Redux state and dispatcher
   const myState = useSelector(state => state.updateProps);
   const dispatch = useDispatch();

    // State for max value of the Slider
   const [max,setMax] = useState(30);

   // Handler for algorithm selection
   const handleAlgo = (algo) => {
      dispatch({
         type: 'UPDATE_ALGORITHM',
         algorithm: algo
      })
   }

   // Reset color handler
   const resetColor = () => {
      dispatch({
         type:'UPDATE_COLOR',
         color:document.getElementById('color').value
      })
   }

   // Handler for range change
   const handleRange = (_range) => {
      // Update UI element transitions
      let new_arr = [...myState.values];
      for(let i = 0; i < new_arr.length; i++)
         document.getElementById(i).style.transform = `translateX(${i*11}px)`;

      // Reset color and dispatch range update
      resetColor();
      
      dispatch({
         type: 'UPDATE_RANGE',
         range: _range
      })
      dispatch({
         type:'CHANGE_VALUES'
      })
   }

   // Handler for color change
   const handleColor = (_color) => {
      dispatch({
         type: 'UPDATE_COLOR',
         color: _color
      })
   }

   // Handler for speed change
   const handleSpeed = (_speed) => {
      dispatch({
         type: 'UPDATE_SPEED',
         speed: _speed
      })
   }

   // Initialize range value on load
   useEffect(() => {
      handleRange(30);
   },[]);

    // Update color on values change
   useEffect(() => {
      dispatch({
         type:'UPDATE_COLOR',
         color:document.getElementById('color').value
      })
   },[myState.values]);

   // Adjust max value for responsive design
   const handleWidth = () => {
      if(window.innerWidth>1300)
         setMax(70);
      else if(window.innerWidth>1200)
         setMax(60);
      else if(window.innerWidth>1100)
         setMax(50);
      else if(window.innerWidth>900)
         setMax(45);
      else if(window.innerWidth>800)
         setMax(40);
      else if(window.innerWidth>500)
         setMax(30);
      else
         setMax(20);
   }

   // Update max value on window resize
   useEffect(() => {
      handleWidth();
      window.addEventListener('resize',handleWidth);
      return () => window.removeEventListener('resize',handleWidth);
   },[]);

   // Render the Navbar component
  return (
    <div className="wrapper">
      <nav className='navMenu'>
         {/* Algorithm selection */}
         <div className="navbar__option">
            <label htmlFor="algo">Algorithm </label>
            <select name="algo" id="algo" onChange={(e) => handleAlgo(e.target.value)} disabled = {myState.play? true: false}>
               <option value="selection">Selection Sort</option>
               <option value="bubble">Bubble Sort </option> 
               <option value="insertion">Insertion Sort</option>
               <option value="merge">Merge Sort</option>
               <option value="quick">Quick Sort</option>
            </select>
         </div>

         {/* Size Slider */}
         <div className="navbar__option">
            <label htmlFor="range">Size </label>
            <Slider 
               style={{width:'180px' }}
               size="small"
               defaultValue={30}
               id = 'slider'
               min={1}
               className = 'slider'
               disabled={myState.play? true: false}
               max={max}
               onChange = {(e) => handleRange(e.target.value)}
               valueLabelDisplay="auto"
            />
         </div>

         {/* Color selection */}
         <div className="navbar__option">
            <label htmlFor="color">Color </label>
            <select name="color" id="color" onChange = {(e) => handleColor(e.target.value)} disabled = {myState.play? true: false}>
               <option value="#8871fd" style={{color:'#8871fd'}}>Purple</option> 
               <option value='rgb(85, 212, 0)' style={{color:'rgb(10,200,20)'}}>Green</option>
               <option value="rgb(255, 112, 112)" style={{color:'red'}}>Red</option>
               <option value="grey" style={{color:'grey'}}>Black</option>
               <option value="#ddd902" style={{color:'#ddd902'}}>Yellow</option>
            </select>
         </div>

         {/* Speed selection */}
         <div className="navbar__option">
            <label htmlFor="speed">Speed </label>
            <select name="speed" defaultValue={100} id="speed" onChange = {(e) => handleSpeed(e.target.value)} disabled = {myState.play? true: false}>
               <option value={500} >Slow</option> 
               <option value={200} >Medium</option>
               <option value={100} >Fast</option>
               <option value={10} >Super Fast</option>
            </select>
         </div>
      </nav>
   </div>
  )
}
// Export the Navbar component as the default export
export default Navbar;
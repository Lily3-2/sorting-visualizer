import React,{useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';


const BubbleSort = () =>{
   const myState = useSelector(state => state.updateProps); // Access Redux state
   const dispatch = useDispatch(); // Initialize dispatch function

   // Extract values and IDs from Redux state
   let values = myState.values.map((item) => item[0]);
   let ids = myState.values.map((item) => item[1]);
   
   // Bubble sort algorithm implementation
   const solve = () => {
      for(let i = values.length,timer = 0; i > 0;timer += i-1, i--){
         setTimeout(() => {
            for(let j = 1; j < i; j++){
               setTimeout(() => {
                  // Change background color of compared elements
                  document.getElementById(ids[j]).childNodes[1].style.backgroundColor = 'white';
                  document.getElementById(ids[j-1]).childNodes[1].style.backgroundColor = 'white';
                  
                  setTimeout(() => {
                     // Restore original background color
                     document.getElementById(ids[j]).childNodes[1].style.backgroundColor = myState.color;
                     document.getElementById(ids[j-1]).childNodes[1].style.backgroundColor = myState.color;
                  },myState.speed-10);
                     
                  if(values[j]<values[j-1]){
                     // Swap values and IDs
                     let temp = values[j];
                     values[j] = values[j-1];
                     values[j-1] = temp;

                     temp = ids[j];
                     ids[j] = ids[j-1];
                     ids[j-1] = temp;
                     
                     // Update element positions using CSS transform property
                     document.getElementById(ids[j]).style.transform = `translateX(${j*11}px)`;
                     
                     document.getElementById(ids[j-1]).style.transform = `translateX(${(j-1)*11}px)`;
                        
                  }
               },(j-1)*(myState.speed));
            }
         }
         ,(timer)*(myState.speed))
      }
      
      // After sorting completes, update Redux state
      setTimeout(() => {
         dispatch({
            type:'PLAY_PAUSE',
            _play:false
         })

          // Change color after sorting completes
         dispatch({
            type:'UPDATE_COLOR',
            color: 'rgb(0, 182, 0)'
         })

      },(((myState.values.length-1)*(myState.values.length))/2)*myState.speed+50);
   }
   
   // Listen for changes in Redux state and trigger sorting algorithm
   useEffect(() => {
      if(myState.algorithm==='bubble'){
         if(myState.play)
            solve();
      }
   },[myState.play]);

   return <></>; // Return an empty component (no visible rendering)
}

export default BubbleSort;

/*This code defines a React functional component BubbleSort that implements the Bubble Sort algorithm to sort an array of values based on the Redux state. The solve function contains the sorting logic with timed animations and updates. The useEffect hook listens for changes in the Redux state and triggers the sorting process when the "play" button is pressed. The component itself doesn't render any visible content (<></>) as its purpose is to manage the sorting process.*/
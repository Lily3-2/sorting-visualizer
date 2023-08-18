import React,{useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';

const InsertionSort = () =>{
   const myState = useSelector(state => state.updateProps); // Access Redux state
   const dispatch = useDispatch(); // Initialize dispatch function

   // Extract values and IDs from Redux state
   let values = myState.values.map((item) => item[0]);
   let ids = myState.values.map((item) => item[1]);
   // Calculate total_time and timing_map for animation delays
   let timer = 0;
   let total_time = 0;
   let timing_map = new Map();

   for(let i = 0; i < values.length; i++){
      let j = i+1;
      while(j>0 && values[j]<values[j-1]){
         let temp = values[j];
         values[j] = values[j-1];
         values[j-1] = temp;
         total_time++;
         j--;
      }
      timing_map.set(i+1,i+1-j);
   }

   values = myState.values.map((item) => item[0]);
   
   // Insertion sort algorithm implementation
   const solve = () => {
      
      for(let i = 0; i < values.length-1; i++){
            let ind = i+1;

            while(ind>0 && values[ind]<values[ind-1]){

               let j = ind;

               let temp = values[j];
               values[j] = values[j-1];
               values[j-1] = temp;

               temp = ids[j];
               ids[j] = ids[j-1];
               ids[j-1] = temp;

               let new_ids = [...ids];
               
               setTimeout(() => {
                  // Change background color of compared elements
                  document.getElementById(new_ids[j]).style.transform = `translateX(${j*11}px)`;
                  document.getElementById(new_ids[j-1]).childNodes[1].style.backgroundColor = 'white';
                  
                  setTimeout(() => {
                     // Restore original background color
                     document.getElementById(new_ids[j-1]).childNodes[1].style.backgroundColor = myState.color;
                  },myState.speed-10);

                  // Update element positions using CSS transform property
                  document.getElementById(new_ids[j-1]).style.transform = `translateX(${(j-1)*11}px)`;  
               },timer*myState.speed);

               // Update timer
               timer++;
               ind--;
            }
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
      },(total_time+1)*myState.speed+50);
   }
   
   // Listen for changes in Redux state and trigger sorting
   useEffect(() => {
      if(myState.algorithm==='insertion'){
         if(myState.play)
            solve();
      }
   },[myState.play]);

   return <></>; // Return empty JSX fragment(no visible rendering)
}

export default InsertionSort;

/* This code defines a React functional component InsertionSort that implements the Insertion Sort algorithm to sort an array of values based on the Redux state. The solve function contains the sorting logic with timed animations and updates. The useEffect hook listens for changes in the Redux state and triggers the sorting process when the "play" button is pressed. The component itself doesn't render any visible content (<></>) as its purpose is to manage the sorting process.*/
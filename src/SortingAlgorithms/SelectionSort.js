import React,{useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';

const SelectionSort = () =>{
   const myState = useSelector(state => state.updateProps); // Access Redux state
   const dispatch = useDispatch(); // Initialize dispatch function

   // Extract values and IDs from Redux state
   let values = myState.values.map((item) => item[0]);
   let ids = myState.values.map((item) => item[1]);

   // Selection sort algorithm implementation
   const solve = () => {
      let n = values.length;

      for(let i = 0; i < n; i++){

         setTimeout(() => {
         let ind = i;
         for(let j = i; j < n; j++){
            if(values[ind] > values[j])
               ind = j;
         }
         let temp = values[i];
         values[i] = values[ind];
         values[ind] = temp;
         
         temp = ids[i];
         ids[i] = ids[ind];
         ids[ind] = temp;

         // Update element positions using CSS transform
         document.getElementById(ids[i]).style.transform = `translateX(${i*11}px)`;
         document.getElementById(ids[ind]).style.transform = `translateX(${ind*11}px)`;

         // Change background color of compared(selected) elements
         document.getElementById(ids[i]).childNodes[1].style.backgroundColor = 'white';

         setTimeout(() => {
            // Restore original background color after delay
            document.getElementById(ids[i]).childNodes[1].style.backgroundColor = myState.color;
         },myState.speed*2);

         },i*myState.speed*3);
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

      },(myState.speed*3*n)+50);
   };

   // Listen for changes in Redux state and trigger sorting
   useEffect(() => {
      if(myState.algorithm==='selection'){
         if(myState.play)
            solve(); // Initiate sorting
      }
   },[myState.play]);

   return <></>; // Return empty JSX fragment(no visible rendering)
}

export default SelectionSort;

/* This code defines a React functional component SelectionSort that implements the Selection Sort algorithm to sort an array of values based on the Redux state. The solve function contains the sorting logic with timed animations and updates. The useEffect hook listens for changes in the Redux state and triggers the sorting process when the "play" button is pressed. The component itself doesn't render any visible content (<></>) as its purpose is to manage the sorting process.*/